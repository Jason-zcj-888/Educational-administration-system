<template>
  <div>
    <div class="head">
      <div>
        <el-button type="primary" class="addMajor" @click="addMajor()"
          >添加专业</el-button
        >

        <!-- 添加专业 -->

        <el-dialog
          title="添加专业"
          :visible.sync="addDialogVisible"
          width="30%"
          :before-close="addHandleClose"
        >
          <el-form ref="form" :model="addObj" label-width="80px">
            <el-form-item label="专业编号">
              <el-input v-model="addObj.id"></el-input>
            </el-form-item>
            <el-form-item label="专业名称">
              <el-input v-model="addObj.name"></el-input>
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

      <div class="queryMajor">
        <div>
          <el-row :gutter="20">
            <el-col :span="9"
              ><div class="grid-content bg-purple id">
                <el-input
                  v-model="majorInfo.id"
                  placeholder="请输入专业编号"
                ></el-input></div
            ></el-col>
            <el-col :span="5"
              ><div class="grid-content bg-purple">
                <el-input
                  v-model="majorInfo.name"
                  placeholder="请输入专业名称"
                ></el-input></div
            ></el-col>
            <el-col :span="6">
              <div class="queryMajorBt">
                <el-button type="primary" @click="queryMajor()"
                  >查询专业</el-button
                >
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
    </div>
    <div class="body">
      <!-- table数据表格 -->

      <template>
        <el-table
          style="width: 100%"
          :data="
            queryMajorData.slice(
              (currentPage - 1) * pagesize,
              currentPage * pagesize
            )
          "
        >
          <el-table-column prop="" label="序号" type="index" width="280">
          </el-table-column>
          <el-table-column prop="id" label="专业编号"> </el-table-column>
          <el-table-column prop="name" label="专业名称"> </el-table-column>
          <el-table-column prop="">
            <template slot-scope="scope">
              <el-link
                type="primary"
                @click="coursesShow(scope.$index, scope.row)"
                >相关课程</el-link
              >
            </template>
          </el-table-column>
          <el-table-column prop="" label="操作">
            <template slot-scope="scope">
              <el-button
                type="primary"
                icon="el-icon-edit"
                @click="majorEdit(scope.$index, scope.row)"
                circle
              ></el-button>
              <el-button
                type="danger"
                icon="el-icon-delete"
                @click="delMajor(scope.$index, scope.row)"
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
        :total="this.queryMajorData.length"
      >
      </el-pagination>
    </div>

    <!-- 专业相关课程信息 -->
    <el-dialog
      :title="this.courseTitile"
      :visible.sync="querydialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <el-table :data="this.courseList" style="width: 100%">
        <el-table-column prop="cid" label="课程编号"> </el-table-column>
        <el-table-column prop="cname" label="课程名称"> </el-table-column>
        <el-table-column prop="hour" label="课时"> </el-table-column>
        <el-table-column prop="credits" label="学分"> </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="querydialogVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>

    <!-- 编辑专业信息 -->
    <el-dialog
      title="编辑专业信息"
      :visible.sync="editDialogVisible"
      width="30%"
      :before-close="editHandleClose"
    >
      <el-form ref="form" :model="editObj" label-width="80px">
        <el-form-item label="专业编号">
          <el-input v-model="editObj.id"></el-input>
        </el-form-item>
        <el-form-item label="专业名称">
          <el-input v-model="editObj.name"></el-input>
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
  data() {
    return {
      fristId: '',
      courseTitile: '',
      querydialogVisible: false,
      courseList: [],
      majorInfo: {
        id: '',
        name: '',
      },
      queryMajorData: [],
      selectInfoBeforeAdd: [],
      editObj: {
        id: '',
        name: '',
      },
      addObj: {
        id: '',
        name: '',
      },
      addDialogVisible: false,
      editIndex: 0,
      editDialogVisible: false,
      deleteById: '',
      currentPage: 1,
      pagesize: 5,
    }
  },
  created() {
    axios
      .get('http://localhost:8090/major/selectMajors')
      .then((res) => {
        console.log(res.data)
        this.queryMajorData = res.data
      })
      .catch((err) => {})
  },
  methods: {
    handleClose() {
      this.querydialogVisible = false
    },
    coursesShow(index, row) {
      this.querydialogVisible = true
      this.courseTitile = row.name
      var json = {
        mid: row.id,
      }
      axios
        .post('http://localhost:8090/major/selectByMajorId', json)
        .then((res) => {
          var courses = res.data
          this.courseList = courses.courseList
          console.log(this.courseList)
        })
        .catch((err) => {})
    },

    handleSizeChange: function(size) {
      this.pagesize = size
      console.log(this.pagesize) //每页下拉显示数据
    },
    handleCurrentChange: function(currentPage) {
      this.currentPage = currentPage
      console.log(this.currentPage) //点击第几页
    },

    addMajor() {
      this.addDialogVisible = true
      this.addObj = {
        id: '123',
        name: '土木工程',
      }
      //查询之前更新所有数据
      axios
        .get('http://localhost:8090/major/selectMajors')
        .then((res) => {
          this.selectInfoBeforeAdd = res.data
        })
        .catch((err) => {})
    },
    delMajor(index, row) {
      console.log(row)
      this.$confirm('确认删除？')
        .then((_) => {
          this.queryMajorData.splice(index, 1)
          this.deleteById = row.id

          var json = {
            id: this.deleteById,
          }
          axios
            .post('http://localhost:8090/major/deleteById', json)
            .then((res) => {
              console.log(res.data)
            })
            .catch((err) => {
              console.log(err)
            })
        })
        .catch((_) => {})
    },
    majorEdit(index, row) {
      this.editDialogVisible = true
      this.fristId = row.id
      this.editObj = {
        id: row.id,
        name: row.name,
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
      if (!this.addObj.id) {
        this.$message({
          showClose: true,
          message: '请输入专业编号！',
          type: 'warning',
        })
        return
      }
      if (!this.addObj.name) {
        this.$message({
          showClose: true,
          message: '请输入专业名称！',
          type: 'warning',
        })
        return
      }
      if (!/^\d{3}$/.test(this.addObj.id)) {
        this.$message({
          showClose: true,
          message: '请输入正确的专业编号！',
          type: 'warning',
        })
        return
      }
      if (!/^[\u4e00-\u9fa5]{2,4}$/.test(this.addObj.name)) {
        this.$message({
          showClose: true,
          message: '请输入正确的专业名称！',
          type: 'warning',
        })
        return
      }

      //不允许专业编号重复，专业名称重复

      for (let index = 0; index < this.selectInfoBeforeAdd.length; index++) {
        if (this.addObj.id == this.selectInfoBeforeAdd[index].id) {
          this.$message({
            showClose: true,
            message: '该专业编号已存在！',
            type: 'warning',
          })
          return
        }
        if (this.addObj.name == this.selectInfoBeforeAdd[index].name) {
          this.$message({
            showClose: true,
            message: '该专业名称已存在！',
            type: 'warning',
          })
          return
        }
      }
      //使用axios把数据增添到数据库
      var json = {
        id: this.addObj.id,
        name: this.addObj.name,
      }
      console.log(json)
      axios
        .post('http://localhost:8090/major/insert', json)
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
        id: '',
        name: '',
      }
    },
    editConfirm() {
      if (!this.editObj.id) {
        this.$message({
          showClose: true,
          message: '请输入专业编号！',
          type: 'warning',
        })
        return
      }
      if (!this.editObj.name) {
        this.$message({
          showClose: true,
          message: '请输入专业名称！',
          type: 'warning',
        })
        return
      }

      if (!/^\d{3}$/.test(this.editObj.id)) {
        this.$message({
          showClose: true,
          message: '请输入正确的专业编号！',
          type: 'warning',
        })
        return
      }
      if (!/^[\u4e00-\u9fa5]{2,4}$/.test(this.editObj.name)) {
        this.$message({
          showClose: true,
          message: '请输入正确的专业名称！',
          type: 'warning',
        })
        return
      }
      for (var index = 0; index < this.queryMajorData.length; index++) {
        if (index == this.editIndex) {
          continue
        }
        if (this.editObj.id == this.queryMajorData[index].id) {
          this.$message({
            showClose: true,
            message: '该专业编号已存在！',
            type: 'warning',
          })
          return
        }
        if (this.editObj.name == this.queryMajorData[index].name) {
          this.$message({
            showClose: true,
            message: '该专业名称已存在！',
            type: 'warning',
          })
          return
        }
      }

      //axios
      //update到
      var json = {
        fristId: this.fristId,
        id: this.editObj.id,
        name: this.editObj.name,
      }
      console.log(json)
      axios
        .post('http://localhost:8090/major/updateByFristId', json)
        .then((res) => {
          console.log(res.data)
        })
        .catch((err) => console.log(err))

      Vue.set(this.queryMajorData, this.editIndex, this.editObj)
      this.editDialogVisible = false
    },
    queryMajor() {
      //条件查询
      //axios
      this.queryMajorData = []
      var queryjson = {
        id: this.majorInfo.id,
        name: this.majorInfo.name,
      }

      axios
        .post('http://localhost:8090/major/queryByConditions', queryjson)
        .then((res) => {
          var majors = res.data
          this.queryMajorData = majors
        })
        .catch((err) => err)
    },
  },
}
</script>

<style scoped>
.id {
  margin-left: 180px;
}
.queryMajorBt button {
  width: 100%;
}

.addMajor {
  width: 100%;
}
.queryMajor {
  margin-top: 10px;
  text-align: center;
  margin-top: 10px;
  border: 2px solid rgba(236, 231, 231, 0.5);
}
</style>
