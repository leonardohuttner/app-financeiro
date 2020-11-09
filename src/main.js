import Vue from 'vue'
import App from './App.vue'
import router from './plugins/router'
import './quasar'
import store from './plugins/store'
//import VueTheMask from 'vue-the-mask-mask'
Vue.config.productionTip = false
//Vue.use(VueTheMask)

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
