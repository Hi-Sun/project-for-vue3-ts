import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import SimpleLogin from  '../views/login/SimpleLogin.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/simple-login',
    name: 'SimpleLogin',
    component: SimpleLogin
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
