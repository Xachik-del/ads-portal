<template>
  <div class="home">
    <Posts :posts="items" />
  </div>
</template>

<script>
import Posts from "@/components/Posts/Posts.vue";
import json from "@/portal_full.json";

export default {
  name: "HomeView",
  data() {
    return {
      items: []
    };
  },
  components: {
    Posts
  },
  mounted() {
    this.getNews();
    if (this.$route.name === 'home') {
      window.addEventListener('scroll', this.handleScroll);
    }
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll);
  },
  methods: {
    handleScroll() {
      const bottomOfWindow = window.innerHeight + window.scrollY >= document.documentElement.offsetHeight;
      if (bottomOfWindow) {
        this.addMorePosts();
      }
    },
    addMorePosts() {
      this.items.push(...this.items.slice(0, this.items.length));
    },
    shuffle(array) {
      let currentIndex = array.length;

      // While there remain elements to shuffle...
      while (currentIndex !== 0) {

        // Pick a remaining element...
        let randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
          array[randomIndex], array[currentIndex]];
      }

      return array;
    },
    getNews() {
      const ads = json.ads;
      for (const key in ads) {
        const category = ads[key];
        const titles = category.titles;
        const images = category.images;

        for (const key in titles) {
          this.items.push({
            title: titles[key],
            image: images[Math.floor(Math.random() * images.length)]
          });
        }
      }

      this.items = this.shuffle(this.items);
    }
  }
};
</script>

<style scoped>

</style>
