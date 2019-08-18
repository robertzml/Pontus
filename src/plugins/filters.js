//import moment from 'moment'
import util from './util'

const filters = Vue => {
  // 实体状态
  Vue.filter('displayStatus', function(val) {
    if (val == undefined || val == null) {
      return ''
    }

    switch (val) {
      case 0:
        return '正常'
      case 1:
        return '删除'
      case 2:
        return '禁用'
      default:
        return '未知'
    }
  })

  Vue.filter('displayDateTime', function(date) {
    return util.displayDateTime(date)
  })

  Vue.filter('displayDate', function(date) {
    return util.displayDate(date)
  })
}

export default filters
