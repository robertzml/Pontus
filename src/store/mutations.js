export default {
  login: (state, userInfo) => {
    state.user = userInfo
  },

  alertError: (state, message) => {
    state.alertMessage.text = message
    state.alertMessage.color = 'error'
    state.alertMessage.display = true
  },

  alertInfo: (state, message) => {
    state.alertMessage.text = message
    state.alertMessage.color = 'info'
    state.alertMessage.display = true
  },

  alertSuccess: (state, message) => {
    state.alertMessage.text = message
    state.alertMessage.color = 'success'
    state.alertMessage.display = true
  },

  alertClose: state => {
    state.alertMessage.display = false
  }
}
