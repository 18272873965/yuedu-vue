<template>
  <div class="nav">
    <div class="nav-box">
      <router-link
        class="nav-list"
        v-for="item in types"
        :to="'/channel/' + item.id"
        :key="item.id"
      >{{item.type}}</router-link>
    </div>

    <yt-setting class="nav-setting" :user="user"></yt-setting>
  </div>
</template>

<script>
import { getTypes } from "@/service/getData";
import ytSetting from '@/components/ytSetting.vue'
import bus from '@/bus.js'
export default {
  data() {
    return {
      types: [],
      user: localStorage.getItem('user') ? JSON.parse( localStorage.getItem('user')) : ''
    };
  },
  components:{
    ytSetting
  },
  created() {
    getTypes().then(({ data }) => {
      if (data.res_code === 200) {
        this.types = data.res;
      }
    });
    bus.$on('send:user', (user) => {
      this.user = user
    });
    bus.$on('logout', () => {
      this.user = ''
    })
  }
};
</script>

<style>
.nav {
  width: 1100px;
  height: 50px;
  margin: 0 auto;
  line-height: 50px;
  /* overflow: hidden; */
}
.nav-box{ 
  width: 400px;
  float: left;
}
.nav-setting{
  /* width: 50px; */
  float: right;
}
.nav-list {
  margin: 15px;
  font-size: 18px;
}
</style>
