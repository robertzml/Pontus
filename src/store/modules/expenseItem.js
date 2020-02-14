// 计费项目管理模块

export default {
  namespaced: true,
  state: {
    // 计费项目管理显示页面
    tab: 'ExpenseItemList',

    // 当前计费项目ID
    itemId: 0,

    // 刷新事件
    refreshEvent: false
  },

  actions: {
    // 显示计费项目信息页面
    showDetails(context, id) {
      context.commit('setTab', 'ExpenseItemDetails')
      context.commit('setExpenseItemId', id)
    },

    // 显示计费项目列表页面
    showList({ commit }) {
      commit('setTab', 'ExpenseItemList')
    }
  },

  mutations: {
    // 设置显示页面
    setTab: (state, tab) => {
      state.tab = tab
    },

    // 设置计费项目对象
    setExpenseItemId: (state, val) => {
      state.itemId = val
    },

    // 刷新操作
    refresh: state => {
      state.refreshEvent = !state.refreshEvent
    }
  }
}
