// 出库模块

export default {
  namespaced: true,

  state: {
    // 货品出库显示页面
    tab: 'StockOutDetails',

    // 当前出库日期
    outTime: new Date().toISOString().substr(0, 10),

    // 当前出库单ID
    stockOutId: '',

    // 当前出库单视图对象
    stockOutInfo: {}
  },

  actions: {
    // 显示出库单信息页面
    showDetails({ commit }) {
      commit('setTab', 'StockOutDetails')
    },

    // 显示出库任务信息页面
    showTaskDetals({ commit }) {
      commit('setTab', 'TaskDetails')
    }
  },

  mutations: {
    setTab: (state, tab) => {
      state.tab = tab
    },

    // 设置当前出库日期
    setOutTime: (state, outTime) => {
      state.outTime = outTime
    },

    // 设置出库单ID
    setStockOutId: (state, id) => {
      state.stockOutId = id
    },

    // 设置出库单对象
    setStockOutInfo: (state, val) => {
      state.stockOutInfo = val
    }
  }
}
