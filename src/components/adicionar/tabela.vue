<template>
  <div>
      <q-table title="Lançamentos:" :data="expenses" dense :columns="columns" row-key="name" />
  </div>
</template>

<script>
export default {
    props: {
        expenses: {}
    },
    data(){

    },
    methods:{
        formataBRL(value){
            return value.toFixed(2).replace('.',',')
        }
    }
}
</script>

<style>

</style>