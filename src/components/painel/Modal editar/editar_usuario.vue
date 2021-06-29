<template>
<div lass="justify-center row items-center">
      <q-card class="full-width q-pa-md" style="margin-bottom:5px">
          ID: {{usuario.id_usuario}}
          <q-btn icon="close" flat round dense v-close-popup class="q-pl-lg"/>
        <q-input
            class="q-ma-sm"
            v-model="usuario.nome"
            label="*Nome:"
            style="weight:200px"
            autofocus 
            filled
            :rules="[val => !!val || 'Campo Obrigatorio*']"
            :style="this.$q.platform.is.ios ? 'font-size:17px' : ''"
        />
        <q-input
            class="q-ma-sm"
            v-model="usuario.email"
            label="*Email:"
            style="weight:200px"
            autofocus 
            filled
            :rules="[val => !!val || 'Campo Obrigatorio*']"
            :style="this.$q.platform.is.ios ? 'font-size:17px' : ''"
        />
        <q-btn label="salvar" color="green" text-color="white" @click="atualizar_usuario()" />
      </q-card>
  </div>
</template>

<script>
export default {
    props: {
        usuario: {}
    },
    data(){
        return{
            
        }
    },
    methods:{
        atualizar_usuario(){
            const email = this.usuario.email
            const id = this.usuario.id_usuario
            const nome = this.usuario.nome
            this.$http.patch(`/usuarios/atualizar/${id}`,{nome,email})
                .then(async ()=>{
                    this.$q.notify({
                        color:'green',
                        message:'Usuario atualizado com sucesso',
                        title:"Sucesso!",
                        position:'top-right'
                    })
                })
                .catch((err)=>{
                    console.log('Erro log: '+err.message)
                    this.$q.notify({
                        color:'red',
                        message:err,
                        position:'top-right'
                })
            })
            
        }
    }
}
</script>

<style>

</style>