<template>
<q-card>
    <h5>Configurações</h5>
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
    <div>
    <q-btn color="primary" label="Salvar" />
    </div>
</q-card>
</template>

<script>
export default {
    data(){
        return {
            config:{
                salario:'',
                wallet:[],
                categories:[]
            }
        }
    },
    created(){
    if(sessionStorage.length >= 2){
            const usuarioAtual = JSON.parse(sessionStorage.getItem('usuario'))
            const despesas = JSON.parse(sessionStorage.getItem('despesas'))
            const config = JSON.parse(sessionStorage.getItem('config'))
            this.$store.commit('LOGIN',usuarioAtual)
            this.$store.commit('COMPLETADADOS',despesas)
            this.$store.commit('CARREGACONFIG',config)
        }
        this.carregadados()
    },
    methods:{
    carregadados(){
        const config = this.$store.getters.carregaConfig
        this.config.salario = config.salario
        this.config.wallet = config.wallet
        this.config.categories = config.categories
    },
    createValue (val, done) {
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
