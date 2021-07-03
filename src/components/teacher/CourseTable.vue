<template>
  <div class="Home">
    <template>
      <el-table style="width: 100%" :data="this.queryCourseData">
        <el-table-column prop="cname" label="课程名称"> </el-table-column>
        <el-table-column prop="hour" label="课时"> </el-table-column>
        <el-table-column prop="credits" label="学分"> </el-table-column>
        <el-table-column prop="" label="课节信息">
          <template slot-scope="scope">
            <el-button
              type="primary"
              @click="coursesShow(scope.$index, scope.row)"
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

    <!--   课节相关信息 -->
    <el-dialog
      :title="this.courseTitile"
      :visible.sync="this.lessondialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <el-table :data="this.courseList" style="width: 100%">
        <el-table-column prop="week" label="周次"> </el-table-column>
        <el-table-column prop="classtime" label="上课时间"> </el-table-column>
        <el-table-column prop="classroom" label="教室"> </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-size="pagesize"
        layout="total, prev, pager, next, jumper"
        :total="this.courseList.length"
      ></el-pagination>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="lessondialogVisible = false"
          >确 定</el-button
        >
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
      courseList: [],
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
        console.log(this.queryCourseData)
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
    coursesShow(index, row) {
      this.courseTitile = row.cname
      this.lessondialogVisible = true
      this.courseList = row.lessonList
      console.log(row.lessonList)
    },
    handleClose() {
      this.lessondialogVisible = false
    },
  },
}
</script>
<style scoped></style>
