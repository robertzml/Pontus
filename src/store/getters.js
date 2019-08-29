export default {
  isLogin: state => {
    return state.user.login
  },

  // 提示消息
  alertMessage: state => {
    return state.alertMessage
  }
}
