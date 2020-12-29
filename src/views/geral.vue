<template>
<q-card class="container">
    <h5>Listas e graficos</h5>
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
            openDialog: false,
        }
    },
    computed: {

    },
    methods: {
        listCompleta() {
            return this.$store.getters.listCompleta
        },
        logado(){
            return console.log(this.$store.getters.userLogado)
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
</style>
