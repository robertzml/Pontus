import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import getters from './getters'
import mutations from './mutations'
import actions from './actions'
import customer from './modules/customer'
import contract from './modules/contract'
import warehouse from './modules/warehouse'
import stockIn from './modules/stockIn'
import stockOut from './modules/stockOut'
import carryIn from './modules/carryIn'
import carryOut from './modules/carryOut'
import receipt from './modules/receipt'
import store from './modules/store'
import normalStore from './modules/normalStore'
import storePosition from './modules/storePosition'
import expenseItem from './modules/expenseItem'
import settlement from './modules/settlement'
import payment from './modules/payment'

Vue.use(Vuex)

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
  modules: {
    customer,
    contract,
    warehouse,
    stockIn,
    stockOut,
    carryIn,
    carryOut,
    receipt,
    store,
    normalStore,
    storePosition,
    expenseItem,
    settlement,
    payment
  }
})
