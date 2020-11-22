import { RouteConfig } from 'vue-router'

const topRoutes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    meta: {
      text: '主页'
    },
    component: () => import('@/views/Home.vue')
  },
  {
    name: 'info',
    path: '',
    meta: {
      text: '信息管理',
      model: false,
      roles: [1, 2, 3]
    }
  },
  {
    path: '/about',
    name: 'About',
    meta: {
      text: '帮助',
      model: false,
      roles: [1, 2, 3]
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '@/views/About.vue')
  }
]

const menuRoutes: Array<RouteConfig> = [
  {
    path: '/customer',
    name: 'customer',
    component: () => import('@/views/Customer/Index.vue'),
    meta: {
      text: '客户管理',
      group: 'info',
      model: false,
      roles: [1, 2, 3]
    }
  }
]

export const routes = [...topRoutes, ...menuRoutes]
