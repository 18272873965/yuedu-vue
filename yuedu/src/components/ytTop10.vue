<template>
  <div>
    <div>
      <!-- <img src="./img/download.jpg" alt> -->
      <h3>|&nbsp;{{topTyp}}频道&nbsp;TOP10</h3>
      <ul>
        <li v-for="(item,index) in top" :key="item.id">
          <router-link :to="'/article/' + item.id">
              <p>{{index +1}}.{{item.title}}</p>
          </router-link>
          <div>
            <span>&nbsp;&nbsp;&nbsp;文：{{item.author}}</span>
            <span>&nbsp;&nbsp;&nbsp;主播：{{item.podcast}}</span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    top: Array,
    topTyp: {
      topTyp: String,
      default: "悦读"
    }
  }
};
</script>

<style>
</style>
