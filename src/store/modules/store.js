// 库存管理模块

export default {
  namespaced: true,
  state: {
    // 列表视图
    gridTab: 'StoreList',

    // 当前库存ID
    storeId: '',

    // 当前仓位信息
    positionInfo: {},

    refreshEvent: false
  },

  actions: {
    // 显示单据信息页面
    showStoreList({ commit }) {
      commit('setGridTab', 'StoreList')
    },

    // 显示单据列表页面
    showStoreDetails(context, id) {
      context.commit('setGridTab', 'StoreDetails')
      context.commit('setStoreId', id)
    }
  },

  mutations: {
    // 设置显示页面
    setGridTab: (state, tab) => {
      state.gridTab = tab
    },

    // 设置库存记录
    setStoreId: (state, id) => {
      state.storeId = id
    },

    // 设置仓位信息
    setPosition: (state, payload) => {
      state.positionInfo = payload
    }
  }
}
