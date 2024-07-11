import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import SimpleLogin from  '../views/login/SimpleLogin.vue'
import CatchBallGame from  '../views/game/CatchBallGame.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/login/simple',
    name: 'SimpleLogin',
    component: SimpleLogin
  },
  {
    path: '/game/catchball',
    name: 'CatchBallGame',
    component: CatchBallGame
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
