<template>
  <div>
    <div v-for="item in list" :key="item.id">
      <img class="img" :src="item.img_url" alt>
      <div>
        <router-link :to="'/article/' + item.id">
          <h3>{{item.title}}</h3>
        </router-link>
        <div>
          <span>{{item.author}}</span>
          <span>{{item.podcast}}</span>
          <span>{{item.duration}}</span>
          <span>{{item.play_time}}</span>
        </div>
        <p>{{item.content}}</p>
      </div>
    </div>
    <!-- <router-view></router-view> -->
    <!-- 分页 -->
    <!-- <yd-pager :pages="pages" :currentPage="page"></yd-pager> -->
  </div>
</template>

<script>
import ydPager from "./ydPager";
export default {
  components: {
    ydPager
  },
  props: {
    list: Array,
    count: Number,
    page: Number
  },
  computed: {
    pages() {
      return Math.ceil(this.count / 10);
    }
  },
  filters: {
    sliceContent(value) {
      return value.slice(0, 75) + "……";
    }
  }
};
</script>

<style>
</style>
