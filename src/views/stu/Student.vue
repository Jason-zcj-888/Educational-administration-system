<template>
  <div class="manager-home">
    <nav-menu></nav-menu>
  </div>
</template>

<script>
import NavMenu from '@/components/stu/NavMenu'
export default {
  name: 'Student',
  components: {
    NavMenu,
  },
  data() {
    return {}
  },
  methods: {},
}
</script>

<style scoped>
.manager-home-p {
  font-size: 40px;
}
.home-nav-all {
  left: 50px;
}
</style>
