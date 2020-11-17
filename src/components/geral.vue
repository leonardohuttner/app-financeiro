<template>
<q-card class="container">
    <h5>Listas e graficos</h5>
    <Lista :expenses="this.list()" />
    <DialogAdd />
</q-card>
</template>

<script>
import Lista from './Lista'
import DialogAdd from './adicionar/modalAdd'
export default {
    data() {
        return {
            abreForm: true,
            openDialog: false,
        }
    },
    computed: {

    },
    methods: {
        list() {
            return this.$store.state.Expenses.list
        },
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
