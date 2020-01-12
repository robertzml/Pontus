// 入库模块

export default {
  namespaced: true,

  state: {
    // 货品入库显示页面
    tab: 'StockInDetails',

    // 当前入库日期
    inTime: new Date().toISOString().substr(0, 10),

    // 当前入库单ID
    stockInId: '',

    // 当前入库单视图对象
    stockInInfo: {},

    // 当前查看入库任务信息
    stockInTaskInfo: {},

    // 当前查看搬运任务信息
    carryInTaskInfo: {},

    // 刷新事件
    refreshEvent: false
  },

  actions: {
    // 显示入库单信息页面
    showDetails({ commit }) {
      commit('setTab', 'StockInDetails')
    },

    // 显示入库任务信息页面
    showTaskDetals({ commit }) {
      commit('setTab', 'StockInTaskDetails')
    }
  },

  mutations: {
    setTab: (state, tab) => {
      state.tab = tab
    },

    // 设置当前入库日期
    setInTime: (state, inTime) => {
      state.inTime = inTime
    },

    // 设置入库单ID
    setStockInId: (state, id) => {
      state.stockInId = id
    },

    // 设置入库单对象
    setStockInInfo: (state, val) => {
      state.stockInInfo = val
    },

    // 设置入库任务
    setTaskInfo: (state, payload) => {
      state.stockInTaskInfo = payload
    },

    // 设置搬运入库任务
    setCarryInTaskInfo: (state, payload) => {
      state.carryInTaskInfo = payload
    },

    // 刷新操作
    refresh: state => {
      state.refreshEvent = !state.refreshEvent
    }
  }
}
