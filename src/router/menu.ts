import { RouteConfig } from 'vue-router'

const topRoutes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    meta: {
      text: '主页',
      icon: 'mdi-home'
    },
    component: () => import('@/views/Home.vue')
  },
  {
    name: 'info',
    path: '',
    meta: {
      text: '信息管理',
      icon: 'mdi-contacts',
      roles: [1, 2, 3]
    }
  },
  {
    name: 'stock',
    path: '',
    meta: {
      text: '冷库租赁',
      icon: 'mdi-cart',
      roles: [1, 2, 3]
    }
  },
  {
    name: 'store',
    path: '',
    meta: {
      text: '库存管理',
      icon: 'mdi-store',
      roles: [1, 2, 3]
    }
  },
  {
    name: 'expense',
    path: '',
    meta: {
      text: '费用管理',
      icon: 'mdi-cash-usd',
      roles: [1, 2, 3]
    }
  },
  {
    name: 'statistic',
    path: '',
    meta: {
      text: '统计报表',
      icon: 'mdi-chart-bar',
      roles: [1, 2, 3]
    }
  },
  {
    name: 'user',
    path: '',
    meta: {
      text: '用户管理',
      icon: 'mdi-account-group',
      roles: [1, 2, 3]
    }
  },
  {
    name: 'settings',
    path: '',
    meta: {
      text: '系统设置',
      icon: 'mdi-wrench',
      roles: [1, 2, 3]
    }
  },
  {
    path: '/about',
    name: 'About',
    meta: {
      text: '帮助',
      icon: 'mdi-help-circle',
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
