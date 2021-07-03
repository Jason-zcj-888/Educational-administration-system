<template>
  <div>
    <div class="head">
      <div>
        <el-button type="primary" class="addStu" @click="addStu()"
          >录入学生信息</el-button
        >
        <el-dialog
          title="添加学生信息"
          :visible.sync="addDialogVisible"
          width="30%"
          :before-close="addHandleClose"
        >
          <el-form ref="form" :model="addObj" label-width="80px">
            <el-form-item label="学号">
              <el-input v-model="addObj.stuId"></el-input>
            </el-form-item>
            <el-form-item label="姓名">
              <el-input v-model="addObj.name"></el-input>
            </el-form-item>
            <el-form-item label="性别">
              <el-select v-model="addObj.gender" placeholder="请选择性别">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="班级">
              <el-input v-model="addObj.stuClass"></el-input>
            </el-form-item>
            <el-form-item label="专业">
              <el-input v-model="addObj.major"></el-input>
            </el-form-item>
            <el-form-item label="入学时间">
              <el-date-picker
                v-model="addObj.date"
                type="month"
                format="yyyy 年 MM 月"
                value-format="yyyy-MM"
                placeholder="请选择入学日期"
              >
              </el-date-picker>
            </el-form-item>
            <el-form-item label="身份证号">
              <el-input v-model="addObj.idCard"></el-input>
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="addDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="addConfirm()">确 定</el-button>
          </span>
        </el-dialog>
      </div>
      <hr class="hr" />
      <div class="queryStu">
        <div>
          <el-row :gutter="20">
            <el-col :span="3"
              ><div class="grid-content bg-purple">
                <el-input
                  v-model="stuInfo.stuId"
                  placeholder="请输入学号"
                ></el-input></div
            ></el-col>
            <el-col :span="3"
              ><div class="grid-content bg-purple">
                <el-input
                  v-model="stuInfo.name"
                  placeholder="请输入姓名"
                ></el-input></div
            ></el-col>
            <el-col :span="3"
              ><div class="grid-content bg-purple">
                <el-select v-model="stuInfo.gender" placeholder="请选择性别">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select></div
            ></el-col>
            <el-col :span="3"
              ><div class="grid-content bg-purple">
                <el-input
                  v-model="stuInfo.stuClass"
                  placeholder="请输入班级"
                ></el-input></div
            ></el-col>
            <el-col :span="3"
              ><div class="grid-content bg-purple">
                <el-input
                  v-model="stuInfo.major"
                  placeholder="请输入专业"
                ></el-input></div
            ></el-col>
            <el-col :span="5">
              <div class="grid-content bg-purple">
                <el-date-picker
                  v-model="stuInfo.date"
                  type="month"
                  format="yyyy 年 MM 月"
                  value-format="yyyy-MM"
                  placeholder="请选择入学日期"
                >
                </el-date-picker>
              </div>
            </el-col>
            <el-col :span="4"
              ><div class="grid-content bg-purple">
                <el-input
                  v-model="stuInfo.idCard"
                  placeholder="请输入身份证号"
                ></el-input></div
            ></el-col>
          </el-row>
        </div>
        <div>
          <el-button type="primary" class="queryStuBt" @click="queryStu()"
            >查询学生信息</el-button
          >
        </div>
      </div>
    </div>
    <div class="body">
      <template>
        <el-table
          style="width: 100%"
          :data="
            queryStuData.slice(
              (currentPage - 1) * pagesize,
              currentPage * pagesize
            )
          "
        >
          <el-table-column prop="id" label="序号" type="index" width="80">
          </el-table-column>
          <el-table-column prop="stuId" label="学号"> </el-table-column>
          <el-table-column prop="name" label="姓名"> </el-table-column>
          <el-table-column prop="gender" label="性别"> </el-table-column>
          <el-table-column prop="stuClass" label="班级"> </el-table-column>
          <el-table-column prop="major" label="专业"> </el-table-column>
          <el-table-column prop="date" label="入学时间"> </el-table-column>
          <el-table-column prop="idCard" label="身份证号" width="180">
          </el-table-column>
          <el-table-column prop="" label="操作">
            <template slot-scope="scope">
              <el-button
                type="primary"
                icon="el-icon-edit"
                @click="stuEdit(scope.$index, scope.row)"
                circle
              ></el-button>
              <el-button
                type="danger"
                icon="el-icon-delete"
                @click="delStu(scope.$index, scope.row)"
                circle
              ></el-button
            ></template>
          </el-table-column>
        </el-table>
      </template>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-size="pagesize"
        layout="total, prev, pager, next, jumper"
        :total="this.queryStuData.length"
      >
      </el-pagination>
    </div>

    <el-dialog
      title="编辑学生信息"
      :visible.sync="editDialogVisible"
      width="30%"
      :before-close="editHandleClose"
    >
      <el-form ref="form" :model="editObj" label-width="80px">
        <el-form-item label="学号">
          <el-input v-model="editObj.stuId"></el-input>
        </el-form-item>
        <el-form-item label="姓名">
          <el-input v-model="editObj.name"></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-select v-model="editObj.gender" placeholder="请选择性别">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="班级">
          <el-input v-model="editObj.stuClass"></el-input>
        </el-form-item>
        <el-form-item label="专业">
          <el-input v-model="editObj.major"></el-input>
        </el-form-item>
        <el-form-item label="入学时间">
          <el-date-picker
            v-model="editObj.date"
            type="month"
            format="yyyy 年 MM 月"
            value-format="yyyy-MM"
            placeholder="请选择入学日期"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="身份证号">
          <el-input v-model="editObj.idCard"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editConfirm()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import axios from 'axios'
import Vue from 'vue'

export default {
  computed: {},
  components: {},
  data() {
    return {
      stuInfo: {
        stuId: '',
        name: '',
        gender: '',
        stuClass: '',
        major: '',
        date: '',
        idCard: '',
      },
      options: [
        {
          value: '男',
          label: '男',
        },
        {
          value: '女',
          label: '女',
        },
        {
          value: '',
          label: '',
        },
      ],
      queryStuData: [],
      addStuData: [],
      editObj: {
        id: '',
        stuId: '',
        name: '',
        gender: '',
        major: '',
        stuClass: '',
        date: '',
        idCard: '',
      },
      addObj: {
        id: '',
        stuId: '',
        name: '',
        gender: '',
        major: '',
        stuClass: '',
        date: '',
        idCard: '',
      },
      addDialogVisible: false,
      editIndex: 0,
      editDialogVisible: false,
      deleteById: '',
      currentPage: 1,
      pagesize: 5,
      oldstuId: '',
      majors: [],
      majorId: '',
    }
  },
  created() {
    axios
      .get('http://localhost:8090/stu/queryAll')
      .then((res) => {
        this.queryStuData = res.data
      })
      .catch((err) => {})
  },
  methods: {
    handleSizeChange: function(size) {
      this.pagesize = size
      console.log(this.pagesize) //每页下拉显示数据
    },
    handleCurrentChange: function(currentPage) {
      this.currentPage = currentPage
      console.log(this.currentPage) //点击第几页
    },

    addStu() {
      this.addDialogVisible = true
      this.addObj = {
        stuId: '3117000000',
        name: '卢本伟',
        gender: '男',
        major: '软件工程',
        stuClass: '170718',
        date: '2019-06',
        idCard: '123456789123456',
      }
      axios
        .get('http://localhost:8090/stu/queryAll')
        .then((res) => {
          var stus = res.data
          this.addStuData = stus
          console.log(this.addStuData)
        })
        .catch((err) => {
          console.log(err)
        })
    },
    delStu(index, row) {
      this.$confirm('确认删除？')
        .then((_) => {
          this.queryStuData.splice(index, 1)

          this.deleteById = row.stuId
          var json = {
            stuId: this.deleteById,
          }
          axios
            .post('http://localhost:8090/stu/deleteById', json)
            .then((res) => {
              console.log(res.data)
            })
            .catch((err) => {
              console.log(err)
            })
        })
        .catch((_) => {})
    },
    stuEdit(index, row) {
      this.editDialogVisible = true
      this.oldstuId = row.stuId
      this.editObj = {
        id: row.id,
        stuId: row.stuId,
        name: row.name,
        gender: row.gender,
        major: row.major,
        stuClass: row.stuClass,
        date: row.date,
        idCard: row.idCard,
      }
      this.editIndex = index
    },
    addHandleClose() {
      this.addDialogVisible = false
    },
    editHandleClose() {
      this.editDialogVisible = false
    },
    addConfirm() {
      if (!this.addObj.stuId) {
        this.$message({
          showClose: true,
          message: '请输入学号！',
          type: 'warning',
        })
        return
      }
      if (!this.addObj.name) {
        this.$message({
          showClose: true,
          message: '请输入姓名！',
          type: 'warning',
        })
        return
      }
      if (!this.addObj.gender) {
        this.$message({
          showClose: true,
          message: '请输入性别！',
          type: 'warning',
        })
        return
      }
      if (!this.addObj.stuClass) {
        this.$message({
          showClose: true,
          message: '请输入班级！',
          type: 'warning',
        })
        return
      }
      if (!this.addObj.major) {
        this.$message({
          showClose: true,
          message: '请输入专业！',
          type: 'warning',
        })
        return
      }
      if (!this.addObj.date) {
        this.$message({
          showClose: true,
          message: '请选择入学日期！',
          type: 'warning',
        })
        return
      }
      if (!this.addObj.idCard) {
        this.$message({
          showClose: true,
          message: '请输入身份证号！',
          type: 'warning',
        })
        return
      }
      if (!/^31\d{8}$/.test(this.addObj.stuId)) {
        this.$message({
          showClose: true,
          message: '请输入正确的学号！',
          type: 'warning',
        })
        return
      }
      if (!/^[\u4e00-\u9fa5]{2,4}$/.test(this.addObj.name)) {
        this.$message({
          showClose: true,
          message: '请输入正确的姓名！',
          type: 'warning',
        })
        return
      }
      if (!/(^1[7-9]\d{4}$)|(^2[0-1]\d{4}$)/.test(this.addObj.stuClass)) {
        this.$message({
          showClose: true,
          message: '请输入正确的班级！',
          type: 'warning',
        })
        return
      }
      if (!/^[\u4e00-\u9fa5]{2,6}$/.test(this.addObj.major)) {
        this.$message({
          showClose: true,
          message: '请输入正确的专业名称！',
          type: 'warning',
        })
        return
      }
      if (
        !/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(this.addObj.idCard)
      ) {
        this.$message({
          showClose: true,
          message: '请输入正确的身份证号！',
          type: 'warning',
        })
        return
      }

      //不允许学号重复，身份证重复

      for (let index = 0; index < this.addStuData.length; index++) {
        if (this.addObj.stuId == this.addStuData[index].stuId) {
          this.$message({
            showClose: true,
            message: '学号已存在！',
            type: 'warning',
          })
          return
        }
        if (this.addObj.idCard == this.addStuData[index].idCard) {
          this.$message({
            showClose: true,
            message: '身份证号已存在！',
            type: 'warning',
          })
          return
        }
      }

      axios
        .get('http://localhost:8090/course/queryAll')
        .then((res) => {
          var courses = res.data
          for (let index = 0; index < courses.length; index++) {
            const element = courses[index].major
            this.majors.push(element)
          }
        })
        .catch((err) => console.log(err))

      //使用axios把数据增添到数据库
      var json = {
        stuId: this.addObj.stuId,
        name: this.addObj.name,
        gender: this.addObj.gender,
        major: this.addObj.major,
        stuClass: this.addObj.stuClass,
        date: this.addObj.date,
        idCard: this.addObj.idCard,
      }
      axios
        .post('http://localhost:8090/stu/insert', json)
        .then((res) => {
          console.log(res.data)
          this.$message({
            showClose: true,
            message: '添加成功！',
            type: 'success',
          })
        })
        .catch((err) => {
          console.log(err)
        })

      this.addDialogVisible = false

      this.addObj = {
        stuId: '',
        name: '',
        gender: '',
        major: '',
        stuClass: '',
        date: '',
        idCard: '',
      }
    },
    editConfirm() {
      if (!this.editObj.stuId) {
        this.$message({
          showClose: true,
          message: '请输入学号！',
          type: 'warning',
        })
        return
      }
      if (!this.editObj.name) {
        this.$message({
          showClose: true,
          message: '请输入姓名！',
          type: 'warning',
        })
        return
      }
      if (!this.editObj.gender) {
        this.$message({
          showClose: true,
          message: '请输入性别！',
          type: 'warning',
        })
        return
      }
      if (!this.editObj.stuClass) {
        this.$message({
          showClose: true,
          message: '请输入班级！',
          type: 'warning',
        })
        return
      }
      if (!this.editObj.major) {
        this.$message({
          showClose: true,
          message: '请输入专业！',
          type: 'warning',
        })
        return
      }
      if (!this.editObj.date) {
        this.$message({
          showClose: true,
          message: '请选择入学日期！',
          type: 'warning',
        })
        return
      }
      if (!this.editObj.idCard) {
        this.$message({
          showClose: true,
          message: '请输入身份证号！',
          type: 'warning',
        })
        return
      }
      if (!/^31\d{8}$/.test(this.editObj.stuId)) {
        this.$message({
          showClose: true,
          message: '请输入正确的学号！',
          type: 'warning',
        })
        return
      }
      if (!/^[\u4e00-\u9fa5]{2,4}$/.test(this.editObj.name)) {
        this.$message({
          showClose: true,
          message: '请输入正确的姓名！',
          type: 'warning',
        })
        return
      }
      if (!/(^1[7-9]\d{4}$)|(^2[0-1]\d{4}$)/.test(this.editObj.stuClass)) {
        this.$message({
          showClose: true,
          message: '请输入正确的班级！',
          type: 'warning',
        })
        return
      }
      if (!/^[\u4e00-\u9fa5]{2,6}$/.test(this.editObj.major)) {
        this.$message({
          showClose: true,
          message: '请输入正确的专业名称！',
          type: 'warning',
        })
        return
      }
      if (
        !/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(this.editObj.idCard)
      ) {
        this.$message({
          showClose: true,
          message: '请输入正确的身份证号！',
          type: 'warning',
        })
        return
      }
      for (var index = 0; index < this.queryStuData.length; index++) {
        if (index == this.editIndex) {
          continue
        }
        if (this.editObj.stuId == this.queryStuData[index].stuId) {
          this.$message({
            showClose: true,
            message: '学号已存在！',
            type: 'warning',
          })
          return
        }
        if (this.editObj.idCard == this.queryStuData[index].idCard) {
          this.$message({
            showClose: true,
            message: '身份证号已存在！',
            type: 'warning',
          })
          return
        }
      }

      //axios
      //update到
      var json = {
        oldstuId: this.oldstuId,
        stuId: this.editObj.stuId,
        name: this.editObj.name,
        gender: this.editObj.gender,
        stuClass: this.editObj.stuClass,
        major: this.editObj.major,
        date: this.editObj.date,
        idCard: this.editObj.idCard,
      }
      console.log(json)
      axios
        .post('http://localhost:8090/stu/updateById', json)
        .then((res) => {
          console.log(res.data)
        })
        .catch((err) => console.log(err))

      Vue.set(this.queryStuData, this.editIndex, this.editObj)
      this.editDialogVisible = false
    },
    queryStu() {
      //条件查询
      //axios
      this.queryStuData = []
      var queryjson = {
        stuId: this.stuInfo.stuId,
        name: this.stuInfo.name,
        gender: this.stuInfo.gender,
        stuClass: this.stuInfo.stuClass,
        major: this.stuInfo.major,
        date: this.stuInfo.date,
        idCard: this.stuInfo.idCard,
      }
      axios
        .post('http://localhost:8090/stu/queryByConditions', queryjson)
        .then((res) => {
          var stus = res.data
          for (let index = 0; index < stus.length; index++) {
            this.queryStuData.push(stus[index])
          }
        })
        .catch((err) => err)
    },
  },
}
</script>

<style scoped>
.queryStuBt {
  margin-top: 20px;
  width: 100%;
}
.addStu {
  width: 100%;
}
.queryStu {
  margin-top: 10px;
  border: 2px solid rgba(236, 231, 231, 0.5);
}
</style>
