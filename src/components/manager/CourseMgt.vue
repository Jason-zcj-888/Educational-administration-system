<template>
  <div>
    <div class="head">
      <div>
        <el-button type="primary" class="addCourse" @click="addCourse()"
          >添加课程</el-button
        >

        <!-- 增添对话框 -->
        <el-dialog
          title="添加课程"
          :visible.sync="addDialogVisible"
          width="30%"
          :before-close="addHandleClose"
        >
          <el-form ref="form" :model="addObj" label-width="150px">
            <el-form-item label="课程编号" style="width:330px">
              <el-input v-model="addObj.cid"></el-input>
            </el-form-item>
            <el-form-item label="课程名称" style="width:330px">
              <el-input v-model="addObj.cname"></el-input>
            </el-form-item>
            <el-form-item label="所属专业" style="width:330px">
              <el-input v-model="addObj.major.name"></el-input>
            </el-form-item>
            <el-form-item label="任课教师编号" style="width:330px">
              <el-input
                v-model="addObj.tId"
                placeholder="暂时没有则无需填写"
              ></el-input>
            </el-form-item>
            <el-form-item label="学分" style="width:330px">
              <el-input v-model="addObj.credits"></el-input>
            </el-form-item>
            <el-form-item label="课时" style="width:330px">
              <el-input v-model="addObj.hour"></el-input>
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="addDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="addConfirm()">确 定</el-button>
          </span>
        </el-dialog>
      </div>
      <hr class="hr" />

      <!-- 条件查询 -->

      <div class="queryCourse">
        <div>
          <el-row :gutter="40">
            <el-col :span="5"
              ><div class="grid-content bg-purple cid">
                <el-input
                  v-model="CourseInfo.cid"
                  placeholder="请输入课程编号"
                ></el-input></div
            ></el-col>
            <el-col :span="4"
              ><div class="grid-content bg-purple">
                <el-input
                  v-model="CourseInfo.cname"
                  placeholder="请输入课程名称"
                ></el-input></div
            ></el-col>
            <el-col :span="5"
              ><div class="grid-content bg-purple">
                <el-input
                  v-model="CourseInfo.major"
                  placeholder="请输入课程所属专业"
                ></el-input></div
            ></el-col>
            <el-col :span="4"
              ><div class="grid-content bg-purple">
                <el-input
                  v-model="CourseInfo.hour"
                  placeholder="请输入课时"
                ></el-input></div
            ></el-col>
            <el-col :span="4">
              <el-button
                type="primary"
                class="queryStuBt"
                @click="queryCourse()"
                >查询课程信息</el-button
              >
            </el-col>
          </el-row>
        </div>
      </div>
    </div>
    <div class="body">
      <!-- table表格 -->
      <template>
        <el-table
          style="width: 100%"
          :data="
            this.queryCourseData.slice(
              (currentPage - 1) * pagesize,
              currentPage * pagesize
            )
          "
        >
          <el-table-column prop="" label="序号" type="index" width="80">
          </el-table-column>
          <el-table-column prop="cid" label="课程编号"> </el-table-column>
          <el-table-column prop="cname" label="课程名称"> </el-table-column>
          <el-table-column prop="major.name" label="所属专业">
          </el-table-column>
          <el-table-column prop="hour" label="课时" width="180">
          </el-table-column>
          <el-table-column prop="" label="课节信息" width="180">
            <template slot-scope="scope">
              <el-button
                type="primary"
                @click="lessonShow(scope.$index, scope.row)"
                >查看</el-button
              >
            </template>
          </el-table-column>
          <el-table-column prop="" label="操作">
            <template slot-scope="scope">
              <el-button
                type="primary"
                icon="el-icon-edit"
                @click="CourseEdit(scope.$index, scope.row)"
                circle
              ></el-button>
              <el-button
                type="danger"
                icon="el-icon-delete"
                @click="delCourse(scope.$index, scope.row)"
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
        :total="this.queryCourseData.length"
      >
      </el-pagination>
    </div>
    <!-- 编辑对话框 -->
    <el-dialog
      title="编辑课程信息"
      :visible.sync="editDialogVisible"
      width="30%"
      :before-close="editHandleClose"
    >
      <el-form ref="form" :model="editObj" label-width="150px">
        <el-form-item label="课程编号" style="width:330px">
          <el-input v-model="editObj.cid"></el-input>
        </el-form-item>
        <el-form-item label="课程名称" style="width:330px">
          <el-input v-model="editObj.cname"></el-input>
        </el-form-item>
        <el-form-item label="所属专业" style="width:330px">
          <el-input v-model="editObj.major.name"></el-input>
        </el-form-item>
        <el-form-item label="任课教师编号" style="width:330px">
          <el-input
            v-model="editObj.tId"
            placeholder="暂时没有则无需填写"
          ></el-input>
        </el-form-item>
        <el-form-item label="学分" style="width:330px">
          <el-input v-model="editObj.credits"></el-input>
        </el-form-item>
        <el-form-item label="课时" style="width:330px">
          <el-input v-model="editObj.hour"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editConfirm()">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 查看课节信息 -->
    <el-dialog
      :title="this.courseTitile"
      :visible.sync="this.lessonDialogVisible"
      width="40%"
      :before-close="lessonHandleClose"
    >
      <div class="lessonBtn">
        <el-button type="primary" @click="editLessonDialogVisible = true"
          >导入课节</el-button
        >
      </div>
      <el-table :data="lessonInfo" style="width: 100%">
        <el-table-column prop="week" label="周次"> </el-table-column>
        <el-table-column prop="classtime" label="课节"> </el-table-column>
        <el-table-column prop="classroom" label="教室"> </el-table-column>
        <el-table-column prop="" label="操作">
          <template slot-scope="scope">
            <el-button
              type="primary"
              @click="lessonDelete(scope.$index, scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button type="info" @click="lessonDialogVisible = false"
          >退出</el-button
        >
      </span>
    </el-dialog>

    <!-- 导入课节信息 -->
    <el-dialog
      title="导入课节信息"
      :visible.sync="editLessonDialogVisible"
      width="30%"
      :before-close="editLessonHandleClose"
    >
      <el-form ref="form" :model="this.lessonObj" label-width="100px">
        <el-form-item label="周次" style="width:330px" class="lessonForm">
          <el-input v-model="lessonObj.week"></el-input>
        </el-form-item>
        <span style="font-size: 15px; color: #d9d9d9">
          <span></span>格式：x-y周，例如1-10周
        </span>
        <el-form-item label="课节" style="width:330px" class="lessonForm">
          <el-input v-model="lessonObj.classtime"></el-input>
        </el-form-item>
        <span style="font-size: 15px; color: #d9d9d9">
          <span></span>格式：星期几/x-y节，例如星期一/3-4节
        </span>
        <el-form-item label="教室" style="width:330px" class="lessonForm">
          <el-input v-model="lessonObj.classroom"></el-input>
        </el-form-item>
        <span style="font-size: 15px; color: #d9d9d9">
          <span></span>格式：xyz，例如304
        </span>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editLessonDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="lessonConfirm()">确 定</el-button>
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
  created() {
    axios
      .get('http://localhost:8090/course/queryAll')
      .then((res) => {
        // console.log(res.data)
        this.queryCourseData = res.data
      })
      .catch((err) => console.log(err))
  },
  data() {
    return {
      editId: '',
      majorId: '',
      majors: [],
      CourseInfo: {
        cid: '',
        cname: '',
        major: '',
        hour: '',
      },
      queryCourseData: [],
      addCourseData: [],
      editObj: {
        cid: '',
        cname: '',
        major: {
          name: '',
        },
        hour: '',
        credits: '',
        tId: '',
      },
      addObj: {
        cid: '',
        cname: '',
        major: {
          name: '',
        },
        credits: '',
        tId: '',
        hour: '',
      },
      addDialogVisible: false,
      editIndex: 0,
      editDialogVisible: false,
      lessonDialogVisible: false,
      deleteById: '',
      currentPage: 1,
      pagesize: 5,
      courseTitile: '',
      lessonInfo: [],
      editLessonDialogVisible: false,
      lessonObj: {
        lessonId: '',
        week: '',
        classtime: '',
        classroom: '',
      },
    }
  },
  methods: {
    lessonDelete(index, row) {
      this.lessonInfo.splice(index, 1)
      console.log(row)
      var json = {
        week: row.week,
        classtime: row.classtime,
        classroom: row.classroom,
      }
      console.log(json)
      axios
        .post('http://localhost:8090/course/deleteLesson', json)
        .then((res) => {
          console.log(1)
        })
        .catch((err) => {
          console.log(err)
        })
    },
    lessonConfirm() {
      console.log(this.lessonObj)
      var json = {
        week: this.lessonObj.week,
        classtime: this.lessonObj.classtime,
        classroom: this.lessonObj.classroom,
        lessonId: this.lessonObj.lessonId,
      }
      this.lessonInfo.push(this.lessonObj)
      axios
        .post('http://localhost:8090/course/insertLesson', json)
        .then((res) => {
          console.log(res.data)
          console.log(json)
        })
        .catch((err) => {
          console.log(err)
        })
      this.lessonObj = {
        lessonId: '',
        week: '',
        classtime: '',
        classroom: '',
      }
      this.editLessonDialogVisible = false
    },
    editLessonHandleClose() {
      this.editLessonDialogVisible = false
    },
    lessonShow(index, row) {
      // console.log(row)
      this.lessonDialogVisible = true
      this.lessonObj.lessonId = row.lessonId
      this.courseTitile = row.cname
      var json = {
        lessonId: row.lessonId,
      }
      axios
        .post('http://localhost:8090/stu/selectLesson', json)
        .then((res) => {
          // console.log(res.data)
          // console.log(json)
          this.lessonInfo = res.data
        })
        .catch((err) => {
          console.log(err)
        })
    },
    lessonHandleClose() {
      this.lessonDialogVisible = false
    },
    handleSizeChange: function(size) {
      this.pagesize = size
    },
    handleCurrentChange: function(currentPage) {
      this.currentPage = currentPage
    },

    addCourse() {
      this.addDialogVisible = true
      this.addObj = {
        cid: '2362',
        cname: '自动化',
        major: {
          name: '交通工程',
        },
        hour: '1',
        credits: '4',
      }
      axios
        .get('http://localhost:8090/course/queryAll')
        .then((res) => {
          var courses = res.data
          for (let index = 0; index < courses.length; index++) {
            const element = courses[index].major
            this.majors.push(element)
          }
          this.addCourseData = courses
        })
        .catch((err) => console.log(err))
    },
    delCourse(index, row) {
      this.$confirm('确认删除？')
        .then((_) => {
          this.queryCourseData.splice(index, 1)

          this.deleteById = row.cid
          var json = {
            cid: this.deleteById,
          }

          // 根据索引值删除数据
          axios
            .post('http://localhost:8090/course/deleteById', json)
            .then((res) => {})
            .catch((err) => {
              console.log(err)
            })
        })
        .catch((_) => {})
    },
    CourseEdit(index, row) {
      this.editDialogVisible = true
      this.editId = row.cid
      console.log(row)
      this.editObj = {
        cid: row.cid,
        cname: row.cname,
        major: {
          name: row.major.name,
        },
        hour: row.hour,
        credits: row.credits,
        tId: row.tid,
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
      if (!this.addObj.cid) {
        this.$message({
          showClose: true,
          message: '请输入课程编号！',
          type: 'warning',
        })
        return
      }
      if (!this.addObj.cname) {
        this.$message({
          showClose: true,
          message: '请输入课程名称！',
          type: 'warning',
        })
        return
      }

      if (!this.addObj.major.name) {
        this.$message({
          showClose: true,
          message: '请输入课程所属专业！',
          type: 'warning',
        })
        return
      }

      if (!this.addObj.hour) {
        this.$message({
          showClose: true,
          message: '请输入课程课时！',
          type: 'warning',
        })
        return
      }

      if (!this.addObj.credits) {
        this.$message({
          showClose: true,
          message: '请输入课程学分！',
          type: 'warning',
        })
        return
      }
      if (!/^\d{4}$/.test(this.addObj.cid)) {
        this.$message({
          showClose: true,
          message: '请输入正确的课程编号！',
          type: 'warning',
        })
        return
      }
      if (!/^[\u4e00-\u9fa5]{2,6}$/.test(this.addObj.major.name)) {
        this.$message({
          showClose: true,
          message: '请输入正确的课程所属专业！',
          type: 'warning',
        })
        return
      }
      if (!/(^[0-9]$)/.test(this.addObj.hour)) {
        this.$message({
          showClose: true,
          message: '请输入正确的课时！',
          type: 'warning',
        })
        return
      }

      //不允许学号重复，身份证重复
      for (let index = 0; index < this.addCourseData.length; index++) {
        if (this.addObj.cid == this.addCourseData[index].cid) {
          this.$message({
            showClose: true,
            message: '该课程编号已存在！',
            type: 'warning',
          })
          return
        }
        if (this.addObj.cname == this.addCourseData[index].cname) {
          this.$message({
            showClose: true,
            message: '该课程名称已存在！',
            type: 'warning',
          })
          return
        }
      }
      //检验该专业是否存在

      for (let index = 0; index < this.majors.length; index++) {
        if (this.addObj.major.name == this.majors[index].name) {
          this.majorId = this.majors[index].id
          console.log(this.majorId)
        }
      }
      if (!this.majorId) {
        this.$message({
          showClose: true,
          message: '该专业不存在！',
          type: 'warning',
        })
        return
      }

      //使用axios把数据增添到数据库
      var json = {
        cid: this.addObj.cid,
        cname: this.addObj.cname,
        mid: this.majorId,
        hour: this.addObj.hour,
        tId: this.addObj.tId,
        credits: this.addObj.credits,
      }
      console.log(json)
      axios
        .post('http://localhost:8090/course/insert', json)
        .then((res) => {
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
        cid: '',
        cname: '',
        major: '',
        hour: '',
      }
    },

    //编辑模块
    editConfirm() {
      if (!this.editObj.cid) {
        this.$message({
          showClose: true,
          message: '请输入课程编号！',
          type: 'warning',
        })
        return
      }
      if (!this.editObj.cname) {
        this.$message({
          showClose: true,
          message: '请输入课程名称！',
          type: 'warning',
        })
        return
      }

      if (!this.editObj.major.name) {
        this.$message({
          showClose: true,
          message: '请输入所属专业！',
          type: 'warning',
        })
        return
      }
      if (!this.editObj.hour) {
        this.$message({
          showClose: true,
          message: '请输入课时！',
          type: 'warning',
        })
        return
      }
      if (!/^\d{4}$/.test(this.editObj.cid)) {
        this.$message({
          showClose: true,
          message: '请输入正确的课程编号！',
          type: 'warning',
        })
        return
      }

      if (!/^[\u4e00-\u9fa5]{2,6}$/.test(this.editObj.major.name)) {
        this.$message({
          showClose: true,
          message: '请输入正确的课程所属专业！',
          type: 'warning',
        })
        return
      }
      if (!/(^[0-9]$)/.test(this.editObj.hour)) {
        this.$message({
          showClose: true,
          message: '请输入正确的课时！',
          type: 'warning',
        })
        return
      }
      for (var index = 0; index < this.queryCourseData.length; index++) {
        if (index == this.editIndex) {
          continue
        }
        if (this.editObj.cid == this.queryCourseData[index].cid) {
          this.$message({
            showClose: true,
            message: '该课程编号已存在！',
            type: 'warning',
          })
          return
        }
        if (this.editObj.cname == this.queryCourseData[index].cname) {
          this.$message({
            showClose: true,
            message: '该课程名称已存在！',
            type: 'warning',
          })
          return
        }
      }

      //axios
      //update到
      for (let index = 0; index < this.majors.length; index++) {
        if (this.editObj.major.name == this.majors[index].name) {
          this.majorId = this.majors[index].id
          console.log(this.majorId)
        }
      }
      if (!this.majorId) {
        this.$message({
          showClose: true,
          message: '该专业不存在！',
          type: 'warning',
        })
        return
      }

      var json = {
        fristId: this.editId,
        cid: this.editObj.cid,
        cname: this.editObj.cname,
        mid: this.majorId,
        hour: this.editObj.hour,
        tId: this.editObj.tId,
        credits: this.editObj.credits,
      }
      console.log(json)
      axios
        .post('http://localhost:8090/course/updateByFristId', json)
        .then((res) => {
          console.log(res.data)
        })
        .catch((err) => console.log(err))
      Vue.set(this.queryCourseData, this.editIndex, this.editObj)
      this.editDialogVisible = false
      this.majorId = ''
    },

    //条件查询
    queryCourse() {
      //axios
      this.queryCourseData = []
      var queryjson = {
        cid: this.CourseInfo.cid,
        cname: this.CourseInfo.cname,
        major: this.CourseInfo.major,
        hour: this.CourseInfo.hour,
      }
      console.log(queryjson)
      axios
        .post('http://localhost:8090/course/queryByConditions', queryjson)
        .then((res) => {
          console.log(res)
          var courses = res.data
          for (let index = 0; index < courses.length; index++) {
            this.queryCourseData.push(courses[index])
          }
        })
        .catch((err) => err)
    },
  },
}
</script>

<style scoped>
.cid {
  margin-left: 50px;
}
.queryStuBt {
  width: 100%;
}
.addCourse {
  width: 100%;
}
.queryCourse {
  margin-top: 10px;
  border: 2px solid rgba(236, 231, 231, 0.5);
}
.lessonBtn {
  width: 100px;
}
.lessonForm {
  margin: 10px;
}
</style>
