// 出库模块

export default {
  namespaced: true,

  state: {
    // 货品出库显示页面
    stockOutWindow: 'details',

    // 当前出库单ID
    stockOutId: ''
  },

  actions: {
    // 显示出库单信息页面
    showDetails({ commit }) {
      commit('setWindow', 'details')
    },

    // 显示出库任务信息页面
    showTaskDetals({ commit }) {
      commit('setWindow', 'taskDetails')
    }
  },

  mutations: {
    setWindow: (state, window) => {
      state.stockOutWindow = window
    },

    // 设置出库单ID
    setStockOutId: (state, id) => {
      state.stockOutId = id
    }
  }
}
