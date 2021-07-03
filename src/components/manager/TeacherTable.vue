<template>
  <div>
    <div class="head">
      <div>
        <el-button type="primary" class="addTea" @click="addTea()"
          >录入教师信息</el-button
        >
        <el-dialog
          title="添加教师信息"
          :visible.sync="addDialogVisible"
          width="30%"
          :before-close="addHandleClose"
        >
          <el-form ref="form" :model="addObj" label-width="70px">
            <el-form-item label="职工号">
              <el-input v-model="addObj.teaId"></el-input>
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
            <el-form-item label="入职日期">
              <el-date-picker
                v-model="addObj.date"
                type="date"
                format="yyyy 年 MM 月 dd 日"
                value-format="yyyy-MM-dd"
                placeholder="请选择入职日期"
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
      <div class="queryTea">
        <div>
          <el-row :gutter="20">
            <el-col :span="3"
              ><div class="grid-content bg-purple">
                <el-input
                  v-model="teaInfo.teaId"
                  placeholder="请输入教职工号"
                ></el-input></div
            ></el-col>
            <el-col :span="3"
              ><div class="grid-content bg-purple">
                <el-input
                  v-model="teaInfo.name"
                  placeholder="请输入姓名"
                ></el-input></div
            ></el-col>
            <el-col :span="3"
              ><div class="grid-content bg-purple">
                <el-select v-model="teaInfo.gender" placeholder="请选择性别">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                    clearable
                  >
                  </el-option>
                </el-select></div
            ></el-col>
            <el-col :span="5">
              <div class="grid-content bg-purple">
                <el-date-picker
                  v-model="teaInfo.date"
                  type="date"
                  format="yyyy 年 MM 月 dd 日"
                  value-format="yyyy-MM-dd"
                  placeholder="请选择入职日期"
                >
                </el-date-picker>
              </div>
            </el-col>
            <el-col :span="4"
              ><div class="grid-content bg-purple">
                <el-input
                  v-model="teaInfo.idCard"
                  placeholder="请输入身份证号"
                ></el-input></div
            ></el-col>
            <el-col :span="6">
              <div>
                <el-button type="primary" class="queryTeaBt" @click="queryTea()"
                  >查询教师信息</el-button
                >
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
    </div>
    <div class="body">
      <template>
        <el-table
          style="width: 100%"
          :data="
            queryTeaData.slice(
              (currentPage - 1) * pagesize,
              currentPage * pagesize
            )
          "
        >
          <el-table-column prop="id" label="序号" type="index" width="80">
          </el-table-column>
          <el-table-column prop="teaId" label="职工号"> </el-table-column>
          <el-table-column prop="name" label="姓名"> </el-table-column>
          <el-table-column prop="gender" label="性别"> </el-table-column>
          <el-table-column prop="date" label="入职日期"> </el-table-column>
          <el-table-column prop="idCard" label="身份证号" width="180">
          </el-table-column>
          <el-table-column prop="" label="操作">
            <template slot-scope="scope">
              <el-button
                type="primary"
                icon="el-icon-edit"
                @click="teaEdit(scope.$index, scope.row)"
                circle
              ></el-button>
              <el-button
                type="danger"
                icon="el-icon-delete"
                @click="delTea(scope.$index, scope.row)"
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
        :total="this.queryTeaData.length"
      >
      </el-pagination>
    </div>
    <!-- 编辑教师信息-->
    <el-dialog
      title="编辑教师信息"
      :visible.sync="editDialogVisible"
      width="30%"
      :before-close="editHandleClose"
    >
      <el-form ref="form" :model="editObj" label-width="80px">
        <el-form-item label="职工号">
          <el-input v-model="editObj.teaId"></el-input>
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
        <el-form-item label="入职日期">
          <el-date-picker
            v-model="editObj.date"
            type="date"
            format="yyyy 年 MM 月 dd 日"
            value-format="yyyy-MM-dd"
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
      teaInfo: {
        teaId: '',
        name: '',
        gender: '',
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
      queryTeaData: [],
      addTeaData: [],
      editObj: {
        id: '',
        teaId: '',
        name: '',
        gender: '',
        date: '',
        idCard: '',
      },
      addObj: {
        teaId: '',
        name: '',
        gender: '',
        date: '',
        idCard: '',
      },
      addDialogVisible: false,
      editIndex: 0,
      editDialogVisible: false,
      deleteById: '',
      currentPage: 1,
      pagesize: 5,
      editById: '',
    }
  },
  created() {
    axios
      .get('http://localhost:8090/tea/queryAll')
      .then((res) => {
        this.queryTeaData = res.data
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

    addTea() {
      this.addDialogVisible = true
      this.addObj = {
        teaId: '',
        name: '',
        gender: '',
        date: '',
        idCard: '',
      }
      axios
        .get('http://localhost:8090/tea/queryAll')
        .then((res) => {
          var teas = res.data
          this.addTeaData = teas
          console.log(this.addTeaData)
        })
        .catch((err) => {
          console.log(err)
        })
    },
    delTea(index, row) {
      this.$confirm('确认删除？')
        .then((_) => {
          this.queryTeaData.splice(index, 1)

          this.deleteById = row.teaId
          var json = {
            teaId: this.deleteById,
          }
          axios
            .post('http://localhost:8090/tea/deleteById', json)
            .then((res) => {
              console.log(res.data)
            })
            .catch((err) => {
              console.log(err)
            })
        })
        .catch((_) => {})
    },
    teaEdit(index, row) {
      this.editDialogVisible = true
      this.editById = row.teaId
      console.log(row.teaId)
      this.editObj = {
        id: row.id,
        teaId: row.teaId,
        name: row.name,
        gender: row.gender,
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
      if (!this.addObj.teaId) {
        this.$message({
          showClose: true,
          message: '请输入职工号！',
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
      if (!/^\d{5}$/.test(this.addObj.teaId)) {
        this.$message({
          showClose: true,
          message: '请输入正确的职工号！',
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

      for (let index = 0; index < this.addTeaData.length; index++) {
        if (this.addObj.teaId == this.addTeaData[index].teaId) {
          this.$message({
            showClose: true,
            message: '职工号已存在！',
            type: 'warning',
          })
          return
        }
        if (this.addObj.idCard == this.addTeaData[index].idCard) {
          this.$message({
            showClose: true,
            message: '身份证号已存在！',
            type: 'warning',
          })
          return
        }
      }
      //使用axios把数据增添到数据库
      var json = {
        teaId: this.addObj.teaId,
        name: this.addObj.name,
        gender: this.addObj.gender,
        date: this.addObj.date,
        idCard: this.addObj.idCard,
      }
      axios
        .post('http://localhost:8090/tea/insert', json)
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
        teaId: '',
        name: '',
        gender: '',
        date: '',
        idCard: '',
      }
    },
    editConfirm() {
      if (!this.editObj.teaId) {
        this.$message({
          showClose: true,
          message: '请输入职工号！',
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
      if (!/^\d{5}$/.test(this.editObj.teaId)) {
        this.$message({
          showClose: true,
          message: '请输入正确的职工号！',
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
      for (var index = 0; index < this.queryTeaData.length; index++) {
        if (index == this.editIndex) {
          continue
        }
        if (this.editObj.teaId == this.queryTeaData[index].teaId) {
          this.$message({
            showClose: true,
            message: '职工号已存在！',
            type: 'warning',
          })
          return
        }
        if (this.editObj.idCard == this.queryTeaData[index].idCard) {
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
        oldteaId: this.editById,
        newteaId: this.editObj.teaId,
        name: this.editObj.name,
        gender: this.editObj.gender,
        date: this.editObj.date,
        idCard: this.editObj.idCard,
      }
      console.log(json)
      axios
        .post('http://localhost:8090/tea/updateById', json)
        .then((res) => {
          console.log(res.data)
        })
        .catch((err) => console.log(err))

      Vue.set(this.queryTeaData, this.editIndex, this.editObj)
      this.editDialogVisible = false
    },
    queryTea() {
      //条件查询
      //axios
      this.queryTeaData = []
      var queryjson = {
        teaId: this.teaInfo.teaId,
        name: this.teaInfo.name,
        gender: this.teaInfo.gender,
        date: this.teaInfo.date,
        idCard: this.teaInfo.idCard,
      }
      axios
        .post('http://localhost:8090/tea/queryByConditions', queryjson)
        .then((res) => {
          var teas = res.data
          for (let index = 0; index < teas.length; index++) {
            this.queryTeaData.push(teas[index])
          }
        })
        .catch((err) => err)
    },
  },
}
</script>

<style scoped>
.queryTeaBt {
  width: 100%;
}
.addTea {
  width: 100%;
}
.queryTea {
  margin-top: 10px;
  border: 2px solid rgba(236, 231, 231, 0.5);
}
</style>
