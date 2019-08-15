export default {
  // 提示消息
  alertMessage: state => {
    return state.alertMessage
  },

  // 客户类型
  customerType: state => type => {
    let ct = state.customerType.find(r => r.value == type)
    if (ct != undefined) {
      return ct.text
    } else {
      return ''
    }
  }
}
