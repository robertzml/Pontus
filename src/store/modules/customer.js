// 客户管理模块
import customerApi from '@/controllers/customer.js'

export default {
  namespaced: true,
  state: {
    // 客户管理显示页面
    tab: 'CustomerList',

    // 当前客户对象
    customerInfo: {}
  },

  actions: {
    // 显示客户信息页面
    showDetails({ commit }) {
      commit('setTab', 'CustomerDetails')
    },

    // 显示客户列表页面
    showList({ commit }) {
      commit('setTab', 'CustomerList')
    },

    refreshCustomer({ commit, state }) {
      customerApi.get(state.customerInfo.id).then(res => {
        commit('setCustomerInfo', res)
      })
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
    }
  }
}
