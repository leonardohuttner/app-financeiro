import Vue from 'vue'
import App from './App.vue'
import router from './plugins/router'
import store from './plugins/store'
import moment from 'moment'

import VueApexCharts from 'vue-apexcharts'
Vue.component('apexchart', VueApexCharts)

import './quasar'
import './plugins/axios'


Vue.config.productionTip = false

    new Vue({
      router,
      store,
      moment,
      render: h => h(App),
    }).$mount('#app')
