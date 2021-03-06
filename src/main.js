import Vue from 'vue'
import App from './App.vue'
import moment from 'moment'
import router from './router'
import store from './store/index'
import vuetify from './plugins/vuetify'
import filters from './plugins/filters'
import dict from './plugins/dict'
import util from './plugins/util'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'

Vue.prototype.$moment = moment
Vue.prototype.$dict = dict
Vue.prototype.$util = util

filters(Vue)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App)
}).$mount('#app')
