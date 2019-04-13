<template>
  <div class="list-box">
    <yt-list
      class="lf"
      :list="channelList.articles"
      :count="channelList.count"
      :page="channelList.page"
    ></yt-list>
    <yt-top10 class="lr" :top="channelListTop10.articles" :topTyp="channelListTop10.type"></yt-top10>
  </div>
</template>

<script>
import ytList from "@/components/ytList";
import ytTop10 from "@/components/ytTop10";
import { getListData, getList } from "@/service/getData";
import bus from "@/bus";
export default {
  components: {
    ytList,
    ytTop10
  },
  data() {
    return {
      channelList: {},
      channelListTop10: {}
    };
  },
  methods: {
    CurrentPage(id,page) {
      console.log(id,page)
      // 根据page请求数据
      getList(id, page).then(res => {
        this.channelList = res.data.res;
      });
    }
  },
  created() {
    const _this = this;
    const id = this.$route.params.id;

    getListData(id).then(([getList, getListTop10]) => {
      this.channelList = getList.data.res;
      this.channelListTop10 = getListTop10.data.res;
    });
    bus.$off("currentPageChange");
    bus.$on("currentPageChange", function(page) {
      _this.CurrentPage(1,10);
    });
  }
};
</script>

<style>
.list-box {
  width: 1100px;
  margin: 0 auto;
  display: flex;
}
.lf {
  flex-basis: 100px;
  flex-grow: 1;
}
.lr {
  width: 360px;
}
</style>
