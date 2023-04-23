import { createRouter, createWebHistory } from "vue-router";
import store from '@/store';
import HomeView from "../views/HomeView.vue";
import GuideView from "../views/GuideView.vue";
import GameView from "../views/GameView.vue";
import ProfileView from "../views/ProfileView.vue";
import HistoricView from "../views/HistoricView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView
  },
  {
    path: "/guide",
    name: "guide",
    component: GuideView
  },
  {
    path: "/game",
    name: "game",
    component: GameView,
    beforeEnter: (to, from, next) => {
      if(store.getters.logedin) {
        next();
      } else {
        // next();
        next(false);
        router.push({name: "home"});
      }
    }
  },
  {
    path: "/historic",
    name: "historic",
    component: HistoricView,
    beforeEnter: (to, from, next) => {
      if(store.getters.logedin && store.getters.userData.premium) {
        next();
      } else {
        // next();
        next(false);
        router.push({name: "home"});
      }
    }
  },
  {
    path: "/profile",
    name: "profile",
    component: ProfileView,
    beforeEnter: (to, from, next) => {
      if(store.getters.logedin) {
        next();
      } else {
        // next();
        next(false);
        router.push({name: "home"});
      }
    }
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
