// 仓库管理模块

export default {
  namespaced: true,
  state: {
    // 仓库管理显示页面
    tab: 'WarehouseList',

    // 当前仓库对象
    warehouseInfo: {},

    // 刷新事件
    refreshEvent: false
  },

  actions: {
    // 显示仓库信息页面
    showDetails({ commit }) {
      commit('setTab', 'WarehouseDetails')
    },

    // 显示仓库列表页面
    showList({ commit }) {
      commit('setTab', 'WarehouseList')
    }
  },

  mutations: {
    // 设置显示页面
    setTab: (state, tab) => {
      state.tab = tab
    },

    // 设置仓库对象
    setWarehouseInfo: (state, val) => {
      state.warehouseInfo = val
    },

    // 刷新操作
    refresh: state => {
      state.refreshEvent = !state.refreshEvent
    }
  }
}
