// 父级栏目
export const topRoutes = [
  {
    path: '/',
    name: 'home',
    icon: 'home',
    text: '主页',
    component: () => import('@/views/Home.vue'),
    roles: [1, 2, 3, 4, 5]
  },
  {
    name: 'info',
    icon: 'contacts',
    'icon-alt': 'contacts',
    text: '信息管理',
    model: false,
    children: [],
    roles: [1, 2, 3]
  },
  {
    name: 'stock',
    icon: 'shopping_cart',
    'icon-alt': 'shopping_cart',
    text: '冷库租赁',
    model: false,
    children: [],
    roles: [1, 2, 3, 4, 5]
  },
  {
    name: 'store',
    icon: 'domain',
    'icon-alt': 'domain',
    text: '库存管理',
    model: false,
    children: [],
    roles: [1, 2, 3, 4]
  },
  {
    name: 'report',
    icon: 'bar_chart',
    'icon-alt': 'bar_chart',
    text: '统计报表',
    model: false,
    children: [],
    roles: [1, 2, 3]
  },
  {
    name: 'user',
    icon: 'person',
    'icon-alt': 'person',
    text: '用户管理',
    model: false,
    children: [],
    roles: [1, 2]
  },
  {
    name: 'setting',
    icon: 'settings',
    'icon-alt': 'settings',
    text: '系统设置',
    model: false,
    children: [],
    roles: [1, 2]
  },
  {
    path: '/about',
    name: 'about',
    icon: 'help',
    text: '关于',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
    roles: [1, 2, 3, 4, 5]
  }
]

export const menuRoutes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/Login.vue')
  },
  {
    path: '/customer',
    name: 'customer',
    text: '客户管理',
    group: 'info',
    model: false,
    roles: [1, 2, 3],
    component: () => import('@/views/Customer/Index.vue')
  },
  {
    path: '/contract',
    name: 'contract',
    text: '合同管理',
    group: 'info',
    model: false,
    roles: [1, 2, 3],
    component: () => import('@/views/Contract/Index.vue')
  },
  {
    path: '/category',
    name: 'category',
    text: '类别管理',
    group: 'info',
    model: false,
    roles: [1, 2, 3],
    component: () => import('@/views/Category/Index.vue')
  },
  {
    path: '/cargo',
    name: 'cargo',
    text: '货品管理',
    group: 'info',
    model: false,
    roles: [1, 2, 3],
    component: () => import('@/views/Cargo/Index.vue')
  },
  {
    path: '/warehouse',
    name: 'warehouse',
    text: '仓库管理',
    group: 'info',
    model: false,
    roles: [1, 2, 3],
    component: () => import('@/views/Warehouse/Index.vue')
  },
  {
    path: '/position',
    name: 'position',
    text: '仓位管理',
    group: 'info',
    model: false,
    roles: [1, 2, 3],
    component: () => import('@/views/Position/Index.vue')
  },
  {
    path: '/stockin',
    name: 'stockin',
    text: '货品入库',
    group: 'stock',
    model: false,
    roles: [1, 2, 3, 4],
    component: () => import('@/views/StockIn/Index.vue')
  },
  {
    // 入库接单
    // 叉车工操作
    path: '/carryinreceivetask',
    name: 'carryInReceiveTask',
    text: '入库接单',
    model: false,
    component: () => import('@/views/CarryIn/ReceiveTask.vue')
  },
  {
    // 入库上架
    // 叉车工操作
    path: '/carryinentertask',
    name: 'carryInEnterTask',
    text: '入库上架',
    model: false,
    component: () => import('@/views/CarryIn/EnterTask.vue')
  },
  {
    path: '/stockout',
    name: 'stockout',
    text: '货品出库',
    group: 'stock',
    model: false,
    roles: [1, 2, 3],
    component: () => import('@/views/StockOut/Index.vue')
  },
  {
    // 出库接单
    // 叉车工操作
    path: '/carryoutreceivetask',
    name: 'carryOutReceiveTask',
    text: '出库接单',
    model: false,
    component: () => import('@/views/CarryOut/ReceiveTask.vue')
  },
  {
    // 出库下架
    // 叉车工操作
    path: '/carryoutleaveetask',
    name: 'carryOutLeaveTask',
    text: '出库下架',
    model: false,
    component: () => import('@/views/CarryOut/LeaveTask.vue')
  },
  {
    path: '/receipt',
    name: 'receipt',
    component: () => import('@/views/Receipt/Index.vue')
  },
  {
    path: '/store',
    name: 'store',
    text: '仓库库存',
    group: 'store',
    model: false,
    roles: [1, 2, 3],
    component: () => import('@/views/Store/Index.vue')
  },
  {
    path: '/user',
    name: 'user',
    text: '用户列表',
    group: 'user',
    model: false,
    roles: [1, 2],
    component: () => import('@/views/User/Index.vue')
  },
  {
    path: '/usergroup',
    name: 'usergroup',
    text: '用户组列表',
    group: 'user',
    model: false,
    roles: [1, 2],
    component: () => import('@/views/UserGroup/Index.vue')
  },
  {
    path: '/sequenceTemplate',
    name: 'sequenceTemplate',
    text: '编号模板',
    group: 'setting',
    model: false,
    roles: [1, 2],
    component: () => import('@/views/SequenceTemplate/Index.vue')
  }
]

export const routes = [...topRoutes, ...menuRoutes]
