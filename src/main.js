import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'
import vuetify from './plugins/vuetify'
import axios from 'axios'

Vue.prototype.$axios = axios
axios.defaults.baseURL = 'https://localhost:44328/api'
Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
