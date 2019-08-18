const filters = Vue => {
  Vue.filter('status', function(val) {
    if (val == undefined || val == null) {
      return ''
    }

    switch (val) {
      case 0:
        return '正常'
      default:
        return '未知'
    }
  })
}

export default filters
