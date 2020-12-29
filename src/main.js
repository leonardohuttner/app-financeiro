import Vue from 'vue'
import App from './App.vue'
import router from './plugins/router'
import './quasar'
import store from './plugins/store'
import './plugins/axios'


Vue.config.productionTip = false

    new Vue({
      router,
      store,
      render: h => h(App),
    }).$mount('#app')
