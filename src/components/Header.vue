<template>
  <header>
    <div v-if="isMainPage">
      <div class="d-flex justify-content-between mb-5 p-5 position-relative">
        <img class="header-icon" :src="require('@/assets/icons/dots-9.svg')" width="30" alt="Dots"
             @click="showChooseBgModal">
        <img class="header-icon" :src="require('@/assets/icons/weather-forecast.svg')" width="30" alt="Weather">

        <div class="card" v-if="showModal">
          <div class="card-title">
            <span>Dostosuj tło</span>
            <span @click="showModal = false">X</span>
          </div>
          <div class="bg-images">
            <div v-for="layoutImage in layoutImages" :key="layoutImage.name"
                 @click="changeLayoutBackground(layoutImage)">
              <img class="image" :src="layoutImage.src" width="25" alt="">
            </div>
            <div class="empty-image" @click="changeLayoutBackground(null)">

            </div>
          </div>
        </div>
      </div>
      <div class="d-flex align-items-center justify-content-center mb-5 logo-center">
        <img :src="require('@/assets/img/logo.png')" alt="">
        <span>DAZZLE</span>
      </div>
      <div class="d-flex justify-content-center mb-5">
        <div class="search">
          <img :src="require('@/assets/icons/search.svg')" width="25" alt="Dots">
          <input type="text" name="search" class="search_input" placeholder="Wyszukaj w internecie...">
        </div>
      </div>
      <div class="container weather">
        <span>Warsaw <img :src="require('@/assets/icons/weather.svg')" width="45" alt=""> 25.7°C</span>
      </div>
    </div>

    <div v-else class="wrapper">
      <div class="header-wrapper mb-2">
        <div class="d-flex align-items-center justify-content-between logo" @click="$router.push('/')">
          <img :src="require('@/assets/img/logo.png')" width="40px" alt="">
          <span class="text-uppercase" style="margin-left: 5px">DAZZLE </span>
          <span class="text-uppercase text-light">WIADOMOŚCI</span>
        </div>
        <div class="search">
          <img :src="require('@/assets/icons/search.svg')" width="25" alt="Dots">
          <input type="text" name="search" class="search_input" placeholder="Wyszukaj w internecie...">
        </div>
        <div></div>
      </div>
      <div class="navigation mt-5">
        <router-link to="/sport">Sport</router-link>
        <router-link to="/news">Wydarzenia</router-link>
        <router-link to="/weather">Pogoda</router-link>
        <router-link to="/business">Show business</router-link>
      </div>
    </div>


  </header>
</template>

<script>

export default {
  name: "Header",
  data() {
    return {
      showModal: false,
      array: {
        sport: [
          { id: null, name: "Test", image: null, description: null, link: null, }
        ],
        ads: [
          { name: "Test", image: null, description: null, link: null, }
        ]
      },
      layoutImages: [
        {name: "background_0", src: require('@/assets/img/layout/background_0.png'), default: true},
        {name: "background_1", src: require('@/assets/img/layout/background_1.png'), default: false},
        {name: "background_2", src: require('@/assets/img/layout/background_2.png'), default: false},
        {name: "background_3", src: require('@/assets/img/layout/background_3.png'), default: false},
        {name: "background_4", src: require('@/assets/img/layout/background_4.png'), default: false},
      ]
    }
  },
  computed: {
    isMainPage() {
      return this.$route.name === 'home'
    }
  },
  created() {
    this.changeLayoutBackground(this.layoutImages[0])
  },
  methods: {
    showChooseBgModal() {
      this.showModal = true;
    },
    changeLayoutBackground(image) {
      const el = document.querySelector("body");
      window.localStorage.setItem('backgroundImage', image ? `url(/layout/${image.name}.png)` : '')

      el.style.backgroundImage =  window.localStorage.getItem('backgroundImage');

      el.style.transitionProperty = 'background-image';
      el.style.transitionDuration = "2s";
    }
  }
}
</script>

<style lang="scss" scoped>

.card {
  width: 200px;
  height: 300px;
  padding: 5px;
  background-color: #1D1E1F;

  position: absolute;
  top: 100px;

  .card-title {
    color: white;
    display: flex;
    justify-content: space-between;
    padding: 0 10px;
    font-size: 15px;

    span:last-child {
      cursor: pointer;
    }
  }

  .bg-images {
    height: 90%;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 5px;

    img {
      cursor: pointer;
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 10px;
    }

    .empty-image {
      cursor: pointer;
      background-color: #2a2c2c;
      border-radius: 10px;
    }
  }


  background-position: center;
  background-size: cover;


}

.wrapper {
  padding: 2rem 20px 20px;
  background-color: #1D1E1F;

  .navigation a:hover {
    transition-property: text-decoration;
    text-decoration: underline;

    transition-duration: 1s;
  }
}

.header-wrapper {
  .logo {
    cursor: pointer;
  }

  display: grid;
  grid-template-columns: 1fr 3fr 1fr;

  span {
    font-size: 20px;
    letter-spacing: 2px;
  }

  .search {
    width: 75%;
    padding: 0;
    background: #4A4A4A;
    color: #fff;
  }

  .search_input {
    background: #4A4A4A;
  }

  .search_input:focus {
    background: #4A4A4A;
  }
}


.header-icon {
  cursor: pointer;
}

.logo-center {
  margin-top: 5%;
  width: 100%;
  gap: 10px;
  color: #fff;
  font-size: 3rem;
  font-weight: 200;
  letter-spacing: 0.4rem;
  margin-bottom: 40px;
}

.search {
  padding: 15px;
  margin: 0 auto;
  width: 50%;
  align-items: center;
  justify-content: space-around;
  background: #1D1E1F;
  border-radius: 3.2rem;
  gap: 1rem;
}

.search {
  display: flex;
}

.search_input {
  width: 80%;
  border: unset;
  outline: unset;
  background: #1D1E1F;
  color: #fff;
}

.search_input:focus {
  background: #1D1E1F;
  color: #fff;
}

.weather {
  display: flex;
  height: 55%;
  font-size: 1rem;
  align-self: end;
  color: #fff;
  justify-content: flex-end;
  margin-bottom: 20px;

  img {
    width: 30px;
  }
}

.navigation {
  display: flex;
  gap: 20px;
  justify-content: center;

  a {
    color: #fff;
    text-decoration: none;
  }
}
</style>