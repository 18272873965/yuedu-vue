<template>
  <div>
    <div>
      <h4>评论区:</h4>
      <textarea cols="40" rows="3" v-model="comment"></textarea>
      <button @click="enter()">发表</button>
    </div>

    <div>
      <div>最新评论 ( {{ getComment.length}} )</div>
      <div v-if=" ! getComment.length">暂无评论</div>
      <div v-else>
        <div v-for="(item, index) in getComment" :key="index">
          <div>
            <span>{{item.nikiname}}</span>
            <span>{{item.reply_time}}</span>
            <button @click="dele(item.id,index)" v-show="item.isDel">删除</button>
          </div>
          <div>{{item.content}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { userComment, getComments, delComment } from "@/service/getData.js";
export default {
  data() {
    return {
      comment: "",
      getComment: []
    };
  },
  created() {
    const id = this.$route.params.id;
    getComments(id).then(({ data }) => {
      //   console.log(data)
      if (data.res_code === 200) {
        this.getComment = data.res;
      }
    });
  },
  methods: {
    dele(id, index) {
      delComment(id).then(({ data }) => {
        if (data.res_code === 200) {
          this.getComment.splice(index, 1);
        }
      });
    },
    enter() {
      const article_id = this.$route.params.id;
      if (this.comment !== "") {
        userComment({ article_id, content: this.comment }).then(({ data }) => {
          if (data.res_code === 200) {
            this.getComment.push(data.res);
          }
        });
        this.comment = "";
      }
    }
  }
};
</script>

<style>
</style>
