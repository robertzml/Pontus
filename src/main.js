import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import widgets from "./widgets";

import "devextreme/dist/css/dx.common.css";
import "devextreme/dist/css/dx.material.orange.dark.compact.css";

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  widgets,
  render: h => h(App)
}).$mount("#app");
