// 客户管理模块

export default {
  namespaced: true,
  state: {
    // 客户管理显示页面
    tab: 'CustomerList',

    // 当前客户对象
    customerInfo: {},

    // 刷新事件
    refreshEvent: false
  },

  actions: {
    // 显示客户信息页面
    showDetails({ commit }) {
      commit('setTab', 'CustomerDetails')
    },

    // 显示客户列表页面
    showList({ commit }) {
      commit('setTab', 'CustomerList')
    }
  },

  mutations: {
    // 设置显示页面
    setTab: (state, tab) => {
      state.tab = tab
    },

    // 设置客户对象
    setCustomerInfo: (state, val) => {
      state.customerInfo = val
    },

    // 刷新操作
    refresh: (state) => {
      state.refreshEvent = !state.refreshEvent
    }
  }
}
