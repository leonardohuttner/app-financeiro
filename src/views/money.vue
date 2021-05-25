<template>
<q-card>
    <h5>Dinheiro</h5>
    <q-btn @click="obj"></q-btn>
    <DialogAdd />
</q-card>
</template>

<script>
import DialogAdd from '../components/adicionar/modalAdd'
export default {
    components: {
        DialogAdd
    },
    data(){
        return{
            teste:{}
        }
    },
    methods:{
        obj(){
            return console.log(this.$store.state.usuario)
        }
    }
}
</script>

<style>

</style>
