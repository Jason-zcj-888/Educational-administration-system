<template>
  <!-- 课程查询 -->
  <div class="queryCourse">
    <template>
      <el-table
        style="width: 100%"
        :data="
          this.CoursesInfo.slice(
            (currentPage - 1) * pagesize,
            currentPage * pagesize
          )
        "
      >
        <el-table-column prop="course.cname" label="课程名称">
        </el-table-column>
        <el-table-column prop="course.hour" label="课时"> </el-table-column>
        <el-table-column prop="course.credits" label="学分"> </el-table-column>
        <el-table-column prop="course.grade" label="课程成绩">
        </el-table-column>
        <el-table-column prop="" label="课节信息">
          <template slot-scope="scope">
            <el-link
              type="primary"
              @click="lessonShow(scope.$index, scope.row)"
              :underline="false"
              >查看</el-link
            >
          </template></el-table-column
        >
        <el-table-column prop="" label="操作">
          <template slot-scope="scope">
            <el-button type="info" @click="quitCourse(scope.$index, scope.row)"
              >退选</el-button
            >
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
      :total="this.CoursesInfo.length"
    >
    </el-pagination>

    <!-- 课节查询 -->
    <el-dialog
      :title="this.courseTitile"
      :visible.sync="this.lessondialogVisible"
      width="40%"
      :before-close="lessonhandleClose"
    >
      <el-table :data="this.lessonInfo" style="width: 100%">
        <el-table-column prop="week" label="周次"> </el-table-column>
        <el-table-column prop="classtime" label="课节"> </el-table-column>
        <el-table-column prop="classroom" label="教室"> </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button type="info" @click="lessondialogVisible = false"
          >退出</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'QueryCourse',
  data() {
    return {
      CoursesInfo: [],
      courseTitile: '',
      lessondialogVisible: false,
      lessonInfo: [],
      stuUsername: '',
      currentPage: 1,
      pagesize: 5,
    }
  },
  components: {},
  created() {
    this.stuUsername = sessionStorage.getItem('stuUsername')
    var json = {
      sid: this.stuUsername,
    }
    axios
      .post('http://localhost:8090/stu/selectCourseBysid', json)
      .then((res) => {
        console.log(res.data)
        this.CoursesInfo = res.data
      })
      .catch((err) => {
        console.log(err)
      })
  },
  methods: {
    lessonShow(index, row) {
      console.log(row)
      this.lessondialogVisible = true
      this.courseTitile = row.course.cname

      var json = {
        lessonId: row.course.id,
      }
      axios
        .post('http://localhost:8090/stu/selectLesson', json)
        .then((res) => {
          console.log(res.data)
          this.lessonInfo = res.data
        })
        .catch((err) => {
          console.log(err)
        })
    },
    lessonhandleClose() {
      this.lessondialogVisible = false
    },
    quitCourse(index, row) {
      this.$confirm('确认退选该课程？')
        .then((_) => {
          this.CoursesInfo.splice(index, 1)
          var json = {
            sid: this.stuUsername,
            cid: row.course.cid,
          }
          console.log(this.stuUsername)
          console.log(row.course.cid)
          axios
            .post('http://localhost:8090/stu/quitCourse', json)
            .then((res) => {})
            .catch((err) => {
              console.log(err)
            })
          this.$message({
            showClose: true,
            message: '选课成功！',
            type: 'success',
          })
        })
        .catch((_) => {})
    },
    handleSizeChange: function(size) {
      this.pagesize = size
      console.log(this.pagesize) //每页下拉显示数据
    },
    handleCurrentChange: function(currentPage) {
      this.currentPage = currentPage
      console.log(this.currentPage) //点击第几页
    },
  },
}
</script>
