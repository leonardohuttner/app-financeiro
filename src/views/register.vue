<template>
<div class="fundo justify-center row items-center" :style="`height:${sizes()-10}px;`">
    <title>Registrar</title>
    <q-card class=" card q-mt-sm" style="max-width:600px;">
        <h4>Registre-se</h4>
        <q-input class="q-ma-sm" v-model="userName" label="UserName:" autofocus filled style="weight:200px" :style="this.$q.platform.is.ios ? 'font-size:17px' : ''" />
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
export default {
    data() {
        return {
                email: '',
                senha: '',
                userName:'',
        };
    },
    methods:{
        signUp() {
            const email = this.email
            const password = this.senha
            const userName = this.userName
            this.$http.post('/users/create',{email,password,userName},{headers: {
            'Content-Type': 'application/json'}
        })
            .then((res)=>{
                const usuario = res
                console.log(usuario)
            }).catch((err)=>{
                console.log(err)
            })
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