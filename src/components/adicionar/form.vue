<template>
<div>
    <q-card class="q-gutter-y-md adicionar">
        <h5>Adicionar:</h5>
        <q-input outlined class="input-despesa" ref="amount" v-model="valor_lanc" placeholder="250,00" type="tel" inputmode="numeric" pattern="[0-9*]" :style="isIOS ? 'font-size:17px': ''" />
        <q-input outlined class="input-despesa" v-model="descricao_lanc" placeholder="Descrição" type="text" :style="isIOS ? 'font-size:17px': ''" />
        <div>
            <q-radio dense v-model="forma_pag" val="cartao" label="Cartão" class="q-ma-sm" :style="isIOS ? 'font-size:17px': ''" />
            <q-radio dense v-model="forma_pag" val="dinheiro" label="Dinheiro" class="q-ma-sm q-pa-sm" :style="isIOS ? 'font-size:17px': ''" />
            <q-select outlined v-show="forma_pag === 'cartao'" :options="cards" v-model="cartao" style="width:300px; display: flex" />
        </div>
        <div style="display: flex">
            <q-radio dense v-model="tipo_lanc" val="receita" label="Receita" class="q-ma-sm" :style="isIOS ? 'font-size:17px': ''" />
            <q-radio dense v-model="tipo_lanc" val="despesa" label="Despesa" class="q-ma-sm q-pa-sm" :style="isIOS ? 'font-size:17px': ''" />
            <q-select outlined :options="trans_tipo" v-model="categoria_lanc" style="width:300px" />

        </div>
        <q-input outlined class="input-despesa" v-model="data_lanc" type="text" placeholder="Data" :style="isIOS ? 'font-size:17px': ''" />
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
            valor_lanc: '',
            descricao_lanc: '',
            data_lanc: '',
            forma_pag: 'cartao',
            tipo_lanc: 'receita',
            cartao: '',
            cards: ['Nubank', 'Digio'],
            categoria_lanc: '',
            trans_tipo: ['Alimentação', 'Boleto', 'Compras', 'Fatura', 'Investimento', 'Salario', 'Outros'],
        }
    },
    methods: {
        submit() {
            const token = this.tokenID()
            const id_usuario = this.idUser()
            const expense = {
                id_usuario: id_usuario,
                descricao_lanc: this.descricao_lanc,
                valor_lanc: this.valor_lanc,
                data_lanc: this.data_lanc,
                forma_pag: this.forma_pag,
                cartao: this.cartao,
                categoria_lanc: this.categoria_lanc,
                tipo_lanc: this.tipo_lanc
            }
            this.$http.post(`/lancamentos/novo`,expense,{headers:{'auth':`${token}`}})
                .then(async (res)=>{
                    this.$store.commit('ADD_EXPENSE', expense)
                    console.log(expense, res)
                }).catch((err=>{
                    console.log(err)
            }))
        },
        reset() {
            this.valor_lanc = '',
            this.descricao_lanc = '',
            this.data_lanc = moment().format('DD/MM/YYYY')
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
h5 {
    margin: 1px;
}
.adicionar {
    margin:0px;
    padding: 5px;
}

.input-despesa {
    width: 100%;
}

.button {
    margin: 8px;
}
</style>
