<template>
  <div class="selectCourse">
    <template>
      <el-table
        style="width: 100%"
        :data="
          CoursesInfo.slice(
            (currentPage - 1) * pagesize,
            currentPage * pagesize
          )
        "
      >
        <el-table-column prop="cname" label="课程名称"> </el-table-column>
        <el-table-column prop="tea.name" label="教师"> </el-table-column>
        <el-table-column prop="hour" label="课时"> </el-table-column>
        <el-table-column prop="credits" label="学分"> </el-table-column>
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
            <el-button
              type="primary"
              @click="selectCourse(scope.$index, scope.row)"
              >选课</el-button
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
  name: 'SelectCourse',
  components: {},
  created() {
    this.stuUsername = sessionStorage.getItem('stuUsername')
    var json = {
      stuId: this.stuUsername,
    }
    axios
      .post('http://localhost:8090/stu/selectAllCourses', json)
      .then((res) => {
        console.log(res.data)
        this.CoursesInfo = res.data
        for (let index = 0; index < this.CoursesInfo.length; index++) {
          if (!this.CoursesInfo[index].tea.name) {
            this.CoursesInfo[index].tea.name = '暂无'
          }
        }
      })
      .catch((err) => {
        console.log(err)
      })
  },
  data() {
    return {
      CoursesInfo: [],
      lessondialogVisible: false,
      lessonInfo: [],
      courseTitile: '',
      buttonshow: true,
      stuUsername: '',
      currentPage: 1,
      pagesize: 5,
    }
  },
  methods: {
    lessonShow(index, row) {
      this.courseTitile = row.cname
      this.lessondialogVisible = true
      var json = {
        lessonId: row.id,
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
    selectCourse(index, row) {
      this.$confirm('确认选择该课程？')
        .then((_) => {
          this.CoursesInfo.splice(index, 1)
          var json = {
            sid: this.stuUsername,
            cid: row.cid,
          }
          axios
            .post('http://localhost:8090/stu/insertCourse', json)
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
