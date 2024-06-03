<template>
  <section>
    <div class="container" v-if="mainPost">
      <div class="post__wrapper">
        <div class="title">
          <p>{{ mainPost.title }}</p>
        </div>
        <div class="img__block">
          <img :src="require(`@/assets/img/${mainPost.image}`)" alt="">
        </div>
        <div>
          <div class="description" v-for="row in descriptionRows">
              <p>{{row}}</p>
            <SmallPost :post="randomPost()"/>
          </div>
        </div>
      </div>
      <Post v-for="(post, idx) in posts" :key="idx" :post="post" :idx="idx" :postsCount="posts.length" />
    </div>
  </section>

</template>

<script>
import Posts from "@/components/Posts/Posts.vue";
import Post from "@/components/Posts/Post.vue";
import json from "@/portal_full.json";
import SmallPost from "@/components/Posts/SmallPost.vue";

export default {
  name: "Detail",
  data() {
    return {
      mainPost: null,
      posts: []
    };
  },
  components: {
    SmallPost,
    Post,
    Posts
  },
  mounted() {
    this.getPost();
    this.getNews();
    window.addEventListener("scroll", this.handleScroll);
  },
  computed: {
    descriptionRows() {
      if (this.mainPost && this.mainPost.description.length) {
        return this.mainPost.description.split('|||');
      }
    }
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  methods: {
    getPost(){
      const items = json[this.$route.params.type]

      this.mainPost = items.find(item => item.id === this.$route.params.id)
      console.log(this.mainPost.description.length);
    },
    handleScroll() {
      const bottomOfWindow = window.innerHeight + window.scrollY >= document.documentElement.offsetHeight;
      if (bottomOfWindow) {
        this.addMorePosts();
      }
    },
    addMorePosts() {
      this.posts.push(...this.posts.slice(0, this.posts.length));
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
    randomPost() {
      return this.posts[Math.floor((Math.random() * this.posts.length))]
    },
    getNews() {
      const ads = json.ads;
      for (const key in ads) {
        const category = ads[key];
        const titles = category.titles;
        const images = category.images;

        for (const key in titles) {
          this.posts.push({
            title: titles[key],
            image: images[Math.floor(Math.random() * images.length)]
          });
        }
      }

      this.posts = this.shuffle(this.posts);
    }
  }
};
</script>

<style lang="scss" scoped>
body {
  background-image: none!important;
}
.container {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 20px;

  .post__wrapper {
    font-size: 16px;
    width: 100%;
    grid-column: 1 / 3;
    grid-row: 1 / 5;

    .title {
      font-size: 36px;
      text-align: left;
    }
  }
}

@media all and (max-width: 960px) {
  .container {
    .post__wrapper {

      grid-column: 1 / 5;
      grid-row: 1 / 5;
    }
  }
}

.post__wrapper {
  color: #fff;
  width: 80%;

  .img__block img {
    width: 100%;
    height: 450px;
    object-fit: cover;
    border-radius: 10px;
  }
}
</style>
