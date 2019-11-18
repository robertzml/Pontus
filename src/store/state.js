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
    { roleId: 1, code: 'root' },
    { roleId: 2, code: 'administrator' },
    { roleId: 3, code: 'manager' },
    { roleId: 4, code: 'executive' },
    { roleId: 5, code: 'warehouse' },
    { roleId: 6, code: 'forklift' }
  ]
}
