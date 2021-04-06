// 出库模块
import moment from 'moment'

export default {
  namespaced: true,

  state: {
    // 货品出库显示页面
    tab: 'StockOutDetails',

    // 出库月份
    monthTime: moment().format('YYYY-MM'),

    // 当前出库单ID
    stockOutId: '',

    // 当前出库单视图对象
    stockOutInfo: {},

    // 当前出库任务对象
    stockOutTaskInfo: {},

    // 刷新事件
    refreshEvent: false
  },

  actions: {
    // 显示出库单信息页面
    showDetails(context, id) {
      context.commit('setTab', 'StockOutDetails')
      context.commit('setStockOutId', id)
    },

    // 显示出库任务信息页面
    showTaskDetals(context, payload) {
      context.commit('setTab', 'StockOutTaskDetails')
      context.commit('setTaskInfo', payload)
    }
  },

  mutations: {
    setTab: (state, tab) => {
      state.tab = tab
    },

    // 设置入库月份
    setMonthTime: (state, monthTime) => {
      state.monthTime = monthTime
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

    // 刷新操作
    refresh: (state) => {
      state.refreshEvent = !state.refreshEvent
    }
  }
}
