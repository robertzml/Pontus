// 搬运入库模块

export default {
  namespaced: true,

  state: {
    // 搬运入库显示页面
    tab: 'CarryInList',

    // 当前搬运入库任务ID
    carryInId: '',

    // 刷新事件
    refreshEvent: false
  },

  actions: {
    // 显示搬运入库信息页面
    showDetails(context, id) {
      context.commit('setTab', 'CarryInDetails')
      context.commit('setCarryInId', id)
    },

    // 显示搬运入库列表页面
    showList({ commit }) {
      commit('setTab', 'CarryInList')
    }
  },

  mutations: {
    setTab: (state, tab) => {
      state.tab = tab
    },

    // 设置搬运入库任务ID
    setCarryInId: (state, id) => {
      state.carryInId = id
    },

    // 刷新操作
    refresh: state => {
      state.refreshEvent = !state.refreshEvent
    }
  }
}
