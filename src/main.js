import Vue from 'vue'
import App from './App.vue'
import moment from 'moment'
import router from './router'
import store from './store/index'
import vuetify from './plugins/vuetify'
import filters from './plugins/filters'
import dict from './plugins/dict'
import util from './plugins/util'

Vue.prototype.$moment = moment
Vue.prototype.$dict = dict
Vue.prototype.$util = util

filters(Vue)

Vue.directive('focus', {
  // 当被绑定的元素插入到 DOM 中时……
  inserted: function(el) {
    // 聚焦元素
    el.focus()
  }
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
