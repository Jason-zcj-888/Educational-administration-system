<template>
  <el-container>
    <el-aside width="250px"
      ><div class="manager-nav">
        <el-row class="tac">
          <el-menu
            default-active="0"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
          >
            <template>
              <p></p>
              <span class="noclick">后台界面</span>
              <p></p>
            </template>
            <el-submenu index="0" @click="handleOpen">
              <template slot="title">
                <i class="el-icon-setting"></i>
                <span class="first-nav">{{ this.NavList[0] }}</span>
              </template>
              <el-menu-item-group>
                <router-link to="/manager/teaMgt" style="text-decoration:none">
                  <el-menu-item index="1" @click="handleOpen">{{
                    this.NavList[1]
                  }}</el-menu-item>
                </router-link>
                <router-link to="/manager/stuMgt" style="text-decoration:none">
                  <el-menu-item index="2" @click="handleOpen">{{
                    this.NavList[2]
                  }}</el-menu-item>
                </router-link>
              </el-menu-item-group>
            </el-submenu>
            <router-link to="/manager/courseMgt" style="text-decoration:none">
              <el-menu-item index="3" @click="handleOpen">
                <i class="el-icon-menu"></i>
                <span slot="title" class="first-nav">{{
                  this.NavList[3]
                }}</span>
              </el-menu-item>
            </router-link>
            <router-link to="/manager/majorMgt" style="text-decoration:none">
              <el-menu-item index="4" @click="handleOpen">
                <i class="el-icon-s-management"></i>
                <span slot="title" class="first-nav">{{
                  this.NavList[4]
                }}</span>
              </el-menu-item>
            </router-link>
            <router-link
              to="/manager/mgrUpdatePwd"
              style="text-decoration:none"
            >
              <el-menu-item index="5" @click="handleOpen">
                <i class="el-icon-lock"></i>
                <span slot="title" class="first-nav">{{
                  this.NavList[5]
                }}</span>
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
import Breadcrumb from '@/components/manager/Breadcrumb'

export default {
  name: 'NavMenu',
  components: {
    Breadcrumb,
  },
  data() {
    return {
      NavList: [
        '用户管理',
        '教师管理',
        '学生管理',
        '课程管理',
        '专业管理',
        '密码修改',
      ],
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
.header {
  height: 50px;
  border: solid 2px rgb(245, 240, 240);
  border-radius: 10px;
}
</style>
