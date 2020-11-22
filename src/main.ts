import Vue from 'vue'
import VueCompositionAPI from '@vue/composition-api'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import util from './plugins/util'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import '@mdi/font/css/materialdesignicons.css'

Vue.config.productionTip = false
Vue.use(VueCompositionAPI)

Vue.prototype.$util = util

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App)
}).$mount('#app')
