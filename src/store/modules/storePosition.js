// 库存管理模块

export default {
  namespaced: true,
  state: {
    // 当前仓位信息
    positionInfo: {},

    refreshEvent: false
  },

  mutations: {
    // 设置仓位信息
    setPosition: (state, payload) => {
      state.positionInfo = payload
    }
  }
}
