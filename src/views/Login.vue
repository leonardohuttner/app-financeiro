<template>
<div class="fundo justify-center row items-center" :style="`height:${sizes()}px;`">
    <title>Entre</title>
    <q-card class=" card q-mt-sm" style="max-width:600px;">
        <h3 class="q-mt-sm">Entrar</h3>
        <q-input class="q-ma-sm" v-model="email" label="Email:" autofocus style="weight:200px" :style="this.$q.platform.is.ios ? 'font-size:17px' : ''" />
        <q-input class="q-ma-sm" type="password" v-model="senha" label="Senha:" @keypress.enter="login" style="weight:200px" :style="this.$q.platform.is.ios ? 'font-size:17px' : ''" />
        <q-item-section>
        <q-btn color="secondary"  @click="login" class="q-ma-xs">Login</q-btn>
        <q-btn color="primary" class="q-ma-xs" to="/register">Cadastre-se agora mesmo</q-btn>
        </q-item-section>
    </q-card>
</div>
</template>

<script>
import mixins from '../mixins/mixins'

export default {
    mixins:[
        mixins
    ],
    data() {
        return {
                usuario:{},
                email: '',
                senha: '',
        }
    },
    created(){
        if(sessionStorage.getItem('usuario')){
            const usuario = sessionStorage.getItem('usuario')
            this.$store.commit('LOGIN',usuario)
            this.$router.push('/geral')
        }
    },
    methods:{
    login() {
            const email = this.email
            const senha = this.senha
            this.$http.post('/usuarios/login',{email,senha},{headers: {
            'Content-Type': 'application/json'}
        })
            .then(async (res)=>{
                const usuario = res.data.usuario
                this.$store.commit('LOGIN',usuario)
                await this.carregaDados()
                //await this.carregaConfig(idUser)
                await this.sessaoUser(usuario)
                this.$router.push('/geral')
            }).catch((err)=>{
                console.log(err)
            })
    },
    
    carregaDados(){
          const token = this.$store.getters.tokenUser
          const id_usuario = this.$store.getters.idUser
          this.$http.get(`/lancamentos/${id_usuario}`,{headers:{'auth':`${token}`}})
          .then((res)=>{
              const despesas = res.data
              this.$store.commit('COMPLETADADOS',despesas)
              sessionStorage.setItem('despesas',JSON.stringify(despesas))
          }).catch((err)=>{
              console.log(err)
          })
      },
    //   carregaConfig(id_usuario){
    //     const token = this.$store.getters.tokenUser
    //     this.$http.get(`/config/${id_usuario}`,{headers:{'auth':`${token}`}})
    //     .then((res)=>{
    //         const config = res.data
    //         sessionStorage.setItem('config',JSON.stringify(config))
    //         this.$store.commit('CARREGACONFIG',config)
    //     }).catch((err)=>{
    //         console.log(err)
    //     })
    //   },
    sessaoUser(user){
              const usuarioAtual = JSON.stringify(user)
              sessionStorage.setItem('usuario',usuarioAtual)
      },
    sizes(){
        return document.documentElement.clientHeight
        },
    logado(){
            return this.$store.getters.tokenUser
        }
    },
}
</script>

<style>
.card{
    width: 90%;
    margin-bottom: 20%;
}
.fundo{
    background-image: url("/../assets/money.jpg");
    height: 30em;

}
</style>