<template>
  <div class="banner-box">
    <div class="banner-top">
      <span class="banner-left">其他相关节目</span>
      <div class="banner-right">
        <span @click="bannerLf" :class="{disable: index === 0}">
          <i class="iconfont">&#xe622;</i>
        </span>
        <span @click="bannerLr" :class="{disable: index === 4}">
          <i class="iconfont">&#xe621;</i>
        </span>
      </div>
    </div>
    <div class="banner-bottom" :style="{transform: 'translate3d(' + (-index * 330) + 'px,0,0)'}">
      <div class="banner-list" v-for="item in banner" :key="item.id">
        <router-link :to="'/article/' + item.id">
          <img :src="item.img_url" alt>
        </router-link>
        <span>{{item.title}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { getBanner } from "@/service/getData.js";
import "@/assets/font/iconfont.css";
export default {
  data() {
    return {
      banner: [],
      index: 0
    };
  },
  methods: {
    bannerLf() {
      if (this.index > 0) {
        this.index--;
      }
    },
    bannerLr() {
      if (this.index < 4) {
        this.index++;
      }
    }
  },
  created() {
    getBanner().then(({ data }) => {
      this.banner = data.res;
    });
  }
};
</script>

<style>
.banner-box {
  width: 300px;
  height: 350px;
  box-sizing: border-box;
  margin: 60px;
  overflow: hidden;
}
.banner-top {
  width: 300px;
  height: 21px;
  border-left: 3px solid #f30;
  padding-left: 10px;
  box-sizing: border-box;
}
.banner-left {
  font-weight: bold;
  float: left;
}
.banner-right {
  float: right;
  cursor: pointer;
}
.banner-bottom {
  width: 1650px;
  height: 276px;
  display: flex;
  flex-wrap: wrap;
  transition: all 0.3s;
}
.banner-bottom img {
  width: 135px;
  height: 84px;
}
.banner-list {
  width: 135px;
  height: 138px;
  margin-right: 30px;
  padding-top: 30px;
  box-sizing: border-box;
}
.banner-list span {
  display: block;
  width: 135px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.banner-right i {
  font-size: 18px;
}
.disable {
  cursor: not-allowed;
  color: gray;
}
</style>
