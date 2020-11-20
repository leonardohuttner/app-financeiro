import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        User:{
            uid:'',
            displayName:'',
            email:'',
            list:[],
        },
    },
    mutations:{
        ADD_EXPENSE(state,obj){
            state.User.list.push({
                    amount: obj.amount,
                    description: obj.description,
                    data: obj.data,
                    forma: obj.forma,
                    receita: obj.receita,
                    card: obj.card,
                    receita_tipo: obj.receita_tipo
            })
        },
        LOGIN(state,obj){
            state.User.uid = obj.uid
            state.User.displayName = obj.displayName
            state.User.email= obj.email
        }
    },
    actions:{
    },
    getters:{
        listCompleta: state => {return state.User.list}
    }
})