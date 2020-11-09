import Vue from 'vue'
import Router from 'vue-router'

import Login from '../components/login/Login.vue'
import Geral from '../components/geral'
import Money from '../components/money'
import Card from '../components/card'
import Settings from '../components/settings.vue'


Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [{
        path:'/login',
        component:Login
    },{
        path:'/geral',
        component: Geral
    },{
        path:'/money',
        component: Money
    },{
        path:'/card',
        component: Card
    },{
        path: '/settings',
        component: Settings
    }
]
})