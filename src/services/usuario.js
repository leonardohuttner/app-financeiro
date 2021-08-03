import axios from "axios"
import store from "../plugins/store"
import router from "../plugins/router"

function login(email,senha){
    axios.post('/usuarios/login',{email,senha},{headers: {
    'Content-Type': 'application/json'}
})
    .then(async (res)=>{
        const usuario = res.data.usuario
        store.commit('LOGIN',usuario)
        await this.carregaDados()
        await this.sessaoUser(usuario)
        await this.getFuncionalidades()
        //await this.carregaConfig(idUser)
        router.push('/geral')
    }).catch((err)=>{
        console.log(err)
    })
}

function carregaDados(){
    const token = store.getters.tokenUser
    const id_usuario = store.getters.idUser
    axios.get(`/lancamentos/${id_usuario}`,{headers:{'auth':`${token}`}})
    .then((res)=>{
        const despesas = res.data
        store.commit('COMPLETADADOS',despesas)
        sessionStorage.setItem('despesas',JSON.stringify(despesas))
    }).catch((err)=>{
        console.log(err)
    })
}
function sessaoUser(user){
    const usuarioAtual = JSON.stringify(user)
    sessionStorage.setItem('usuario',usuarioAtual)
}
function getFuncionalidades(){
    axios.get('/funcionalidade')
        .then(res => {
            const funcionalidades = res.data
            store.commit('SALVA_ESTADO_FUNCIONALIDADE',funcionalidades)
            sessionStorage.setItem('funcionalidades',JSON.stringify(funcionalidades))
        })
}

function logout(){
    store.commit('LIMPA')
            sessionStorage.removeItem('usuario')
            sessionStorage.removeItem('despesas')
            sessionStorage.removeItem('funcionalidades')
            //sessionStorage.removeItem('config')
            router.push('/login')
}

export default { login,carregaDados,sessaoUser, getFuncionalidades, logout }