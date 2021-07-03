<template>
  <div class="tea">
    <div class="picture">
      <img src="@/assets/teacher.jpg" alt="" />
    </div>
    <div>
      <span></span>
      <div class="name">
        <p>姓名：{{ this.teaInfo.name }}</p>
      </div>
      <div class="name">
        <p>教职工号：{{ this.teaInfo.teaId }}</p>
      </div>
    </div>
    <div>
      <div class="name">
        <p>性别：{{ this.teaInfo.gender }}</p>
      </div>
      <div class="name">
        <p>入职日期：{{ this.teaInfo.date }}</p>
      </div>
    </div>
    <div>
      <div class="name">
        <p>身份证号码：{{ this.teaInfo.idCard }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'TeaInfo',
  components: {},
  data() {
    return {
      username: '',
      teaInfo: '',
    }
  },
  created() {
    this.username = sessionStorage.getItem('teaUsername')
    var json = {
      teaId: this.username,
    }
    console.log(this.username)
    axios
      .post('http://localhost:8090/tea/selectTea', json)
      .then((res) => {
        console.log(res.data)
        this.teaInfo = res.data
      })
      .catch((err) => {
        console.log(err)
      })
  },
}
</script>

<style scoped>
.picture {
  margin-top: 30px;
}
.picture img {
  border-radius: 100px;
  width: 160px;
  height: 160px;
}
</style>
