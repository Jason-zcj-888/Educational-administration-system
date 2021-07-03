<template>
  <div id="all">
    <div id="header">
      <div class="role">
        <el-select
          v-model="value"
          placeholder="请选择"
          @change="valuechange()"
          style="width:150px"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>
      <br />
      <br />
      <div class="title">
        <h1>欢迎使用学籍管理系统</h1>
      </div>
      <br />
      <br />
    </div>

    <div id="body">
      <div class="logintitle">
        <br />
        <h2 class="">登录界面</h2>
        <br />
        <br />
      </div>
      <div id="loginform">
        <el-form>
          <div id="username">
            <div id="usernameimg">
              <img class="img" :src="userimg" alt="" />
            </div>
            <div id="usernamelogin">
              <el-form-item>
                <el-input
                  v-model="username"
                  placeholder="请输入用户名"
                  class="inputlogin"
                  style="width:240px"
                ></el-input>
              </el-form-item>
            </div>
          </div>
          <div id="password">
            <div id="pwdimg">
              <img class="img" :src="pwdimg" alt="" />
            </div>
            <div id="pwdlogin">
              <el-form-item>
                <el-input
                  class="inputlogin"
                  placeholder="请输入密码"
                  v-model="password"
                  show-password
                  style="ime-mode: disabled;width:240px"
                ></el-input>
              </el-form-item>
            </div>
          </div>

          <span
            class="tips"
            style="font-size: 15px; line-height: 30px; color: #d9d9d9"
          >
            Tips : 请输入账号密码登陆
          </span>
          <div class="codeTest">
            <input class="codeInput" v-model="inputCode" style="width:120px" />
            <input
              type="button"
              id="checkCode"
              class="code"
              :value="this.checkCode"
              @click="createCode()"
            />
          </div>
          <div class="btDiv">
            <el-button class="button" @click="testLogin()">登录</el-button>
          </div>
        </el-form>
      </div>

      <div class="blank">
        <p><span></span></p>
        <p><span></span></p>
        <p><span></span></p>
        <p><span></span></p>
        <p><span></span></p>
        <p><span></span></p>
        <p><span></span></p>
        <p><span></span></p>
        <p><span></span></p>
        <p><span></span></p>
        <p><span></span></p>
        <p><span></span></p>
        <p><span></span></p>
      </div>
    </div>
  </div>
</template>

<style scoped>
#header {
  position: relative;
}
.title {
  margin-top: 40px;
  position: absolute;
  left: 40%;
}
.inputlogin {
  width: 300px;
  float: left;
}

span {
  margin: 0 10px;
}
#usernameimg {
  width: 43%;
}
#pwdimg {
  width: 43%;
}
#usernamelogin,
#pwdlogin {
  width: 57%;
}
#usernameimg,
#usernamelogin {
  float: left;
}
.img {
  margin: 10px 10px;
  float: right;
}
#pwdimg,
#pwdlogin {
  float: left;
}
.role {
  position: absolute;
  float: right;
  margin-top: 30px;
  right: 30px;
}
#all {
  background: url('../assets/bg4.jpg');
  background-size: 100%;
  height: 100%;
}
* {
  margin: 0px;
}

#body {
  position: relative;
  margin-top: 100px;
}
.logintitle {
  position: relative;
}
.logintitle h2 {
  position: absolute;
  left: 47%;
}
#loginform {
  margin-top: 70px;
}
.btDiv {
  position: relative;
}
.button {
  position: absolute;
  width: 100px;
  margin-top: 70px;
  left: 47%;
}
.tips {
  margin-top: 30px;
}
.blank {
  margin-top: 11px;
}
.code {
  font-family: Arial;
  font-style: italic;
  font-weight: bold;
  border: 0;
  letter-spacing: 3px;
  color: blue;
  width: 70px;
  height: 35px;
  position: absolute;
  left: 54%;
  top: 10px;
  border-radius: 8px;
}
.codeTest {
  position: relative;
}
.codeInput {
  position: absolute;
  left: 43%;
  top: 10px;
  padding: 0 10px;
  width: 536px;
  height: 34px;
  border: 1px solid rgba(255, 255, 255, 0.8);
  border-radius: 2px;
  color: #fff;
  background: rgba(0, 0, 0, 0.15);
}
</style>
<script>
import axios from 'axios'

export default {
  data() {
    return {
      username: '',
      password: '',
      userimg: 'https://mimg.127.net/p/freemail/index/lib/img/urs/ico-user.png',
      pwdimg:
        'https://mimg.127.net/p/freemail/index/lib/img/urs/ico-password.png',

      options: [
        {
          value: 'manager',
          label: '管理员',
        },
        {
          value: 'teacher',
          label: '教师',
        },
        {
          value: 'student',
          label: '学生',
        },
      ],
      value: '',
      stuInfo: '',
      teaInfo: '',
      managerInfo: '',
      code: '',
      codeLength: 5,
      checkCode: '',
      inputCode: '',
      random: [
        0,
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        'A',
        'B',
        'C',
        'D',
        'E',
        'F',
        'G',
        'H',
        'I',
        'J',
        'K',
        'L',
        'M',
        'N',
        'O',
        'P',
        'Q',
        'R',
        'S',
        'T',
        'U',
        'V',
        'W',
        'X',
        'Y',
        'Z',
      ],
    }
  },
  created() {
    this.createCode()
  },
  methods: {
    createCode() {
      this.code = ''
      for (var i = 0; i < this.codeLength; i++) {
        var charIndex = Math.floor(Math.random() * 36) //取得随机数的索引
        this.code += this.random[charIndex] //根据索引取得随机数加到code上
      }
      this.checkCode = this.code //把code值赋给验证码
    },
    valuechange() {
      console.log(this.value)
    },
    testLogin() {
      var inputCodeUpper = this.inputCode.toUpperCase()
      if (!this.value) {
        this.$message({
          showClose: true,
          message: '请选择您的登录角色!',
          type: 'warning',
        })
        return
      } else if (!this.username && !this.password) {
        this.$message({
          showClose: true,
          message: '用户名和密码不能为空!',
          type: 'warning',
        })
        return
      } else if (!this.username) {
        this.$message({
          showClose: true,
          message: '用户名不能为空!',
          type: 'warning',
        })
        return
      } else if (!this.password) {
        this.$message({
          showClose: true,
          message: '密码不能为空!',
          type: 'warning',
        })
        return
      } else if (this.inputCode <= 0) {
        alert('请输入验证码！')
      } else if (inputCodeUpper != this.code) {
        alert('验证码输入错误！') //则弹出验证码输入错误
        this.createCode() //刷新验证码
      } else if (this.value == 'manager') {
        var json = {
          username: this.username,
          password: this.password,
        }

        axios
          .post('http://localhost:8090/manager/testLogin', json)
          .then((res) => {
            let user = res.data
            console.log(user)
            if (user == 0) {
              this.$message({
                showClose: true,
                message: '用户名不存在或密码错误!',
                type: 'warning',
              })
              return
            } else {
              sessionStorage.setItem('managerUsername', this.username)
              sessionStorage.setItem('managerPassword', this.password)
              console.log(this.password)
              this.$router.push('/manager')
              return
            }
          })
      } else if (this.value == 'teacher') {
        var json = {
          username: this.username,
          password: this.password,
        }

        axios.post('http://localhost:8090/tea/testLogin', json).then((res) => {
          let user = res.data
          console.log(user)
          if (user == 0) {
            this.$message({
              showClose: true,
              message: '用户名不存在或密码错误!',
              type: 'warning',
            })
            return
          } else {
            sessionStorage.setItem('teaUsername', this.username)
            sessionStorage.setItem('teaPassword', this.password)
            console.log(this.password)
            this.$router.push('/teacher')
            return
          }
        })
      } else if (this.value == 'student') {
        var json = {
          username: this.username,
          password: this.password,
        }

        axios.post('http://localhost:8090/stu/testLogin', json).then((res) => {
          let user = res.data
          console.log(user)
          if (user == 0) {
            this.$message({
              showClose: true,
              message: '用户名不存在或密码错误!',
              type: 'warning',
            })
            return
          } else {
            sessionStorage.setItem('stuUsername', this.username)
            sessionStorage.setItem('stuPassword', this.password)
            this.$router.push('/student')
            return
          }
        })
      }
    },
  },
}
</script>
