import Vue from 'vue'
import Router from 'vue-router'
import firebase from 'firebase'

import Login from '../components/login/Login.vue'
import Geral from '../components/geral'
import Money from '../components/money'
import Card from '../components/card'
import Settings from '../components/settings.vue'
import Register from '../components/registrar/register'

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
    router.beforeEach((to,from,next)=>{
        const currentUser = firebase.auth().currentUser
        const requiresAuth = to.matched.some(record=>record.meta.requiresAuth)

        if(requiresAuth && !currentUser) next('login')
        else if (!requiresAuth && currentUser) next('geral')
        else next()
    })

export default router
