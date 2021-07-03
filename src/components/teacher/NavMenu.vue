<template>
  <el-container>
    <el-aside width="250px"
      ><div class="manager-nav">
        <el-row class="tac">
          <el-menu
            default-active=""
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
          >
            <template>
              <p></p>
              <span class="noclick">教师界面</span>
              <p></p>
            </template>
            <router-link to="/teacher/teaInfo" style="text-decoration:none">
              <el-menu-item index="0" @click="handleOpen">
                <i class="el-icon-user"></i>
                <span slot="title" class="first-nav" :underline="false">{{
                  this.NavList[0]
                }}</span>
              </el-menu-item>
            </router-link>
            <router-link to="/teacher/courseTable" style="text-decoration:none">
              <el-menu-item index="1" @click="handleOpen">
                <i class="el-icon-menu"></i>
                <span slot="title" class="first-nav">{{
                  this.NavList[1]
                }}</span>
              </el-menu-item>
            </router-link>
            <router-link to="/teacher/gradeTable" style="text-decoration:none">
              <el-menu-item index="2" @click="handleOpen">
                <i class="el-icon-edit"></i>
                <span slot="title" class="first-nav">{{
                  this.NavList[2]
                }}</span>
              </el-menu-item>
            </router-link>
            <router-link
              to="/teacher/teaUpdatePwd"
              style="text-decoration:none"
            >
              <el-menu-item index="3" @click="handleOpen">
                <i class="el-icon-lock"></i>
                <span slot="title" class="first-nav">
                  {{ this.NavList[3] }}
                </span>
              </el-menu-item>
            </router-link>
            <div class="line"></div>
          </el-menu>
        </el-row></div
    ></el-aside>
    <el-container>
      <el-header height="50px">
        <div class="header">
          <div class="quitSys" style="margin:13px 20px">
            <router-link to="/" style="text-decoration:none;">
              <i class="el-icon-switch-button"></i>
              退出系统
            </router-link>
          </div>
          <div style="margin:17px 20px">
            <breadcrumb :titles="this.titles"></breadcrumb>
          </div>
        </div>
      </el-header>
      <el-main> <router-view></router-view></el-main>
    </el-container>
  </el-container>
</template>

<script>
import Breadcrumb from '@/components/teacher/Breadcrumb'

export default {
  name: 'NavMenu',
  components: {
    Breadcrumb,
  },
  data() {
    return {
      NavList: ['个人信息', '查看课表', '成绩录入', '密码修改'],
      titles: [],
    }
  },
  computed: {},
  methods: {
    handleOpen(key, keyPath) {
      this.titles = []
      this.titles.push(this.NavList[key.index])
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath)
    },
  },
}
</script>

<style>
.first-nav {
  padding-right: 80px;
}
.noclick {
  font-size: large;
  text-align: center;
  margin-top: 10px;
}
.line {
  width: 56px;
  height: 320px;
}

.manager-nav {
  position: relative;
}
.quitSys {
  position: absolute;
  right: 40px;
  cursor: pointer;
}
</style>
