<template>
<div class="fundo justify-center row items-center" :style="`height:${sizes()}px;`">
    <title>Entre</title>
    <q-card class=" card no-margin no-padding" style="height:320px;">
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
import serviceUser from '../services/usuario'
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
            if(sessionStorage.getItem('funcionalidades')){
                const funcionalidades = sessionStorage.getItem('funcionalidades')
                console.table(funcionalidades)
                // this.$store.commit('SALVA_ESTADO_FUNCIONALIDADE',funcionalidades)
            }
            this.$router.push('/geral')
        }
    },
    methods:{
    async login() {
        try{
            await serviceUser.login(this.email,this.senha)
        }catch(err){
            console.log(err)
        }
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
    height: 90px;
}
.fundo{
    background-image: url("/../assets/money.jpg");
    height: 30em;

}
</style>