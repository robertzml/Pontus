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

  forkliftMenu: [
    { icon: 'home', text: '主页', name: 'home' },
    { icon: 'gavel', 'icon-alt': 'gavel', text: '入库接单', model: false, name: 'carryInReceiveTask' },
    { icon: 'cloud_upload', 'icon-alt': 'cloud_upload', text: '入库上架', model: false, name: 'carryInEnterTask' },
    {
      icon: 'settings_input_hdmi',
      'icon-alt': 'settings_input_hdmi',
      text: '出库接单',
      model: false,
      name: 'carryOutReceiveTask'
    },
    { icon: 'cloud_download', 'icon-alt': 'cloud_download', text: '出库下架', model: false, name: 'carryOutLeaveTask' }
  ]
}
