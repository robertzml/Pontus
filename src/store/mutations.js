export default {
  login: (state, userInfo) => {
    state.user = userInfo
    window.sessionStorage.setItem('token', JSON.stringify(userInfo))
  },

  logout: state => {
    state.user = {
      login: false,
      id: '',
      userName: '',
      name: '',
      userGroupId: ''
    }
    window.sessionStorage.removeItem('token')
  },

  getToken: state => {
    let token = window.sessionStorage.getItem('token')
    if (token == null) {
      return
    } else {
      state.user = JSON.parse(token)
    }
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
  },

  entityStatus: (state, data) => {
    state.entityStatus = data
  }
}
