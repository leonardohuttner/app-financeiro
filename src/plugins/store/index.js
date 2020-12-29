import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        User:{
            _id:'',
            displayName:'',
            email:'',
            logado:false,
            list:[],
            token:''
        },
    },
    mutations:{
        ADD_EXPENSE(state,obj){
            state.User.list.push({
                    _id: obj._id || '',
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
            state.User._id = obj.user._id
            state.User.displayName = obj.user.userName
            state.User.email= obj.user.email
            state.User.logado = true
            state.User.token= obj.token
        }
    },
    actions:{
        carregaDados(){
        }
    },
    getters:{
        listCompleta: state => {return state.User.list},
        userLogado: state =>{ return state.User.uid }
    }
})