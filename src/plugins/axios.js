import Vue from 'vue'
import axios from 'axios'

axios.defaults.baseURL = 'http://192.168.100.24:3000/api'
Vue.use({
    install(Vue) {
        Vue.prototype.$http = axios
    }
})