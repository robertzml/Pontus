// 库存管理模块

export default {
  namespaced: true,
  state: {
    // 列表视图
    tab: 'StoreList',

    // 当前库存ID
    storeId: '',

    refreshEvent: false
  },

  actions: {
    // 显示单据信息页面
    showList({ commit }) {
      commit('setTab', 'StoreList')
    },

    // 显示单据列表页面
    showDetails(context, id) {
      context.commit('setTab', 'StoreDetails')
      context.commit('setStoreId', id)
    }
  },

  mutations: {
    // 设置显示页面
    setTab: (state, tab) => {
      state.tab = tab
    },

    // 设置库存记录
    setStoreId: (state, id) => {
      state.storeId = id
    },

    // 刷新操作
    refresh: state => {
      state.refreshEvent = !state.refreshEvent
    }
  }
}
