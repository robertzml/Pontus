// 出库模块

export default {
  namespaced: true,

  state: {
    // 货品出库显示页面
    tab: 'StockOutDetails',

    // 搬运出库编辑框显示
    carryOutDialog: false,

    // 显示出库任务页面侧边
    showTaskDrawer: false,

    // 当前出库日期
    outTime: new Date().toISOString().substr(0, 10),

    // 当前出库单ID
    stockOutId: '',

    // 当前出库单视图对象
    stockOutInfo: {},

    // 当前出库任务对象
    stockOutTaskInfo: {},

    // 当前查看搬运任务信息
    carryOutTaskInfo: {}
  },

  actions: {
    // 显示出库单信息页面
    showDetails({ commit }) {
      commit('setTab', 'StockOutDetails')
    },

    // 显示出库任务信息页面
    showTaskDetals({ commit }) {
      commit('setTab', 'StockOutTaskDetails')
    }
  },

  mutations: {
    setTab: (state, tab) => {
      state.tab = tab
    },

    setCarryOutDialog: (state, val) => {
      state.carryOutDialog = val
    },

    // 设置出库任务侧边显示 搬运任务
    showTaskDrawer: (state, payload) => {
      state.showTaskDrawer = true
      state.carryOutTaskInfo = payload
    },

    // 设置出库任务侧边关闭
    closeTaskDrawer: state => {
      state.showTaskDrawer = false
    },

    // 设置当前出库日期
    setOutTime: (state, outTime) => {
      state.outTime = outTime
    },

    // 设置出库单ID
    setStockOutId: (state, id) => {
      state.stockOutId = id
    },

    // 设置出库单对象
    setStockOutInfo: (state, val) => {
      state.stockOutInfo = val
    },

    // 设置出库任务
    setTaskInfo: (state, payload) => {
      state.stockOutTaskInfo = payload
    }
  }
}
