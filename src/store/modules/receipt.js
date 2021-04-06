// 单据管理模块

export default {
  namespaced: true,

  state: {
    // 单据管理显示页面
    stockInTab: 'ReceiptStockInList',

    // 当前入库单ID
    stockInId: '',

    // 刷新事件
    stockInRefreshEvent: false,

    // 出库单据管理显示页面
    stockOutTab: 'ReceiptStockOutList',

    // 当前出库单ID
    stockOutId: '',

    // 刷新事件
    stockOutRefreshEvent: false
  },

  actions: {
    // 显示单据信息页面
    showStockInDetails(context, id) {
      context.commit('setStockInTab', 'ReceiptStockInDetails')
      context.commit('setStockInId', id)
    },

    // 显示单据列表页面
    showStockInList({ commit }) {
      commit('setStockInTab', 'ReceiptStockInList')
    },

    // 显示单据信息页面
    showStockOutDetails(context, id) {
      context.commit('setStockOutTab', 'ReceiptStockOutDetails')
      context.commit('setStockOutId', id)
    },

    // 显示单据列表页面
    showStockOutList({ commit }) {
      commit('setStockOutTab', 'ReceiptStockOutList')
    }
  },

  mutations: {
    // 设置显示页面
    setStockInTab: (state, tab) => {
      state.stockInTab = tab
    },

    // 设置入库单ID
    setStockInId: (state, val) => {
      state.stockInId = val
    },

    // 刷新操作
    refreshStockIn: (state) => {
      state.stockInRefreshEvent = !state.stockInRefreshEvent
    },

    // 设置显示页面
    setStockOutTab: (state, tab) => {
      state.stockOutTab = tab
    },

    // 设置出库单ID
    setStockOutId: (state, val) => {
      state.stockOutId = val
    },

    // 刷新操作
    refreshStockOut: (state) => {
      state.stockOutRefreshEvent = !state.stockOutRefreshEvent
    }
  }
}
