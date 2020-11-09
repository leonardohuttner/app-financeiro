<template>
<q-card>
    <h5>Cartão</h5>
    <h3>R${{calculaTotal}}</h3>
    <div class="q-pa-sm" style="max-width: 100%">
        <q-list dense bordered padding class="rounded-borders no-margin" v-for="expense in list" :key="expense.data">
            <q-item clickable>
                <q-item-section class="no-margin no-padding">
                    <q-icon :name="expense.receita === 'true' ? 'trending_up' : 'trending_down'" size="20px" :color="expense.receita === 'true' ? 'green':'red'" />
                </q-item-section>
                <q-item-section>
                    {{expense.receita}}
                    {{expense.data}}
                </q-item-section>
                <q-item-section>
                    R${{expense.amount}}
                </q-item-section>
                <q-item-section>
                    {{expense.description}}
                </q-item-section>
            </q-item>
        </q-list>
    </div>

</q-card>
</template>

<script>
export default {
    computed: {
        list() {
            return this.$store.state.Expenses.list
        },
        calculaTotal() {
            let total = 0

            return total
        }
    }
}
</script>

<style>
h4 {
    text-align: center;
}
</style>
