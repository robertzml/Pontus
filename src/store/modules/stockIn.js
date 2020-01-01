// 入库模块

export default {
  namespaced: true,
  state: {
    // 货品入库显示页面
    stockInWindow: 'details',

    // 显示入库任务页面侧边
    showTaskDrawer: false,

    // 当前入库单ID
    stockInId: '',

    // 当前入库单视图对象
    stockInInfo: {},

    // 当前查看入库任务信息
    stockInTaskInfo: {},

    // 当前查看搬运任务信息
    carryInTaskInfo: {}
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

    // 设置入库任务侧边显示 搬运任务
    showTaskDrawer: (state, payload) => {
      state.showTaskDrawer = true
      state.carryInTaskInfo = payload
    },

    // 设置入库任务侧边关闭
    closeTaskDrawer: state => {
      state.showTaskDrawer = false
    },

    // 设置入库单ID
    setId: (state, id) => {
      state.stockInId = id
    },

    // 设置入库单对象
    setStockInInfo: (state, val) => {
      state.stockInInfo = val
    },

    // 设置入库任务
    setTaskInfo: (state, payload) => {
      state.stockInTaskInfo = payload
    }
  }
}
