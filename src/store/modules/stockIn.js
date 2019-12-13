// 入库模块

export default {
  namespaced: true,
  state: {
    // 当前入库单ID
    stockInId: ''
  },

  actions: {},

  mutations: {
    // 设置入库单ID
    setId: (state, id) => {
      state.stockInId = id
    }
  }
}
