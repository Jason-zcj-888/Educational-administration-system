<template>
  <div class="manager-home">
    <nav-menu></nav-menu>
    <!-- <breadcrumb></breadcrumb> -->
  </div>
</template>

<script>
import NavMenu from '@/components/manager/NavMenu'
import Breadcrumb from '@/components/manager/Breadcrumb'
export default {
  name: 'Home',
  components: {
    NavMenu,
    Breadcrumb,
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
