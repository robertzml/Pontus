export default {
  isLogin: state => {
    return state.user.login
  },

  userInfo: state => {
    return state.user
  },

  // 提示消息
  alertMessage: state => {
    return state.alertMessage
  }
}
