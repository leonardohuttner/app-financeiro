<template>
<div>
    <q-card id="adicionar" class="q-gutter-y-md">
        <h5>Adicionar:</h5>
        <q-input class="input-despesa" ref="amount" filled v-model="expense.amount" placeholder="250,00" type="tel" :style="isIOS ? 'font-size:17px': ''" />
        <q-input class="input-despesa" filled v-model="expense.description" placeholder="Descrição" type="text" :style="isIOS ? 'font-size:17px': ''" />
        <div>
            <q-radio dense v-model="expense.forma" val="Cartão" label="Cartão" class="q-ma-sm" :style="isIOS ? 'font-size:17px': ''" />
            <q-radio dense v-model="expense.forma" val="Dinheiro" label="Dinheiro" class="q-ma-sm q-pa-sm" :style="isIOS ? 'font-size:17px': ''" />
            <q-select v-show="expense.forma === 'Cartão'" :options="expense.cards" v-model="expense.card" style="width:300px; display: flex" />
        </div>
        <div style="display: flex">
            <q-radio dense v-model="expense.receita" val=true label="Receita" class="q-ma-sm" :style="isIOS ? 'font-size:17px': ''" />
            <q-radio dense v-model="expense.receita" val=false label="Despesa" class="q-ma-sm q-pa-sm" :style="isIOS ? 'font-size:17px': ''" />
            <q-select v-show="expense.receita === 'true'" :options="expense.receitas" v-model="expense.receita_tipo" style="width:300px" />
            <q-select v-show="expense.receita === 'false'" :options="expense.despesas" v-model="expense.despesas_tipo" style="width:300px" />
        </div>
        <q-input class="input-despesa" filled v-model="expense.data" type="tel" placeholder="Data:" :style="isIOS ? 'font-size:17px': ''" />
        <q-btn label="OK" color="primary" class="button" @click="submit" />
        <q-btn label="Cancelar" color="warning" class="button" v-close-popup />
    </q-card>
</div>
</template>

<script>
import moment from 'moment'
export default {
    data() {
        return {
            expense: {
                amount: '',
                description: '',
                data: moment().format('DD/MM/YYYY'),
                forma: '',
                receita: true,
                card: '',
                cards: ['Nubank', 'Digio'],
                receita_tipo: '',
                receitas: ['Salario', 'Outro'],
                despesa_tipo: '',
                despesas: ['Alimentação', 'Boleto', 'Compras', 'Fatura', 'Investimento', 'Outros'],
            }
        }
    },
    methods: {
        submit() {
            const cloned = JSON.parse(JSON.stringify(this.expense))
            this.$store.commit('ADD_EXPENSE', cloned)
            console.log(this.expense)
            this.reset()

        },
        reset() {
            this.expense.amount = '',
                this.expense.description = '',
                this.expense.data = moment().format('DD/MM/YYYY')
            this.$refs.amount.focus()
        },
    },
    computed: {
        isIOS() {
            return this.$q.platform.is.ios
        }
    }
}
</script>

<style>
.adicionar {
    margin-top: 0px;
}

.input-despesa {
    width: 100%;
}

.button {
    margin: 8px;
}
</style>
