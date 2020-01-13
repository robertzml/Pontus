// 出库模块
import moment from 'moment'

export default {
  namespaced: true,

  state: {
    // 货品出库显示页面
    tab: 'StockOutDetails',

    // 搬运出库编辑框显示
    carryOutDialog: false,

    // 当前出库日期
    outTime: moment().format('YYYY-MM-DD'),

    // 当前出库单ID
    stockOutId: '',

    // 当前出库单视图对象
    stockOutInfo: {},

    // 当前出库任务对象
    stockOutTaskInfo: {},

    // 当前查看搬运出库任务信息
    carryOutTaskInfo: {},

    // 刷新事件
    refreshEvent: false
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
    },

    // 设置搬运出库任务
    setCarryOutTaskInfo: (state, payload) => {
      state.carryOutTaskInfo = payload
    },

    // 刷新操作
    refresh: state => {
      state.refreshEvent = !state.refreshEvent
    }
  }
}
