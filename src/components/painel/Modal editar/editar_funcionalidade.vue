<template>
  <div class="justify-center row items-center">
      <q-card class="full-width q-pa-md" style="margin-bottom:5px">
          {{funcionalidade.id}}
        <q-input
            class="q-ma-sm"
            v-model="funcionalidade.nome"
            label="*Nome:"
            style="weight:200px"
            autofocus 
            filled
            :rules="[val => !!val || 'Campo Obrigatorio*']"
            :style="this.$q.platform.is.ios ? 'font-size:17px' : ''"
        />
        <q-input
            class="q-ma-sm"
            v-model="funcionalidade.descricao"
            label="*Nome:"
            style="weight:200px"
            autofocus 
            filled
            :rules="[val => !!val || 'Campo Obrigatorio*']"
            :style="this.$q.platform.is.ios ? 'font-size:17px' : ''"
        />
      </q-card>
  </div>
</template>

<script>
export default {
    data(){
        return{
            funcionalidade :{
                nome: '',
                descricao: '',
                valor: false
            }
        }
    }
}
</script>

<style>

</style>