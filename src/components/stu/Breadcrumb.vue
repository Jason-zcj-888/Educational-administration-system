<template>
  <div class="breadcrumb">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/student' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item v-for="(list, index) in titles" :key="index">{{
        list
      }}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
export default {
  name: 'About',
  components: {},
  props: {
    titles: Array,
  },
  data() {
    return {}
  },
}
</script>

<style scoped>
.el-icon-arrow-right {
  font-size: 20px;
}
</style>
