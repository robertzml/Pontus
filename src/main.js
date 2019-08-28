import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'
import vuetify from './plugins/vuetify'
import filters from './plugins/filters'
import dict from './plugins/dict'
import util from './plugins/util'

Vue.prototype.$dict = dict
Vue.prototype.$util = util

filters(Vue)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
