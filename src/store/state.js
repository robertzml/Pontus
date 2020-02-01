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
    { userGroupId: 5, code: 'keeper' },
    { userGroupId: 6, code: 'forklift' }
  ]
}
