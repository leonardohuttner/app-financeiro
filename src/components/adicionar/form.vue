<template>
<div>
<q-card>
    <q-card id="adicionar" class="q-gutter-y-md">
        <h5>Adicionar:</h5>
        <q-input class="input-despesa" ref="amount" filled v-model="amount" placeholder="250,00" type="tel" inputmode="numeric" pattern="[0-9*]" :style="isIOS ? 'font-size:17px': ''" />
        <q-input class="input-despesa" filled v-model="description" placeholder="Descrição" type="text" :style="isIOS ? 'font-size:17px': ''" />
        <div>
            <q-radio dense v-model="forma" val="cartao" label="Cartão" class="q-ma-sm" :style="isIOS ? 'font-size:17px': ''" />
            <q-radio dense v-model="forma" val="dinheiro" label="Dinheiro" class="q-ma-sm q-pa-sm" :style="isIOS ? 'font-size:17px': ''" />
            <q-select v-show="forma === 'cartao'" :options="cards" v-model="card" style="width:300px; display: flex" />
        </div>
        <div style="display: flex">
            <q-radio dense v-model="receita" val="true" label="Receita" class="q-ma-sm" :style="isIOS ? 'font-size:17px': ''" />
            <q-radio dense v-model="receita" val="false" label="Despesa" class="q-ma-sm q-pa-sm" :style="isIOS ? 'font-size:17px': ''" />
            <q-select :options="trans_tipo" v-model="tipo" style="width:300px" />

        </div>
        <q-input class="input-despesa" filled v-model="data" type="text" placeholder="Data:" :style="isIOS ? 'font-size:17px': ''" />
        <q-btn label="OK" color="primary" class="button" @click="submit" />
        <q-btn label="Cancelar" color="warning" class="button" v-close-popup />
    </q-card>
</q-card>
</div>
</template>

<script>
import moment from 'moment'
export default {
    data() {
        return {
            amount: '',
            description: '',
            data: '',
            forma: 'cartao',
            receita: 'receita',
            card: '',
            cards: ['Nubank', 'Digio'],
            tipo: '',
            trans_tipo: ['Alimentação', 'Boleto', 'Compras', 'Fatura', 'Investimento', 'Salario', 'Outros'],
        }
    },
    methods: {
        submit() {
            const token = this.tokenID()
            const idUser = this.idUser()
            const expense = {
                user: idUser,
                name: this.description,
                expenses:{
                amount: this.amount,
                description: this.description,
                data: this.data,
                form: this.forma,
                card: this.card,
                recept: this.receita,
                type: this.tipo
                }
            }
            this.$store.commit('ADD_EXPENSE', expense.expenses)
            this.$http.post(`/new`,expense,{headers:{'auth':`${token}`,'user':`${idUser}`}})
                .then(async (res)=>{
                    console.log(expense, res)
                }).catch((err=>{
                    console.log(err)
            }))
        },
        reset() {
            this.amount = '',
                this.description = '',
                this.data = moment().format('DD/MM/YYYY')
            this.$refs.amount.focus()
        },
        tokenID(){
            return this.$store.getters.tokenUser
        },
        idUser(){
            return this.$store.getters.idUser
        }
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
