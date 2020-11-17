<template>
<q-card>
    <q-btn push color="primary" size="18px" round icon="add" id="add-expenses" @click="openDialog = true" />
    <q-dialog v-model="openDialog" full-width>
        <Form />
    </q-dialog>
</q-card>
</template>

<script>
import Form from './form'
export default {
    data() {
        return {
            openDialog: false,
        }
    },
    components: {
        Form
    },
}
</script>

<style>
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
