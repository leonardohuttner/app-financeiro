<template>
<q-card class="container">
    <h5>Listas e graficos</h5>
    <Lista />
    <Form v-if="abreForm" />
    <q-btn push color="primary" size="18px" round icon="add" id="add-expenses" @click="openDialog = true" />
    <q-dialog v-model="openDialog" full-width>
        <Form />
    </q-dialog>
</q-card>
</template>

<script>
import Lista from './Lista'
import Form from './form'
export default {
    data() {
        return {
            abreForm: false,
            openDialog: false
        }
    },
    computed: {

    },
    methods: {},
    components: {
        Form,
        Lista
    },
}
</script>

<style>
* {
    margin-top: 0px;
    font-size: 16px;
}

#add-expenses {
    position: fixed;
    top: 82%;
    right: 30px;
}

.expense {
    margin-top: 0px;
    border-bottom: #999 1px solid;
    padding-top: 8px;
}
</style>
