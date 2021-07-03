<template>
  <div class="stu">
    <div class="border">
      <div class="picture">
        <img src="@/assets/student.jpg" alt="" />
      </div>
      <div class="rowone">
        <div class="name">
          <p>姓名：{{ this.stuInfo.name }}</p>
        </div>
        <div class="stuclass">
          <p>班级：{{ this.stuInfo.stuClass }}</p>
        </div>
      </div>
      <div class="rowtuo">
        <div class="stuno">
          <p>学号：{{ this.stuInfo.stuId }}</p>
        </div>
        <div class="major">
          <p>专业：{{ this.stuInfo.major }}</p>
        </div>
      </div>
      <div class="rowthree">
        <div class="date">
          <p>入学时间：{{ this.stuInfo.date }}</p>
        </div>
        <div class="idcard">
          <p>身份证号码：{{ this.stuInfo.idCard }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'StuInfo',
  components: {},
  data() {
    return {
      username: '',
      stuInfo: [],
    }
  },
  created() {
    this.username = sessionStorage.getItem('stuUsername')
    var json = {
      stuId: this.username,
    }
    console.log(this.username)
    axios
      .post('http://localhost:8090/stu/selectStu', json)
      .then((res) => {
        this.stuInfo = res.data
        console.log(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  },
}
</script>

<style scoped>
.rowone {
  position: relative;
}
.rowtuo {
  position: relative;
}
.rowthree {
  position: relative;
}
.name {
  position: absolute;
  left: 430px;
  top: 240px;
}
.stuclass {
  position: absolute;
  left: 630px;
  top: 240px;
}
.stuno {
  position: absolute;
  left: 430px;
  top: 300px;
}
.major {
  position: absolute;
  left: 630px;
  top: 300px;
}
.date {
  position: absolute;
  left: 430px;
  top: 360px;
}
.idcard {
  position: absolute;
  left: 630px;
  top: 360px;
}

.picture {
  position: absolute;
  left: 800px;
  top: 100px;
}
.picture img {
  border-radius: 100px;
  width: 160px;
  height: 160px;
}
</style>
