import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('./views/Home.vue')
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '/customer',
      name: 'customer',
      component: () => import('./views/Customer/Index.vue')
    },
    {
      path: '/contract',
      name: 'contract',
      component: () => import('./views/Contract/Index.vue')
    },
    {
      path: '/category',
      name: 'category',
      component: () => import('./views/Category/Index.vue')
    },
    {
      path: '/user',
      name: 'user',
      component: () => import('./views/User/Index.vue')
    },
    {
      path: '/usergroup',
      name: 'usergroup',
      component: () => import('./views/UserGroup/Index.vue')
    }
  ]
})
