<template>
  <div class="article-box">
    <div class="article">
      <div class="article-lf">
        <h3>{{Article.title}}</h3>
        <div>
          <span>{{Article.author}}</span>
          <span>{{Article.podcast}}</span>
          <span>{{Article.duration}}</span>
        </div>
        <div>
          <img style="height:385px" :src="Article.img_url" alt>
        </div>
        <audio style="width:580px" controls :src="Article.mp3_url"></audio>
        <div class="comment" :class="{'comment-h': flag}">{{Article.content}}</div>
        <div class="intro-hide"></div>
      </div>
      <div class="comment">
        <div class="kh" @click="flag = !flag">{{flag ? play : '收起'}}</div>
      </div>
      <div class="comment">
        <router-link class="sf" :to="'/article/'+ (id - 1)">上一篇</router-link>
        <router-link class="sr" :to="'/article/'+ (id + 1)">下一篇</router-link>
      </div>

      <yt-comment></yt-comment>
    </div>

    <yt-banner></yt-banner>
  </div>
</template>

<script>
import { getArticle, userComment } from "@/service/getData.js";
import ytBanner from "@/components/ytBanner";
import ytComment from "@/components/ytComment";
export default {
  data() {
    return {
      Article: {},
      flag: true,
      play: '展开',
      id: parseInt(this.$route.params.id)
    };
  },
  components: {
    ytBanner,
    ytComment
  },
  created() {
    getArticle(this.id).then(({ data }) => {
      if (data.res_code === 200) {
        this.Article = data.res;
      }
    });
  }
};
</script>

<style>
.article-box {
  width: 1010px;
  margin: 0 auto;
  display: flex;
}
.article-lf {
  width: 580px;
  position: relative;
}
.comment {
  overflow: hidden;
}
.comment-h {
  height: 300px;
}
.article {
  overflow: hidden;
}
.kh {
  background: #ff6600;
  width: 50px;
  text-align: center;
  border-radius: 30px;
  margin: 10px;
  float: right;
  cursor: pointer;
}
.article .sf {
  float: left;
}
.article .sr {
  float: right;
}
.intro-hide {
  width: 580px;
  height: 40px;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background-image: -webkit-gradient(
    linear,
    left top,
    left bottom,
    color-stop(0, rgba(255, 255, 255, 0)),
    color-stop(1, #fff)
  );
}
</style>
