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
// import {Notify} from 'quasar'
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
    computed:{
    },
    methods:{
        login() {
            const email = this.email
            const password = this.senha
            this.$http.post('/users/auth',{email,password},{headers: {
            'Content-Type': 'application/json'}
        })
            .then(async (res)=>{
                const usuario = res
                const idUser = usuario.data.user._id
                console.log(idUser)
                this.$store.commit('LOGIN',usuario.data)
                await this.carregaDados(idUser)
                await this.sessaoUser(usuario.data)
                this.$router.push('/geral')
            }).catch((err)=>{
                console.log(err)
            })
      },
      carregaDados(idUser){
          const token = this.$store.getters.userLogado
          this.$http.get('/',{headers:{'auth':`${token}`,'user':`${idUser}`}})
          .then((res)=>{
              const despesas = res.data
              this.$store.commit('COMPLETADADOS',despesas)
              sessionStorage.setItem('despesas',JSON.stringify(despesas))
          }).catch((err)=>{
              console.log(err)
          })
      },
      sessaoUser(user){
              const usuarioAtual = JSON.stringify(user)
              sessionStorage.setItem('usuario',usuarioAtual)
      },
        sizes(){
        return document.documentElement.clientHeight
        },
        logado(){
            return this.$store.getters.userLogado
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