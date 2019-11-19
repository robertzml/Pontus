export default {
  user: {
    login: false,
    id: '',
    userName: '',
    name: '',
    userGroupId: ''
  },

  // 提示消息
  alertMessage: {
    display: false,
    text: '',
    color: 'info'
  },

  // 实体状态
  entityStatus: [],

  // 角色代码
  roleCode: [
    { userGroupId: 1, code: 'root' },
    { userGroupId: 2, code: 'administrator' },
    { userGroupId: 3, code: 'manager' },
    { userGroupId: 4, code: 'executive' },
    { userGroupId: 5, code: 'warehouse' },
    { userGroupId: 6, code: 'forklift' }
  ],

  rootMenu: [
    { icon: 'home', text: '主页', name: 'home' },
    {
      icon: 'contacts',
      'icon-alt': 'contacts',
      text: '信息管理',
      model: false,
      children: [
        { text: '客户管理', model: false, name: 'customer' },
        { text: '合同管理', model: false, name: 'contract' },
        { text: '类别管理', model: false, name: 'category' },
        { text: '仓库管理', model: false, name: 'warehouse' },
        { text: '仓位管理', model: false, name: 'position' }
      ]
    },
    {
      icon: 'shopping_cart',
      'icon-alt': 'shopping_cart',
      text: '冷库租赁',
      model: false,
      children: [
        { text: '货品入库', model: false, name: 'stockin' },
        { text: '货品出库', model: false, name: 'stockout' },
        { text: '货品移库', model: false }
      ]
    },
    {
      icon: 'domain',
      'icon-alt': 'domain',
      text: '库存管理',
      model: false,
      children: [{ text: '货品管理', model: false, name: 'cargo' }, { text: '仓库库存', model: false, name: 'store' }]
    },
    {
      icon: 'bar_chart',
      'icon-alt': 'bar_chart',
      text: '统计报表',
      model: false,
      children: [{ text: '货品总报表' }, { text: '货品分项报表' }, { text: '每日库存盘点' }]
    },
    {
      icon: 'person',
      'icon-alt': 'person',
      text: '用户管理',
      model: false,
      children: [
        { text: '用户列表', model: false, name: 'user' },
        { text: '用户组列表', model: false, name: 'usergroup' }
      ]
    },
    {
      icon: 'settings',
      'icon-alt': 'settings',
      text: '系统设置',
      model: false,
      children: [{ text: '编号模板', model: false, name: 'sequenceTemplate' }]
    },
    { icon: 'help', text: '关于', name: 'about' }
  ]
}
