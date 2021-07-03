<template>
  <div class="Home">
    <template>
      <el-table style="width: 100%" :data="this.queryCourseData">
        <el-table-column prop="cname" label="课程名称"> </el-table-column>
        <el-table-column prop="hour" label="课时"> </el-table-column>
        <el-table-column prop="credits" label="学分"> </el-table-column>
        <el-table-column prop="" label="学生信息">
          <template slot-scope="scope">
            <el-button type="primary" @click="stusShow(scope.$index, scope.row)"
              >查看
            </el-button>
          </template></el-table-column
        >
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

    <!--   学生相关信息 -->
    <el-dialog
      :title="this.courseTitile"
      :visible.sync="this.lessondialogVisible"
      width="40%"
      :before-close="lessonhandleClose"
    >
      <el-table :data="this.stusInfo" style="width: 100%">
        <el-table-column prop="stu.stuId" label="学号"> </el-table-column>
        <el-table-column prop="stu.name" label="姓名"> </el-table-column>
        <el-table-column prop="stu.stuClass" label="班级"> </el-table-column>
        <el-table-column prop="grade" label="成绩"></el-table-column>
        <el-table-column prop="" label="操作">
          <template slot-scope="scope">
            <el-link type="primary" @click="gradelog(scope.$index, scope.row)"
              >录入成绩</el-link
            >
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-size="pagesize"
        layout="total, prev, pager, next, jumper"
        :total="this.stusInfo.length"
      >
      </el-pagination>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="lessondialogVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <!--   成绩录入 -->
    <el-dialog
      :title="this.courseTitile"
      :visible.sync="this.gradedialogVisible"
      width="40%"
      :before-close="gradehandleClose"
    >
      <el-form ref="form" :model="gradeform" label-width="180px">
        <el-form-item label="成绩">
          <el-input v-model="gradeform.grade" style="width: 60%;"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="gradeconfirm()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'CourseTable',
  props: {},
  data() {
    return {
      queryCourseData: [],
      courseTitile: '',
      lessondialogVisible: false,
      gradedialogVisible: false,
      courseList: [],
      stusInfo: [],
      gradeform: {},
      cid: '',
      currentPage: 1,
      pagesize: 4,
    }
  },
  created() {
    var json = {
      teaId: '51400',
    }
    axios
      .post('http://localhost:8090/tea/selectByTid', json)
      .then((res) => {
        console.log(res.data)
        this.queryCourseData = res.data
        // console.log(this.queryCourseData)
      })
      .catch((err) => {
        console.log(err)
      })
  },
  methods: {
    handleSizeChange: function(size) {
      this.pagesize = size
    },
    handleCurrentChange: function(currentPage) {
      this.currentPage = currentPage
    },
    stusShow(index, row) {
      this.courseTitile = row.cname
      this.lessondialogVisible = true
      var json2 = {
        cId: row.cid,
      }
      axios
        .post('http://localhost:8090/tea/queryStusGradeByCId', json2)
        .then((res) => {
          this.stusInfo = res.data
        })
        .catch((err) => {
          console.log(err)
        })
      this.cid = row.cid
    },
    lessonhandleClose() {
      this.lessondialogVisible = false
    },

    gradehandleClose() {
      this.gradedialogVisible = false
    },

    gradelog(index, row) {
      this.gradeform = row
      this.gradedialogVisible = true
    },
    gradeconfirm() {
      if (this.gradeform.grade > 100 || this.gradeform.grade < 0) {
        this.$message({
          showClose: true,
          message: '分数范围为0-100，请重新输入',
          type: 'warning',
        })
        return
      }

      var json = {
        cid: this.cid,
        sid: this.gradeform.stu.stuId,
        grade: this.gradeform.grade,
      }
      axios
        .post('http://localhost:8090/tea/updateByGrade', json)
        .then((res) => {
          console.log(res.data)
        })
        .catch((err) => {
          console.log(err)
        })

      this.gradedialogVisible = false
    },
  },
}
</script>
<style scoped></style>
