<template>
  <div>
    <h2>Painel administrativo</h2>
    <div>
      <div class="row">
        <q-card class="col bg-purple text-white q-ma-xs">
          <h3>
          {{usuarios.length}} 
          <q-icon name="perm_identity"/>
          </h3>
        </q-card>

        <q-card class="col bg-grey-6 text-white q-ma-xs">
          <h3>
            {{funcionalidade.length}}
            <q-icon name="analytics"/>
          </h3>
        </q-card>
      </div>
      <div class="col">
        <usuarios class="usuarios"/>
      </div>
    </div>
  </div>
</template>

<script>
import usuarios from '../components/painel/usuarios.vue';
export default {
  components: { usuarios },
  data(){
    return {
      usuarios:[],
      funcionalidade:[]
    }
  },
  created(){
    this.popularUsuarios();
    this.popularFuncionalidades();
  },
  methods:{
    popularUsuarios(){
      this.$http.get('/usuarios')
        .then(async (res)=>{
          this.usuarios = res.data
      })
    },
    popularFuncionalidades(){
      this.$http.get('/funcionalidade')
        .then(async (res)=>{
          this.funcionalidade = res.data
        })
    },
  }
}
</script>

<style>

</style>