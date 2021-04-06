export default {
  isLogin: (state) => {
    return state.user.login
  },

  userInfo: (state) => {
    return state.user
  },

  // 提示消息
  alertMessage: (state) => {
    return state.alertMessage
  },

  entityStatus: (state) => (val) => {
    let es = state.entityStatus.find((r) => r.value == val)
    if (es != undefined) {
      return es.text
    } else {
      return ''
    }
  }
}
