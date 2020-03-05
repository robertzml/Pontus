// 单据管理模块

export default {
  namespaced: true,

  state: {
    // 单据管理显示页面
    stockInTab: 'ReceiptStockInList',

    // 当前入库单ID
    stockInId: '',

    // 刷新事件
    stockInRefreshEvent: false
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
    }
  },

  mutations: {
    // 设置显示页面
    setStockInTab: (state, tab) => {
      state.stockInTab = tab
    },

    // 设置合同对象
    setStockInId: (state, val) => {
      state.stockInId = val
    },

    // 刷新操作
    refreshStockIn: state => {
      state.stockInRefreshEvent = !state.stockInRefreshEvent
    }
  }
}
