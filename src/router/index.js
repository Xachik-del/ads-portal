import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";
import News from "../views/News.vue";
import Detail from "@/views/Detail.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/sport",
    name: "sport",
    component:() => import(/* webpackChunkName: "about" */ "../views/News.vue"),
  },
  {
    path: "/news",
    name: "news",
    component:() => import(/* webpackChunkName: "about" */ "../views/News.vue"),
  },
  {
    path: "/weather",
    name: "weather",
    component:() => import(/* webpackChunkName: "about" */ "../views/News.vue"),
  },
  {
    path: "/business",
    name: "business",
    component:() => import(/* webpackChunkName: "about" */ "../views/News.vue"),
  },
  {
    path: "/:type/:id",
    name: "detail",
    component: Detail,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
