// 搬运出库模块

export default {
  namespaced: true,

  state: {
    // 搬运出库显示页面
    tab: 'CarryOutList',

    // 当前搬运出库任务ID
    carryOutId: '',

    // 刷新事件
    refreshEvent: false
  },

  actions: {
    // 显示搬运出库信息页面
    showDetails(context, id) {
      context.commit('setTab', 'CarryOutDetails')
      context.commit('setCarryOutId', id)
    },

    // 显示搬运出库列表页面
    showList({ commit }) {
      commit('setTab', 'CarryOutList')
    }
  },

  mutations: {
    setTab: (state, tab) => {
      state.tab = tab
    },

    // 设置搬运出库任务ID
    setCarryOutId: (state, id) => {
      state.carryOutId = id
    },

    // 刷新操作
    refresh: state => {
      state.refreshEvent = !state.refreshEvent
    }
  }
}
