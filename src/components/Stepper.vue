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
    <registraUsuario v-on:newuser="proximo()"/>
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
          <q-btn @click="gravaDadosSecao()" color="primary" label="Salvar" v-else-if="step===2" />
          <q-btn color="purple"  to="/login" class="q-ma-xs">Retornar ao Login</q-btn>
          <q-btn v-if="step > 1" flat color="primary" @click="$refs.stepper.previous()" label="Back" class="q-ml-sm" />
        </q-stepper-navigation>
    </template>
  </q-stepper>
</template>

<script>
import registraUsuario from "../components/registrar/register"
//import Financeiro from "../components/registrar/financeiro"


export default {
    data(){
        return{
            step:1,
            config:{
                salario:'',
                wallet:["Dinheiro","Cartão de credito 1"],
                categories:["Alimentação","Boletos","Casa"]
            }
        }
    },
    components: {
        registraUsuario
    },
    methods:{
        proximo(){
            return this.$refs.stepper.next()
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
}

</script>

<style>

</style>