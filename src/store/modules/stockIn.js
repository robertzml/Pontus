// 入库模块
import moment from 'moment'

export default {
  namespaced: true,

  state: {
    // 货品入库显示页面
    tab: 'StockInDetails',

    // 入库月份
    monthTime: moment().format('YYYY-MM'),

    // 当前入库单ID
    stockInId: '',

    // 当前入库单视图对象
    stockInInfo: {},

    // 当前查看入库任务信息
    stockInTaskInfo: {},

    // 刷新事件
    refreshEvent: false
  },

  actions: {
    // 显示入库单信息页面
    showDetails(context, id) {
      context.commit('setTab', 'StockInDetails')
      context.commit('setStockInId', id)
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

    // 设置入库月份
    setMonthTime: (state, monthTime) => {
      state.monthTime = monthTime
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

    // 刷新操作
    refresh: state => {
      state.refreshEvent = !state.refreshEvent
    }
  }
}
