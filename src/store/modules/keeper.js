// 仓库管理员页面模块

export default {
  namespaced: true,
  state: {
    // 入库显示页面
    stockInTab: 'StockInTaskList',

    // 入库单ID
    stockInId: '',

    // 入库任务ID
    stockInTaskId: '',

    // 刷新事件
    refreshEvent: false
  },

  actions: {
    // 显示入库任务信息页面
    showStockInTaskDetails({ commit }) {
      commit('setStockInTab', 'StockInTaskDetails')
    },

    // 显示入库任务列表页面
    showStockInTaskList({ commit }) {
      commit('setStockInTab', 'StockInTaskList')
    }
  },

  mutations: {
    // 设置显示页面
    setStockInTab: (state, tab) => {
      state.stockInTab = tab
    },

    // 设置入库单ID
    setStockInId: (state, id) => {
      state.stockInId = id
    },

    // 设置入库任务ID
    setStockInTaskId: (state, id) => {
      state.stockInTaskId = id
    },

    // 刷新操作
    refresh: state => {
      state.refreshEvent = !state.refreshEvent
    }
  }
}
