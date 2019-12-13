// 入库模块

export default {
  namespaced: true,
  state: {
    // 货品入库显示页面
    stockInWindow: 'details',

    // 当前入库单ID
    stockInId: '',

    // 当前查看入库任务信息
    stockInTaskInfo: {}
  },

  actions: {
    // 显示入库单信息页面
    showDetails({ commit }) {
      commit('setWindow', 'details')
    },

    // 显示入库任务信息页面
    showTaskDetals({ commit }) {
      commit('setWindow', 'taskDetails')
    }
  },

  mutations: {
    setWindow: (state, window) => {
      state.stockInWindow = window
    },

    // 设置入库单ID
    setId: (state, id) => {
      state.stockInId = id
    },

    // 设置入库任务
    setTaskInfo: (state, payload) => {
      state.stockInTaskInfo = payload
    }
  }
}
