import Vue from 'vue'
import App from './App.vue'
import router from './plugins/router'
import store from './plugins/store'
import moment from 'moment'
import apexcharts from 'vue-apexcharts'

import './quasar'
import './plugins/axios'

Vue.use(apexcharts)
Vue.config.productionTip = false

    new Vue({
      router,
      store,
      moment,
      apexcharts,
      render: h => h(App),
    }).$mount('#app')
