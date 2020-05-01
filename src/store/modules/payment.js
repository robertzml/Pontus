// 缴费管理模块

export default {
  namespaced: true,
  state: {
    // 缴费管理显示页面
    tab: 'PaymentList',

    // 当前缴费ID
    paymentId: {},

    // 刷新事件
    refreshEvent: false
  },

  actions: {
    // 显示缴费信息页面
    showDetails(context, id) {
      context.commit('setTab', 'PaymentDetails')
      context.commit('setPaymentId', id)
    },

    // 显示缴费列表页面
    showList({ commit }) {
      commit('setTab', 'PaymentList')
    }
  },

  mutations: {
    // 设置显示页面
    setTab: (state, tab) => {
      state.tab = tab
    },

    // 设置缴费ID
    setPaymentId: (state, val) => {
      state.paymentId = val
    },

    // 刷新操作
    refresh: state => {
      state.refreshEvent = !state.refreshEvent
    }
  }
}
