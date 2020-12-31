import Vue from 'vue'
import axios from 'axios'

axios.defaults.baseURL = 'http://192.168.100.6:3000'
Vue.use({
    install(Vue) {
        Vue.prototype.$http = axios
    }
})