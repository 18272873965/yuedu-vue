<template>
  <div>
    <router-link to="/login" v-if="!user">登录</router-link>
    <div v-else>
      <a href="javascript:;" @click.stop="show = !show">欢迎：{{user}}</a>
      <ul v-show="show">
        <li>
          <router-link to="/ytIndividual">个人主页</router-link>
        </li>
        <li>
          <router-link to="/">设置</router-link>
        </li>
        <li>
          <a href="javascript:;" @click="logout">退出</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import bus from "@/bus.js";
export default {
  data() {
    return {
      show: false
    };
  },
  props: {
    user: String
  },
  methods: {
    logout() {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      this.show = false;
      bus.$emit("logout");
    }
  }
};
</script>

<style>
</style>
