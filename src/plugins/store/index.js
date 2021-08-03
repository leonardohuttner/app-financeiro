import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        usuario:{
            id_usuario:'',
            nome:'',
            email:'',
            isAdmin:0,
            logado:false,
            lancamentos:[],
            token:''
        },
        Config:{
            salario:'',
            wallet:[],
            categories:[]
        },
        funcionalidade:{
            painel_admin: 0,
            menu_geral: 0,
            menu_cartao: 0,
            menu_configuracao: 0,
            menu_dinheiro: 0
        }
    },
    mutations:{
    ADD_EXPENSE(state,obj){
            state.usuario.lancamentos.push({
                    id_lancamento: obj.id_lancamento,
                    descricao_lanc: obj.descricao_lanc,
                    valor_lanc: obj.valor_lanc,
                    data_lanc: obj.data_lanc,
                    forma_pag: obj.forma_pag,
                    tipo_lancamento: obj.tipo_lancamento,
                    categoria_lanc: obj.categoria_lanc,
                    cartao: obj.cartao
                })
    },
    LOGIN(state,obj){
            state.usuario.id_usuario = obj.id_usuario
            state.usuario.nome = obj.nome
            state.usuario.email= obj.email
            state.usuario.logado = true
            state.usuario.token= obj.token
            state.usuario.isAdmin = obj.isAdmin
    },
    COMPLETADADOS(state,obj){
        state.usuario.lancamentos = obj
    },
    CARREGACONFIG(state,obj){
        state.Config.wallet = obj.wallet
        state.Config.categories = obj.categories
        state.Config.salario = obj.salario
    },
    LIMPA(state){
            state.usuario.id_usuario = ''
            state.usuario.nome = ''
            state.usuario.email= ''
            state.usuario.logado = false
            state.usuario.token= ''
            state.usuario.createdAt= ''
            state.usuario.list=[]
            state.Config.salario=''
            state.Config.wallet=[]
            state.Config.categories=[]
    },
    SALVA_ESTADO_FUNCIONALIDADE(state,array){
        array.map(funcionalidade => {
            if(funcionalidade.nome === 'painel') state.funcionalidade.painel_admin = funcionalidade.valor
            else if(funcionalidade.nome === 'geral') state.funcionalidade.menu_geral = funcionalidade.valor
            else if(funcionalidade.nome === 'cartao') state.funcionalidade.menu_cartao = funcionalidade.valor
            else if(funcionalidade.nome === 'dinheiro') state.funcionalidade.menu_dinheiro = funcionalidade.valor
            else if(funcionalidade.nome === 'configuracoes') state.funcionalidade.menu_configuracao = funcionalidade.valor
        })   
    }
},
    actions:{
        carregaDados(){
        }
    },
    getters:{
        carregaConfig: state=> {return state.Config},
        getSalario: state=> {return state.Config.salario},
        listaCompleta: state => {return state.usuario.lancamentos},
        tokenUser: state =>{ return state.usuario.token },
        idUser: state => {return state.usuario.id_usuario},
        logado: state => {return state.usuario.logado},
        isAdmin: state => {return state.usuario.isAdmin},
        getNome: state => { return state.usuario.nome},
        permissao_painel: state => { return state.funcionalidade.painel_admin},
        permissao_cartao: state => { return state.funcionalidade.menu_cartao},
        permissao_geral: state => { return state.funcionalidade.menu_geral},
        permissao_dinheiro: state => { return state.funcionalidade.menu_dinheiro},
        permissao_configuracao: state => { return state.funcionalidade.menu_configuracao},
    }
})