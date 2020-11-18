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
import firebase from 'firebase'
// import {Notify} from 'quasar'
export default {
    data() {
        return {
                email: '',
                senha: '',
        }
    },
    computed:{
    },
    methods:{
        login() {
            firebase.auth().signInWithEmailAndPassword(this.email,this.senha).then(
                (user)=>{
                    console.log(user)
                    this.$router.replace("geral")
                },
                (err)=>{
                    alert('Ocorreu um erro '+err.message)
                }
            )
      },
      sizes(){
        return document.documentElement.clientHeight
        },
    },
}
</script>

<style>
.card{
    width: 90%;
    margin-bottom: 20%;
}
.fundo{
    background-image: url("../../assets/money.jpg");
    height: 30em;

}
</style>