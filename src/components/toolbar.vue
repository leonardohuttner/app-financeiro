<template>
<q-layout view="lHh lpR fFf">
    <q-header elevated :class="isAdmin ? 'bg-red-9' : 'bg-grey-9'">
        <q-toolbar v-show="autenticado()">
            <q-btn flat dense round @click="leftDrawerOpen = !leftDrawerOpen" aria-label="Menu" icon="menu" />
            <q-toolbar-title>
                App_
            </q-toolbar-title>
        <q-btn @click="sair" rounded color="red" size="5px" icon="exit_to_app"></q-btn>
        </q-toolbar>
    </q-header>

    <q-drawer v-if="autenticado()" v-model="leftDrawerOpen" show-if-above bordered content-class="bg-grey-2" >
        <q-list>
            <q-item-label header>Menu</q-item-label>
            <q-item clickable tag="a" to="/geral" :disable="getPermissao_menuGeral()">
                <q-item-section avatar>
                    <q-icon name="timeline" />
                </q-item-section>
                <q-item-section>
                    <q-item-label>Geral</q-item-label>
                    {{getPermissao_menuGeral()}}
                    <q-item-label caption>Resumo</q-item-label>
                </q-item-section>
            </q-item>
            <q-item clickable tag="a" to="/money" :disable="getPermissao_menuDinheiro()">
                <q-item-section avatar>
                    <q-icon name="attach_money" />
                </q-item-section>
                <q-item-section>
                    <q-item-label>Dinheiro</q-item-label>
                    <q-item-label caption>Despesas em dinheiro</q-item-label>
                </q-item-section>
            </q-item>
            <q-item clickable tag="a" to="/card" :disable="getPermissao_menuCartao()">
                <q-item-section avatar>
                    <q-icon name="payment" />
                </q-item-section>
                <q-item-section>
                    <q-item-label>Cartão</q-item-label>
                    <q-item-label caption>Despesa por cartões</q-item-label>
                </q-item-section>
            </q-item>
            <q-item clickable tag="a" to="/settings" :disable="getPermissao_menuConfiguracao()">
                <q-item-section avatar>
                    <q-icon name="settings" />
                </q-item-section>
                <q-item-section>
                    <q-item-label>Configurações</q-item-label>
                </q-item-section>
            </q-item>
            <q-item clickable tag="a" to="/panel" v-if="isAdmin" :disable="getPermissao_painel()">
                <q-item-section avatar>
                    <q-icon name="lock" />
                </q-item-section>
                <q-item-section>
                    <q-item-label>Painel ADM</q-item-label>
                </q-item-section>
            </q-item>
        </q-list>
    </q-drawer>

    <q-page-container @mouseenter="leftDrawerOpen = false">
        <router-view></router-view>
    </q-page-container>
    <q-footer v-if="isMobile && autenticado()" class="mobile bg-grey-9">
        <div class="q-gutter-y-md" style="max-width: 1500px">
            <q-tabs inline-label align="justify">
                <q-route-tab icon="timeline" to="/geral" :disable="getPermissao_menuGeral()" exact />
                <q-route-tab icon="attach_money" to="/money" :disable="getPermissao_menuDinheiro()" exact />
                <q-route-tab icon="payment" to="/card" :disable="getPermissao_menuCartao()" exact />
                <q-route-tab icon="settings" to="/settings" exact :disable="getPermissao_menuConfiguracao()" />
            </q-tabs>
        </div>
    </q-footer>
</q-layout>
</template>

<script>
import mixins from '../mixins/mixins'
import serviceUser from '../services/usuario'
export default {
    name: 'toolbar',
    mixins:[mixins],
    components: {

    },
    methods: {
        sair(){
            serviceUser.logout()
        },
        autenticado(){
            return this.$store.getters.logado
        },
        isAdmin(){
            return this.$store.getters.isAdmin == 1
        },
        getPermissao_menuGeral(){
            return !this.$store.getters.permissao_geral == 1
        },
        getPermissao_painel(){
            return !this.$store.getters.permissao_painel == 1
        },
        getPermissao_menuCartao(){
            return !this.$store.getters.permissao_cartao == 1
        },
        getPermissao_menuConfiguracao(){
            return !this.$store.getters.permissao_configuracao == 1
        },
        getPermissao_menuDinheiro(){
            return !this.$store.getters.permissao_dinheiro == 1
        }
    },
    computed: {
        isMobile() {
            return this.$q.platform.is.mobile
        },
        
    },
    data() {
        return {
            leftDrawerOpen: false
        }
    }
}
</script>

<style>
.brand{
    background-color: #3e3e3e;
}

</style>
