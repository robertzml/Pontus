//import moment from 'moment'
import util from './util'

const filters = Vue => {
  // 实体状态
  Vue.filter('displayStatus', function(val) {
    return util.entityStatus(val)
  })

  Vue.filter('displayDateTime', function(date) {
    return util.displayDateTime(date)
  })

  Vue.filter('displayDate', function(date) {
    return util.displayDate(date)
  })

  Vue.filter('customerType', function(val) {
    return util.customerType(val)
  })

  Vue.filter('warehouseType', function(val) {
    return util.warehouseType(val)
  })

  Vue.filter('shelfType', function(val) {
    return util.shelfType(val)
  })
}

export default filters
