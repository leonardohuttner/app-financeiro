<template>
  <q-stepper
    v-model="step"
    ref="stepper"
    color="primary"
    animated
  >
    <q-step
        :name="1"
        title="Dados cadastrais"
        icon="person"
        :done="step > 1"
    >
        <q-card class="full-width q-pa-md" style="margin-bottom:5px">
            <h4 style="margin-top:5px">Registre-se</h4>

            <q-input
                class="q-ma-sm"
                v-model="user.username"
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
                label="Senha:"
                filled
                style="weight:200px"
                :rules="[val => (val === this.user.senha) || 'Senha não confere']"
                :style="this.$q.platform.is.ios ? 'font-size:17px' : ''" 
                />
                <p><strong>*</strong>Campos obrigatórios.</p>
        </q-card>
    </q-step>

    <q-step
        :name="2"
        title="Dados financeiros"
        icon="person"
        :done="step > 2"
    >
        <q-card class="full-width q-pa-md" style="margin-bottom:5px">
            <h4 style="margin-top:5px">Dados financeiros:</h4>

            <q-input
                class="q-ma-sm"
                v-model="config.salario"
                label="Salario:"
                style="weight:200px"
                filled
                :style="this.$q.platform.is.ios ? 'font-size:17px' : ''"
            />
            
            <q-select
                label="Categorias:"
                filled
                class="q-ma-sm"
                style="weight:200px"
                v-model="config.categories"
                use-input
                use-chips
                multiple
                hide-dropdown-icon
                input-debounce="0"
                @new-value="createValue"
                :style="this.$q.platform.is.ios ? 'font-size:17px' : ''"
            />
            
            <q-select
                label="Digite suas formas de pagamento:"
                filled
                style="weight:200px"
                class="q-ma-sm"
                v-model="config.wallet"
                use-input
                use-chips
                multiple
                hide-dropdown-icon
                input-debounce="0"
                @new-value="createValue"
                :style="this.$q.platform.is.ios ? 'font-size:17px' : ''"
    />
        </q-card>
    </q-step>

    <q-step
        :name="3"
        title="Finalizado"
        icon="done"
        :done="step > 3"
    >
        <q-card>Cadastro Finalizado.</q-card>
    </q-step>
    <template v-slot:navigation>
        <q-stepper-navigation>
          <q-btn @click="signUp()" color="primary" label="Criar" v-if="step===1" />
          <q-btn @click="$refs.stepper.next(),gravaDadosSecao()" color="primary" label="Salvar" v-else-if="step===2" />
          <q-btn color="secondary"  to="/login" class="q-ma-xs">Retornar ao Login</q-btn>
          <q-btn v-if="step > 1" flat color="primary" @click="$refs.stepper.previous()" label="Back" class="q-ml-sm" />
        </q-stepper-navigation>
    </template>
  </q-stepper>
</template>

<script>
//import Register from "../components/registrar/register"
//import Financeiro from "../components/registrar/financeiro"


export default {
    data(){
        return{
            step:2,
            confirmaSenha:'',
            user:{
                username:'',
                email:'',
                password:'',
            },
            config:{
                salario:'',
                wallet:["Dinheiro","Cartão de credito 1"],
                categories:["Alimentação","Boletos","Casa"]
            }
        }
    },
    // components: {
    //     Register,Financeiro
    // },
    methods:{
        signUp() {
            const email = this.user.email
            const password = this.user.senha
            const username = this.user.username

            if(!email || !password || !username) {
                this.$q.notify({
                    color:'red',
                    message:'Revise o campos!',
                    title:'Erro!',
                    position:'top-right'
                })
            }else{
            this.$http.post('/users/create/',{email,password,username},{headers: {
            'Content-Type': 'application/json'}})
            .then((res,err)=>{
                const usuario = res.data
                this.$refs.stepper.next()
                console.log(err)
                this.$q.notify({
                    color:'green',
                    message:usuario.message,
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
            this.$store.commit('SETCONFIG',this.config)
            this.$q.notify({
                    color:'green',
                    message:`Dados salvos!`,
                    position:'top-right'
                })
            }
        },
        createValue (val, done) {
        // specific logic to eventually call done(...) -- or not
            done(val, 'add-unique')
        // done callback has two optional parameters:
        //  - the value to be added
        //  - the behavior (same values of new-value-mode prop,
        //    and when it is specified it overrides that prop –
        //    if it is used); default behavior (if not using
        //    new-value-mode) is to add the value even if it would
        //    be a duplicate
    }
  }


</script>

<style>

</style>