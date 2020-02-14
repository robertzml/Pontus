// 父级栏目
export const topRoutes = [
  {
    path: '/',
    name: 'home',
    icon: 'home',
    text: '主页',
    component: () => import('@/views/Home.vue'),
    meta: { roles: [1, 2, 3, 4, 5] }
  },
  {
    name: 'info',
    icon: 'contacts',
    'icon-alt': 'contacts',
    text: '信息管理',
    model: false,
    children: [],
    meta: { roles: [1, 2, 3] }
  },
  {
    name: 'stock',
    icon: 'shopping_cart',
    'icon-alt': 'shopping_cart',
    text: '冷库租赁',
    model: false,
    children: [],
    meta: { roles: [1, 2, 3, 4, 5] }
  },
  {
    name: 'receipt',
    icon: 'list',
    'icon-alt': 'list',
    text: '单据管理',
    model: false,
    children: [],
    meta: { roles: [1, 2, 3] }
  },
  {
    name: 'store',
    icon: 'domain',
    'icon-alt': 'domain',
    text: '库存管理',
    model: false,
    children: [],
    meta: { roles: [1, 2, 3, 4] }
  },
  {
    name: 'expense',
    icon: 'attach_money',
    'icon-alt': 'attach_money',
    text: '费用管理',
    model: false,
    children: [],
    meta: { roles: [1, 2, 3, 4] }
  },
  {
    name: 'report',
    icon: 'bar_chart',
    'icon-alt': 'bar_chart',
    text: '统计报表',
    model: false,
    children: [],
    meta: { roles: [1, 2, 3] }
  },
  {
    name: 'user',
    icon: 'person',
    'icon-alt': 'person',
    text: '用户管理',
    model: false,
    children: [],
    meta: { roles: [1, 2] }
  },
  {
    name: 'setting',
    icon: 'settings',
    'icon-alt': 'settings',
    text: '系统设置',
    model: false,
    children: [],
    meta: { roles: [1, 2] }
  },
  {
    path: '/about',
    name: 'about',
    icon: 'help',
    text: '关于',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
    meta: { roles: [1, 2, 3, 4, 5] }
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
    component: () => import('@/views/Customer/Index.vue'),
    meta: { roles: [1, 2, 3] }
  },
  {
    path: '/contract',
    name: 'contract',
    text: '合同管理',
    group: 'info',
    model: false,
    component: () => import('@/views/Contract/Index.vue'),
    meta: { roles: [1, 2, 3] }
  },
  {
    path: '/category',
    name: 'category',
    text: '类别管理',
    group: 'info',
    model: false,
    component: () => import('@/views/Category/Index.vue'),
    meta: { roles: [1, 2, 3] }
  },
  {
    path: '/cargo',
    name: 'cargo',
    text: '货品管理',
    group: 'info',
    model: false,
    component: () => import('@/views/Cargo/Index.vue'),
    meta: { roles: [1, 2, 3, 4, 5] }
  },
  {
    path: '/warehouse',
    name: 'warehouse',
    text: '仓库管理',
    group: 'info',
    model: false,
    component: () => import('@/views/Warehouse/Index.vue'),
    meta: { roles: [1, 2, 3] }
  },
  {
    path: '/position',
    name: 'position',
    text: '仓位管理',
    group: 'info',
    model: false,
    component: () => import('@/views/Position/Index.vue'),
    meta: { roles: [1, 2, 3] }
  },
  {
    path: '/stockin',
    name: 'stockIn',
    text: '货品入库',
    group: 'stock',
    model: false,
    component: () => import('@/views/StockIn/Index.vue'),
    meta: { roles: [1, 2, 3, 4] }
  },
  {
    path: '/stockout',
    name: 'stockOut',
    text: '货品出库',
    group: 'stock',
    model: false,
    component: () => import('@/views/StockOut/Index.vue'),
    meta: { roles: [1, 2, 3, 4] }
  },
  {
    path: '/receipt',
    name: 'receipt',
    text: '单据列表',
    group: 'receipt',
    model: false,
    component: () => import('@/views/Receipt/Index.vue'),
    meta: { roles: [1, 2, 3] }
  },
  {
    path: '/store',
    name: 'store',
    text: '仓库库存',
    group: 'store',
    model: false,
    component: () => import('@/views/Store/Index.vue'),
    meta: { roles: [1, 2, 3] }
  },
  {
    path: '/storegrid',
    name: 'storeGrid',
    text: '表格视图',
    group: 'store',
    model: false,
    component: () => import('@/views/Store/Grid.vue'),
    meta: { roles: [1, 2, 3] }
  },
  {
    path: '/user',
    name: 'user',
    text: '用户列表',
    group: 'user',
    model: false,
    component: () => import('@/views/User/Index.vue'),
    meta: { roles: [1, 2] }
  },
  {
    path: '/usergroup',
    name: 'usergroup',
    text: '用户组列表',
    group: 'user',
    model: false,
    component: () => import('@/views/UserGroup/Index.vue'),
    meta: { roles: [1, 2] }
  },
  {
    path: '/sequenceTemplate',
    name: 'sequenceTemplate',
    text: '编号模板',
    group: 'setting',
    model: false,
    component: () => import('@/views/SequenceTemplate/Index.vue'),
    meta: { roles: [1, 2] }
  },
  {
    path: '/expenseitem',
    name: 'expenseItem',
    text: '费用项目',
    group: 'setting',
    model: false,
    component: () => import('@/views/ExpenseItem/Index.vue'),
    meta: { roles: [1, 2] }
  },
  {
    path: '/keeperstockin',
    name: 'keeperStockIn',
    text: '货品入库',
    component: () => import('@/views/Keeper/StockIn.vue'),
    meta: { roles: [5] }
  },
  {
    path: '/keeperstockout',
    name: 'keeperStockOut',
    text: '货品出库',
    component: () => import('@/views/Keeper/StockOut.vue'),
    meta: { roles: [5] }
  },
  {
    // 入库接单
    // 叉车工操作
    path: '/forkliftreceiveintask',
    name: 'forkliftReceiveInTask',
    text: '入库接单',
    model: false,
    component: () => import('@/views/Forklift/ReceiveInTask.vue'),
    meta: { roles: [6] }
  },
  {
    // 入库上架
    // 叉车工操作
    path: '/forkliftentertask',
    name: 'forkliftEnterTask',
    text: '入库上架',
    model: false,
    component: () => import('@/views/Forklift/EnterTask.vue'),
    meta: { roles: [6] }
  },
  {
    // 出库接单
    // 叉车工操作
    path: '/forkliftreceiveouttask',
    name: 'forkliftReceiveOutTask',
    text: '出库接单',
    model: false,
    component: () => import('@/views/Forklift/ReceiveOutTask.vue'),
    meta: { roles: [6] }
  },
  {
    // 出库下架
    // 叉车工操作
    path: '/forkliftleavetask',
    name: 'forkliftLeaveTask',
    text: '出库下架',
    model: false,
    component: () => import('@/views/Forklift/LeaveTask.vue'),
    meta: { roles: [6] }
  }
]

export const routes = [...topRoutes, ...menuRoutes]
