<template>
<q-card>
    <h5>Cartão</h5>
    <div class="q-pa-sm" style="max-width: 100%">
        <Lista :expenses="this.list()" />
    </div>
    <DialogAdd />
</q-card>
</template>

<script>
import DialogAdd from './adicionar/modalAdd'
import Lista from './Lista'
export default {
    components: {
        Lista,
        DialogAdd
    },
    methods: {
        list() {
            return this.$store.state.Expenses.list
        },
    }
}
</script>

<style>
h4 {
    text-align: center;
}
</style>
