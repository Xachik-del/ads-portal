<template>
  <div class="home">
    <p class="container text-uppercase text-light">{{ $route.name }}</p>
    <Posts ref="posts" :posts="items" />
  </div>
</template>

<script>
import Posts from "@/components/Posts/Posts.vue";
import json from "@/portal_full.json";

export default {
  name: "News",
  data() {
    return {
      items: [],
    };
  },
  components: {
    Posts,
  },
  mounted() {
    this.getAds();
  },
  methods: {
    getAds() {
      this.items = json[this.$route.name];
    },
  },
  watch: {
    '$route'(to, from) {
      this.getAds();
    }
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
  background: transparent !important;
}
</style>
