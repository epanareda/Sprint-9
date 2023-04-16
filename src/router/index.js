import { createRouter, createWebHistory } from "vue-router"
import HomeView from "../views/HomeView.vue"
import GuideView from "../views/GuideView.vue"
import GameView from "../views/GameView.vue"
import ProfileView from "../views/ProfileView.vue"

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
    component: GameView
  },
  {
    path: "/historic",
    name: "historic",
    // component: HistoricView
  },
  {
    path: "/profile",
    name: "profile",
    component: ProfileView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
