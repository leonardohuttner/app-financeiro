<template>
<q-layout view="lHh lpR fff">
    <q-header elevated class="bg-blue">
        <q-toolbar>
            <q-btn flat dense round @click="leftDrawerOpen = !leftDrawerOpen" aria-label="Menu" icon="menu" />
            <q-toolbar-title>
                App_
            </q-toolbar-title>
        </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered content-class="bg-grey-2" v-if="logado">
        <q-list>
            <q-item-label header>Menu</q-item-label>
            <q-item clickable tag="a" to="/geral">
                <q-item-section avatar>
                    <q-icon name="timeline" />
                </q-item-section>
                <q-item-section>
                    <q-item-label>Geral</q-item-label>
                    <q-item-label caption>Resumo</q-item-label>
                </q-item-section>
            </q-item>
            <q-item clickable tag="a" to="/money">
                <q-item-section avatar>
                    <q-icon name="attach_money" />
                </q-item-section>
                <q-item-section>
                    <q-item-label>Dinheiro</q-item-label>
                    <q-item-label caption>Despesas em dinheiro</q-item-label>
                </q-item-section>
            </q-item>
            <q-item clickable tag="a" to="/card">
                <q-item-section avatar>
                    <q-icon name="payment" />
                </q-item-section>
                <q-item-section>
                    <q-item-label>Cartão</q-item-label>
                    <q-item-label caption>Despesa por cartões</q-item-label>
                </q-item-section>
            </q-item>
            <q-item clickable tag="a" to="/settings">
                <q-item-section avatar>
                    <q-icon name="settings" />
                </q-item-section>
                <q-item-section>
                    <q-item-label>Configurações</q-item-label>
                </q-item-section>
            </q-item>
        </q-list>
    </q-drawer>

    <q-page-container>
        <router-view></router-view>
    </q-page-container>
    <q-footer v-if="isMobile">
        <div class="q-gutter-y-md" style="max-width: 1500px">
            <q-tabs inline-label align="justify">
                <q-route-tab icon="timeline" to="/geral" exact />
                <q-route-tab icon="attach_money" to="/money" exact />
                <q-route-tab icon="payment" to="/card" exact />
                <q-route-tab icon="settings" to="/settings" exact />
            </q-tabs>
        </div>
    </q-footer>
</q-layout>
</template>

<script>
export default {
    name: 'toolbar',

    components: {

    },
    methods: {

    },
    computed: {
        isMobile() {
            return this.$q.platform.is.mobile
        },
        logado() {
            return true
            //return this.$store.state.Expenses.user.logado
        }
    },
    data() {
        return {
            leftDrawerOpen: false
        }
    }
}
</script>

<style>

</style>
