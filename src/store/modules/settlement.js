// 结算管理模块

export default {
  namespaced: true,
  state: {
    // 结算管理显示页面
    tab: 'SettlementList',

    // 当前结算ID
    settlementId: {},

    // 刷新事件
    refreshEvent: false
  },

  actions: {
    // 显示结算信息页面
    showDetails(context, id) {
      context.commit('setTab', 'SettlementDetails')
      context.commit('setSettlementId', id)
    },

    // 显示结算列表页面
    showList({ commit }) {
      commit('setTab', 'SettlementList')
    }
  },

  mutations: {
    // 设置显示页面
    setTab: (state, tab) => {
      state.tab = tab
    },

    // 设置结算ID
    setSettlementId: (state, val) => {
      state.settlementId = val
    },

    // 刷新操作
    refresh: (state) => {
      state.refreshEvent = !state.refreshEvent
    }
  }
}
