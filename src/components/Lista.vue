<template>
<div>
    <q-card class="total shadow-2">
        <h3>Receitas:R${{receitas}} </h3>
    </q-card>
    <q-card class="total shadow-2">
        <h3>Despesas:R${{despesas}} </h3>
    </q-card>
    <div class="q-pa-md">
        <q-table title="Registros:" :data="expenses" dense :columns="columns" row-key="name" />
    </div>
</div>
    
</template>

<script>
import moment from 'moment'
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
                    format:(val)=>moment(val).format('DD/MM/YYYY HH:mm'),
                    sortable: true
                },
                {
                    name: 'description',
                    align: 'center',
                    label: 'Descrição',
                    field: 'description',
                    sortable: false
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
                    field: 'form',
                    sortable: true
                },{
                    name:'type',
                    label: 'Tipo',
                    field: 'type'
                }
            ],
            data: [{}],
        }
    },
    computed: { 
        total() {
            return this.expenses.map(p => 1 * p.amount)
                .reduce((total, atual) => total + atual, 0)
        },
        receitas(){
            const receitas = this.expenses.filter((p)=> p.recept == true)
            return receitas.map(p => 1 * p.amount)
                .reduce((total, atual) => total + atual, 0)
        },
        despesas(){
            const despensas = this.expenses.filter((p)=> p.recept == false)
            return despensas.map(p => 1 * p.amount)
                .reduce((total, atual) => total + atual, 0)
        }
    }
}
</script>

<style>
hr {
    margin-top: 20px;
}

.total {
    width: 40%;
    display: inline-block;
    justify-content: center;
    padding: 5px;
}
</style>
