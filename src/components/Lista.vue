<template>
<div>
    <div class="row">
        <q-card class="col shadow-2 bg-blue-3 text-white q-pa-xs q-ma-xs">
            <div class="text-subtitle2">Saldo:</div>
            <h3>R${{formataBRL(this.getReceitas()-this.getDespesas())}} </h3>
        </q-card>
        <q-card class="col shadow-2 bg-green-4 text-white q-pa-xs q-ma-xs">
            <div class="text-subtitle2">Receitas:</div>
            <h3>R${{formataBRL(this.getReceitas())}} </h3>
        </q-card>

        <q-card class="col shadow-2 bg-red-3 text-white q-pa-xs q-ma-xs">
            <div class="text-subtitle2">Despesas:</div>
            <h3>R${{formataBRL(this.getDespesas())}} </h3>
        </q-card>
    </div>

    <div class="row">
        <q-card class="col shadow-3 graficos q-ma-xs">
            <apexchart width="100%" height="80%" type="donut" :series="donut.series" :options="donut.options" />
        </q-card>
        <q-card class="col shadow-3 graficos q-ma-xs">
            <apexchart  width="100%" height="80%" type="bar" :series="bar.series" :options="bar.options" />
        </q-card>   
    </div>
    <div class="col-12 q-pa-md">
        <q-table title="Lançamentos:" :data="expenses" dense :columns="columns" row-key="name" />
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
            donut:{
                series:[this.getReceitas(),this.getDespesas()],
                options:{
                    labels:['Receitas','Despesas'],
                    responsive:[ {
                        breakpoint:400
                    }]
                    }
                },
            bar:{
                series:[{
                    name:'Despesas:',
                    data: this.getDadosDespesa()
                },{
                    name:'Receitas:',
                    data: this.getDadosReceita()
                }
                ],
                options:{
                    chart:{
                        type:'bar',
                        height:350,
                        stacked:'true',
                        toolbar:{
                            show:true
                        },
                        zoom:{
                            enabled: false
                            }
                    },
                    dataLabels:{
                        enabled:false
                    },
                    xaxis:{
                        type:'datetime',
                        categories: this.getDataDespesas()
                    },
                    legend: {
                        position: 'right',
                        offsetY: 40
                    },
                    fill: {
                        opacity: 1
                    }
                }
            },
            columns: [{
                    name: 'data',
                    label: 'Data',
                    field: 'data_lanc',
                    align: 'left',
                    format:(val)=>moment(val).format('DD/MM/YYYY'),
                    sortable: true
                },
                {
                    name: 'description',
                    align: 'center',
                    label: 'Descrição',
                    field: 'descricao_lanc',
                    sortable: false
                },
                {
                    name: 'amount',
                    label: 'Valor (R$)',
                    field: 'valor_lanc',
                    format: val => this.formataBRL(val),
                    sortable: true
                },
                {
                    name: 'forma',
                    label: 'Forma pagamento',
                    field: 'forma_pag',
                    sortable: true
                },{
                    name:'type',
                    label: 'Tipo',
                    field: 'tipo_lancamento'
                },
                {
                    name:'categoria',
                    label: 'Categoria',
                    field: 'categoria_lanc'
                }
            ],
            data: [{}],
        }
    },
    computed: { 
        total() {
            return this.expenses.map(p => 1 * p.valor_lanc)
                .reduce((total, atual) => total + atual, 0)
        }
    },
    methods:{
        formataBRL(value){
            return value.toFixed(2).replace('.',',')
        },
        getSalario(){
            this.salario = this.$store.getters.getSalario
            return this.salario
        },
        getDespesas(){
            const despensas = this.expenses.filter((p)=> p.tipo_lancamento == 'despesa')
            return despensas.map(p => 1 * p.valor_lanc)
                .reduce((total, atual) => total + atual, 0)
        },
        getReceitas(){
            const receitas = this.expenses.filter((p)=> p.tipo_lancamento == 'receita')
            return receitas.map(p => 1 * p.valor_lanc)
                .reduce((total, atual) => total + atual, 0)
        },
        getDataDespesas(){
            let datas = []
            datas = this.expenses.map(e =>moment(e.data_lanc).format('MM/DD/YYYY'))
            return datas
        },
        getDadosDespesa(){
            let dadosDespesa = []
            dadosDespesa = this.expenses.map((e)=>{
                if(e.tipo_lancamento == 'despesa'){
                   return  e.valor_lanc * -1
                } else {
                    dadosDespesa.push(e.valor_lanc)
                }
            })
            return dadosDespesa
        },
        getDadosReceita(){
            let dadosReceita = []
            dadosReceita = this.expenses.map((e)=>{
                if(e.tipo_lancamento == 'receita'){
                   return  e.valor_lanc
                }
            })
            return dadosReceita
        },

    }
}
</script>

<style>
hr {
    margin-top: 20px;
}

.total {
    display: grid;
    grid-auto-flow: column;
    align-items: center;
    margin: 1px;
    width: 50%;
    padding: 1px;
}
.graficos {
    margin: 0px;
    display: inline-block;
    justify-content: center;
    padding: 0px;
}
</style>
