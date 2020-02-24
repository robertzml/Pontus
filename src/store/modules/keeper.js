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

    // 出库显示页面
    stockOutTab: 'StockOutTaskList',

    // 出库单ID
    stockOutId: '',

    // 出库任务单ID
    stockOutTaskId: '',

    // 刷新事件
    refreshEvent: false
  },

  actions: {
    // 显示入库任务信息页面
    showStockInTaskDetails(context, id) {
      context.commit('setStockInTaskId', id)
      context.commit('setStockInTab', 'StockInTaskDetails')
    },

    // 显示入库任务列表页面
    showStockInTaskList({ commit }) {
      commit('setStockInTab', 'StockInTaskList')
    },

    // 显示出库任务信息页面
    showStockOutTaskDetails(context, id) {
      context.commit('setStockOutTaskId', id)
      context.commit('setStockOutTab', 'StockOutTaskDetails')
    },

    // 显示出库任务列表页面
    showStockOutTaskList({ commit }) {
      commit('setStockOutTab', 'StockOutTaskList')
    }
  },

  mutations: {
    // 设置显示页面
    setStockInTab: (state, tab) => {
      state.stockInTab = tab
    },

    // 设置出库显示页面
    setStockOutTab: (state, tab) => {
      state.stockOutTab = tab
    },

    // 设置入库单ID
    setStockInId: (state, id) => {
      state.stockInId = id
    },

    // 设置出库单ID
    setStockOutId: (state, id) => {
      state.stockOutId = id
    },

    // 设置入库任务ID
    setStockInTaskId: (state, id) => {
      state.stockInTaskId = id
    },

    // 设置出库任务ID
    setStockOutTaskId: (state, id) => {
      state.stockOutTaskId = id
    },

    // 刷新操作
    refresh: state => {
      state.refreshEvent = !state.refreshEvent
    }
  }
}
