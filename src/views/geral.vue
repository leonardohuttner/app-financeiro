<template>
<q-card class="container">
    <h4 style="font-size: 1.8rem;">Bem vindo {{this.$store.getters.getNome}}</h4>
    <Lista :expenses="this.listCompleta()" />
    <DialogAdd />
</q-card>
</template>

<script>
import Lista from '../components/Lista'
import DialogAdd from '../components/adicionar/modalAdd'
import mixins from '../mixins/mixins'

export default {
    mixins: [mixins],
    data() {
        return {
            input:'',
            abreForm: true,
        }
    },
    created(){
        if(sessionStorage.length >= 2){
            const usuarioAtual = JSON.parse(sessionStorage.getItem('usuario'))
            const despesas = JSON.parse(sessionStorage.getItem('despesas'))
            //const config = JSON.parse(sessionStorage.getItem('config'))
            this.$store.commit('LOGIN',usuarioAtual)
            this.$store.commit('COMPLETADADOS',despesas)
            //this.$store.commit('CARREGACONFIG',config)
        }
    },
    methods: {
        listCompleta() {
            return this.$store.getters.listaCompleta 
        },
        logado(){
            return console.log(this.$store.getters.tokenUser)
        }
    },
    components: {
        Lista,
        DialogAdd
    }
}
</script>

<style>
* {
    margin-top: 0px;
    font-size: 16px;
}
h4 {
    margin: 0;
    font-family: 'roboto', sans-serif;
    text-align: left !important;
}
</style>
