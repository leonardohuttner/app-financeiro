<template>
<div class="justify-center row items-center">
    <q-card class="full-width q-pa-md" style="margin-bottom:5px">
        <h4 style="margin-top:5px">Cadastre-se</h4>

        <q-input
            class="q-ma-sm"
            v-model="user.nome"
            label="*Nome:"
            style="weight:200px"
            autofocus 
            filled
            :rules="[val => !!val || 'Campo Obrigatorio*']"
            :style="this.$q.platform.is.ios ? 'font-size:17px' : ''"
        />

        <q-input
            class="q-ma-sm"
            v-model="user.email"
            label="*Email:"
            style="weight:200px"
            filled
            :rules="[val => !!val || 'Campo Obrigatorio*']"
            :style="this.$q.platform.is.ios ? 'font-size:17px' : ''"
        />
        <q-input
            class="q-ma-sm"
            @keypress.enter="signUp"
            type="password"
            v-model="user.senha"
            label="Senha:"
            filled
            style="weight:200px"
            :style="this.$q.platform.is.ios ? 'font-size:17px' : ''"
        />
        <q-input 
            class="q-ma-sm"
            @keypress.enter="signUp"
            type="password"
            v-model="confirmaSenha"
            label="Repita a senha:"
            filled
            style="weight:200px"
            :rules="[val => (val === this.user.senha) || 'Senha não confere']"
            :style="this.$q.platform.is.ios ? 'font-size:17px' : ''" 
            />
            <p><strong>*</strong>Campos obrigatórios.</p>
            <q-btn @click="signUp()" color="blue">Salvar</q-btn>
        </q-card>
</div>
</template>

<script>

export default {
    data() {
        return {
        confirmaSenha:'',
        user:{
            nome:'',
            email:'',
            senha:''
            }
        };
    },
    methods:{
    signUp() {
        const email = this.user.email
        const senha = this.user.senha
        const nome = this.user.nome

        if(!email || !senha || !nome) {
            this.$q.notify({
                color:'red',
                message:'Revise o campos!',
                title:'Erro!',
                position:'top-right'
            })
        }else{
        this.$http.post('/usuarios/cadastro/',{email,senha,nome},{headers: {
        'Content-Type': 'application/json'}})
        .then((res)=>{
            const usuario = res.data
            this.$store.commit('LOGIN',usuario)
            this.$emit('newuser')
            this.$q.notify({
                color:'green',
                message:'Usuario criado com sucesso',
                title:"Sucesso!",
                position:'top-right'
                })
            })
        .catch((err)=>{
            console.log('Erro log: '+err.message)
            this.$q.notify({
                color:'red',
                message:err.message=== 'Request failed with status code 400' ? 'Usuario já existente' : err.message,
                position:'top-right'
            })
            })
        }
    },
    gravaDadosSecao(){
        const token = this.$store.getters.tokenUser
        const idUser = this.$store.getters.idUser
        this.$store.commit('CARREGACONFIG',this.config)
        this.$http.post('/config',{'user':`${idUser}`,'configs': this.config},{headers:{'auth':`${token}`,'user':`${idUser}`}})
        .then(async(res)=>{
            console.log(res)
        }).catch((err)=>{
            console.log(err)
        })
        this.$q.notify({
                color:'green',
                message:`Dados salvos!`,
                position:'top-right'
            })
        }
    },
}
</script>

<style>

</style>