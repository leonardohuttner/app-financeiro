import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        User:{
            uid:'',
            displayName:'',
            email:'',
            list:[
            ],
        },
    },
    mutations:{
        ADD_EXPENSE(state,obj){
            state.User.list.unshift(obj)
        },
        LOGIN(state,obj){
            state.User.uid = obj.uid
            state.User.displayName = obj.displayName
            state.User.email= obj.email
        }
    },
    actions:{
    }
})