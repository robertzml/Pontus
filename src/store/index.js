import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import getters from './getters'
import mutations from './mutations'
import actions from './actions'
import stockIn from './modules/stockIn'
import stockOut from './modules/stockOut'
import store from './modules/store'

Vue.use(Vuex)

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
  modules: {
    stockIn,
    stockOut,
    store
  }
})
