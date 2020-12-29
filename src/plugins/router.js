import Vue from 'vue'
import Router from 'vue-router'

import Login from '../views/Login'
import Geral from '../views/geral'
import Money from '../views/money'
import Card from '../views/card'
import Settings from '../views/settings.vue'
import Register from '../views/register'

Vue.use(Router)

const router = new Router({
    mode: 'history',
    routes: [
    {
        path:'*',
        redirect:'/login'
    },{
        path:'/',
        redirect:'/login'
    },
    {
        path:'/login',
        component:Login
    },{
        path: '/register',
        component: Register
    },{
        path:'/geral',
        component: Geral,
        meta:{
            requiresAuth:true
        }
    },{
        path:'/money',
        component: Money,
        meta:{
            requiresAuth:true
        }
    },{
        path:'/card',
        component: Card,
        meta:{
            requiresAuth:true
        }
    },{
        path: '/settings',
        component: Settings,
        meta:{
            requiresAuth:true
        }
    }
]
})

export default router
