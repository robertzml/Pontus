import Vue from 'vue'
import VueRouter from 'vue-router'
import { routes } from './menu'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: routes.filter((r) => r.path)
})

export default router
