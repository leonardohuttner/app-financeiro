<template>
<div>
    <div class="q-pa-md">
        <q-table title="Gastos:" :data="list" dense :columns="columns" row-key="name" />
    </div>

</div>
</template>

<script>
export default {
    data() {
        return {
            columns: [{
                    name: 'data',
                    label: 'Data',
                    field: 'data',
                    align: 'left',
                    sortable: true
                },
                {
                    name: 'description',
                    align: 'center',
                    label: 'Descrição',
                    field: 'description',
                    sortable: true
                },
                {
                    name: 'amount',
                    label: 'Valor (R$)',
                    field: 'amount',
                    sortable: true
                },
                {
                    name: 'forma',
                    label: 'Forma pagamento',
                    field: 'forma'
                },
            ],
            data: [{}]
        }
    },
    computed: {
        list() {
            return this.$store.state.Expenses.list
        }
    }
}
</script>

<style>

</style>
