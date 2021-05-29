//import moment from 'moment'
import util from './util'
import store from '../store/index'

const filters = (Vue) => {
  // 实体状态
  Vue.filter('displayStatus', function (val) {
    return store.getters.entityStatus(val)
  })

  Vue.filter('displayDateTime', function (date) {
    return util.displayDateTime(date)
  })

  Vue.filter('displayDate', function (date) {
    return util.displayDate(date)
  })

  Vue.filter('displayBoolean1', function (val) {
    if (val == null || val == undefined) {
      return ''
    }

    return val ? '是' : '否'
  })

  Vue.filter('userGroupName', function (val) {
    return util.userGroupName(val)
  })

  Vue.filter('customerType', function (val) {
    return util.customerType(val)
  })

  Vue.filter('contractType', function (val) {
    return util.contractType(val)
  })

  Vue.filter('billingType', function (val) {
    return util.billingType(val)
  })

  Vue.filter('expenseItemType', function (val) {
    return util.expenseItemType(val)
  })

  Vue.filter('warehouseType', function (val) {
    return util.warehouseType(val)
  })

  Vue.filter('shelfType', function (val) {
    return util.shelfType(val)
  })

  Vue.filter('carryInTaskType', function (val) {
    return util.carryInTaskType(val)
  })

  Vue.filter('carryOutTaskType', function (val) {
    return util.carryOutTaskType(val)
  })

  Vue.filter('flowType', function (val) {
    return util.flowType(val)
  })

  Vue.filter('paidType', function (val) {
    return util.paidType(val)
  })

  Vue.filter('iceType', function (val) {
    return util.iceType(val)
  })

  Vue.filter('iceStockType', function (val) {
    return util.iceStockType(val)
  })
}

export default filters
