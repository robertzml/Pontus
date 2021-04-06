import Vue from 'vue'
import VueRouter from 'vue-router'
import { routes } from './menu'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: routes.filter((r) => r.path != undefined)
})

router.beforeEach((to, from, next) => {
  if (to.path == '/login') {
    next()
  } else {
    let token = window.sessionStorage.getItem('token')
    if (token == null) {
      next({ path: '/login' })
    } else {
      let user = JSON.parse(token)
      if (user.login) {
        next()
      } else {
        next({ path: '/login' })
      }
    }
  }
})

export default router
