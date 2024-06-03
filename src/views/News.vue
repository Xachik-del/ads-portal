<template>
  <div class="home">
    <p class="container text-uppercase text-light">{{ $route.name }}</p>
    <Posts :posts="posts"/>
  </div>
</template>

<script>
import Posts from "@/components/Home/Posts.vue";

export default {
  name: "HomeView",
  data() {
    return {
      posts: Array.from({length: 40}, () => null)
    };
  },
  components: {
    Posts,
  },
};
</script>

<style scoped>
.home {
  background-color: #222228;

  p {
    padding-top: 25px;
    margin-bottom: 0;
    font-size: 25px;
  }
}

.main__container {
  background: transparent!important;
}
</style>
