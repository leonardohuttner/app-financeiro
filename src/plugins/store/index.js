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
        Config:{
            salario:'',
            wallet:[],
            categories:[
                {nome:'Alimentação'},
                {nome:'Compras'},
                {nome:'Salario'},
                {nome:'Investimentos'}
            ]
        }
    },
    mutations:{
    ADD_EXPENSE(state,obj){
            state.User.list.push({
                    _id: obj._id,
                    amount: obj.amount,
                    description: obj.description,
                    data: obj.data,
                    form: obj.form,
                    recept: obj.recept,
                    card: obj.card,
                    receita_tipo: obj.type
                })
    },
    LOGIN(state,obj){
            state.User._id = obj.user._id
            state.User.displayName = obj.user.userName
            state.User.email= obj.user.email
            state.User.logado = true
            state.User.token= obj.token
            state.User.createdAt= obj.user.created
    },
    COMPLETADADOS(state,lista){
        state.User.list = lista
    },
    LIMPA(state){
            state.User._id = ''
            state.User.displayName = ''
            state.User.email= ''
            state.User.logado = false
            state.User.token= ''
            state.User.createdAt= ''
            state.User.list=[]
            state.Config.salario=''
    },
    SETCONFIG(state,obj){
        state.Config.salario = obj.salario
        state.Config.wallet = obj.wallet
        state.Config.categories = obj.categories
    }
},
    actions:{
        carregaDados(){
        }
    },
    getters:{
        listCompleta: state => {return state.User.list},
        tokenUser: state =>{ return state.User.token },
        idUser: state => {return state.User._id},
        logado: state => {return state.User.logado}
    }
})