<template>
  <div class="main__container container" id="content">
    <div class="main__header" v-if="isMainPage">
      <router-link to="sport">Sport</router-link>
      <router-link to="events">Wydarzenia</router-link>
      <router-link to="weather">Pogoda</router-link>
      <router-link to="health">Zdrowie</router-link>
    </div>
    <div class="posts__container">
      <div
        class="post"
        v-for="(post, idx) in posts"
        :key="idx"
        :style="getStyles(idx)"
      >
        <Post
          :big="getStyles(idx).length"
          :post="post"
          :idx="idx"
          :postsCount="posts.length"
        />
      </div>
    </div>
  </div>
</template>
<script>
import Post from "@/components/Home/Post.vue";
import json from "@/portal_full.json";

export default {
  data() {
    return {
      count: 0,
      items: []
    };
  },
  props: {
    posts: []
  },
  components: {
    Post
  },
  computed: {
    isMainPage() {
      return this.$route.name === "home";
    }
  },
  methods: {
    getStyles(index) {
      if (this.isMainPage) {
        if (index % 9 !== 0) {
          return "";
        }

        return `flex: 0 0 50%`;
      }
      return index === 6 ? `flex: 0 0 50%` : '';
    }
  }
};
</script>

<style scoped>
.main__container {
  //background: transparent;
  padding: 15px 10px;
  background: #1d1e1f;
  border-radius: 20px 20px 0 0;
}

.main__header {
  display: flex;
  justify-content: flex-start;
  background: #333;
  border-radius: 10px;
  padding: 14px 24px;
  margin-bottom: 15px;
}

.main__header a:hover {
  text-decoration: underline;
  transition: 1s;
}

.grid-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr) );
  gap: 1rem;
}

.posts__container {

  //justify-content: center;
  //gap: 1rem;
  display: flex;
  flex-flow: wrap;

  .post {
    flex: 0 0 25%;
    padding: 5px;
  }
}

a {
  color: #fff;
  cursor: pointer;
  text-decoration: none;
  margin-right: 20px;
}

</style>