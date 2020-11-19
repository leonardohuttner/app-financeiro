<template>
<div class="fundo justify-center row items-center" :style="`height:${sizes()-10}px;`">
    <title>Registrar</title>
    <q-card class=" card q-mt-sm" style="max-width:600px;">
        <h4>Registre-se</h4>
        <q-input class="q-ma-sm" v-model="email" label="Email:" autofocus filled style="weight:200px" :style="this.$q.platform.is.ios ? 'font-size:17px' : ''" />
        <q-input class="q-ma-sm" @keypress.enter="signUp" type="password" v-model="senha" label="Senha:" filled style="weight:200px" :style="this.$q.platform.is.ios ? 'font-size:17px' : ''" />
        <q-item-section>
        <q-btn color="secondary"  @click="signUp" class="q-ma-xs">Salvar</q-btn>
        <q-btn color="primary"  to="/login" class="q-ma-xs">Retornar ao Login</q-btn>
        </q-item-section>
    </q-card>
</div>
</template>

<script>
import firebase from 'firebase'
export default {
    data() {
        return {
                email: '',
                senha: '',
        };
    },
    methods:{
        signUp() {
        firebase.auth().createUserWithEmailAndPassword(this.email,this.senha).then(
            (user)=>{
                console.log(user)
        this.$router.replace("geral")
            },
            (err)=>{
                alert('Aconteceu algo inexperado.'+ err.message)
            }
        )
      },
      sizes(){
        return document.documentElement.clientHeight
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
    background-image: url("../assets/money.jpg");
    height: 30em;

}
</style>