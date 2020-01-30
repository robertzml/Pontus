// 单据管理模块

export default {
  namespaced: true,

  state: {
    // 单据管理显示页面
    tab: 'ReceiptList',

    // 当前单据对象
    contractInfo: {},

    // 刷新事件
    refreshEvent: false
  },

  actions: {
    // 显示合同信息页面
    showDetails({ commit }) {
      commit('setTab', 'ContractDetails')
    },

    // 显示单据列表页面
    showList({ commit }) {
      commit('setTab', 'ReceiptList')
    }
  },

  mutations: {
    // 设置显示页面
    setTab: (state, tab) => {
      state.tab = tab
    },

    // 设置合同对象
    setContractInfo: (state, val) => {
      state.contractInfo = val
    },

    // 刷新操作
    refresh: state => {
      state.refreshEvent = !state.refreshEvent
    }
  }
}
