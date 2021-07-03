<template>
  <div class="updatepwd">
    <el-form ref="form" :model="password" label-width="480px">
      <el-form-item style="width:55%">
        <p class="username">教师用户 {{ this.sessionusername }}</p>
      </el-form-item>
      <el-form-item label="旧密码" style="width:57%">
        <el-input
          v-model="password.oldpwd"
          show-password
          clearable
          id="oldpwd"
        ></el-input>
      </el-form-item>
      <el-form-item label="新密码" style="width:57%" class="newpwd">
        <el-input
          v-model="password.newpwd"
          show-password
          clearable
          id="newpwd"
        ></el-input>
      </el-form-item>
      <el-form-item style="width:54%" class="updateConfirm">
        <el-button @click="changPwd()">修改密码</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'About',
  components: {},
  data() {
    return {
      sessionpwd: '',
      sessionusername: '',
      password: {
        oldpwd: '',
        newpwd: '',
      },
    }
  },
  created() {
    this.sessionusername = sessionStorage.getItem('teaUsername')
    this.sessionpwd = sessionStorage.getItem('teaPassword')
    console.log(this.sessionusername)
    console.log(this.sessionpwd)
  },
  methods: {
    changPwd() {
      if (!this.password.oldpwd) {
        this.$message({
          showClose: true,
          message: '原始密码不能为空！',
          type: 'warning',
        })
        document.getElementById('oldpwd').focus()
        return
      }
      if (!this.password.newpwd) {
        this.$message({
          showClose: true,
          message: '新密码不能为空！',
          type: 'warning',
        })
        document.getElementById('newpwd').focus()
        return
      }

      if (!(this.sessionpwd == this.password.oldpwd)) {
        console.log(this.password.oldpwd)
        console.log(this.sessionpwd)
        this.$message({
          showClose: true,
          message: '输入密码与原始密码不符，请重新输入！',
          type: 'warning',
        })
        this.password = {
          oldpwd: '',
          newpwd: '',
        }
        document.getElementById('oldpwd').focus()
      }

      if (this.sessionpwd == this.password.oldpwd) {
        this.$confirm('确认修改？')
          .then((_) => {
            var json = {
              id: this.sessionusername,
              newpwd: this.password.newpwd,
            }
            axios
              .post('http://localhost:8090/tea/updatePwdById', json)
              .then((res) => {})
              .catch((err) => {})

            this.$message({
              showClose: true,
              message: '修改成功！',
              type: 'success',
            })
            this.sessionpwd = this.password.newpwd
            this.password = {
              oldpwd: '',
              newpwd: '',
            }
          })
          .catch((_) => {})
      }
    },
  },
}
</script>

<style scoped>
.newpwd {
  margin-top: 40px;
}
.updatepwd {
  margin-top: 30px;
}
.updateConfirm {
  margin-top: 60px;
}
.username {
  font-size: 25px;
}
</style>
