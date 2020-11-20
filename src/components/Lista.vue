<template>
<div>
    <h3>R$</h3>
    <div class="q-pa-md">
        <q-table title="Gastos:" :data="expenses" dense :columns="columns" row-key="name" />
    </div>
    <div>

    </div>
</div>
</template>

<script>
export default {
    props: {
        expenses: {}
    },

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
                    field: 'forma',
                    sortable: true
                },
            ],
            data: [{}],
        }
    },
    computed: {
        // total() {
        //     return this.expenses.map(p => 1 * p.amount)
        //         .reduce((total, atual) => total + atual, 0)
        // }
    }
}
</script>

<style>
hr {
    margin-top: 20px;
}

.total {
    display: flex;
    justify-content: flex-end;
}
</style>
