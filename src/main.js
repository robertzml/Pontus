import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'
import vuetify from './plugins/vuetify'
import axios from 'axios'

Vue.prototype.$axios = axios
axios.defaults.baseURL = 'https://localhost:44328/api'
axios.defaults.withCredentials = false // 允许跨域 cookie
axios.defaults.headers = {
  'Content-Type': 'application/json'
}
Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
