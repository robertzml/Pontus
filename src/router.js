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
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
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
      path: '/cargo',
      name: 'cargo',
      component: () => import('./views/Cargo/Index.vue')
    },
    {
      path: '/warehouse',
      name: 'warehouse',
      component: () => import('./views/Warehouse/Index.vue')
    },
    {
      path: '/position',
      name: 'position',
      component: () => import('./views/Position/Index.vue')
    },
    {
      path: '/stockin',
      name: 'stockin',
      component: () => import('./views/StockIn/Index.vue')
    },
    {
      // 入库接单
      // 叉车工操作
      path: '/carryinreceivetask',
      name: 'carryInReceiveTask',
      component: () => import('./views/CarryIn/ReceiveTask.vue')
    },
    {
      // 入库上架
      // 叉车工操作
      path: '/carryinentertask',
      name: 'carryInEnterTask',
      component: () => import('./views/CarryIn/EnterTask.vue')
    },
    {
      path: '/stockout',
      name: 'stockout',
      component: () => import('./views/StockOut/Index.vue')
    },
    {
      // 出库接单
      // 叉车工操作
      path: '/carryoutreceivetask',
      name: 'carryOutReceiveTask',
      component: () => import('./views/CarryOut/ReceiveTask.vue')
    },
    {
      // 出库下架
      // 叉车工操作
      path: '/carryoutleaveetask',
      name: 'carryOutLeaveTask',
      component: () => import('./views/CarryOut/LeaveTask.vue')
    },
    {
      path: '/store',
      name: 'store',
      component: () => import('./views/Store/Index.vue')
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
    },
    {
      path: '/sequenceTemplate',
      name: 'sequenceTemplate',
      component: () => import('./views/SequenceTemplate/Index.vue')
    }
  ]
})
