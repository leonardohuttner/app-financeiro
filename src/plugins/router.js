import Vue from 'vue'
import Router from 'vue-router'
import Store from '../plugins/store/index'

import Login from '../views/Login'
import Geral from '../views/geral'
import Money from '../views/money'
import Card from '../views/card'
import Settings from '../views/settings.vue'
import Register from '../views/register'
import Panel from '../views/panel'
import notFound from '../views/404'

Vue.use(Router)

const router = new Router({
    mode: 'history',
    routes: [
    {
        path:'*',
        component: notFound
    },{
        path:'/',
        redirect:'/login'
    },
    {
        path:'/login',
        component: Login
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
    },{
        path: '/panel',
        component: Panel,
        meta:{
            requiresAuth:true
        }
    }
]
})

router.beforeEach((to,from,next)=> {
    const currentUser = Store.getters.logado
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth)

    if(requiresAuth && !currentUser) next('/login');
    else if(!requiresAuth && currentUser) next('/')
    else next();
})

export default router
