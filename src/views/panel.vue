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
            <q-icon name="analytics"/>
          </h3>
        </q-card>
      </div>
      <div class="row">
        <q-card class="col-2 q-ma-xs"  bordered v-for="usuario in usuarios" :key="usuario.id" clickable>
          <q-card-section>
          <q-badge floating align="top" v-if="usuario.isAdmin == 1">
            Admin
          </q-badge>
            <q-avatar rounded>
              <img src="https://thumbs.dreamstime.com/b/%C3%ADcone-do-usu%C3%A1rio-person-profile-sign-ilustra%C3%A7%C3%A3o-avatar-vetor-124240309.jpg" />
            </q-avatar>
          </q-card-section>

          <q-card-section>
            <q-item-label>{{usuario.nome}}</q-item-label>
            <q-item-label caption>{{usuario.email}}</q-item-label>
          </q-card-section>


          <q-card-section side>
            <q-item-label caption>
              Usuario desde:{{formataData(usuario.createdAt)}}
            </q-item-label>
          </q-card-section>

          <q-card-actions align="center">
            <q-btn icon="delete"/>
            <q-btn icon="mode_edit"/>
          </q-card-actions>
        </q-card>
      </div>
    </div>
  </div>
</template>

<script>
import dateTime from 'date-and-time'
export default {
  data(){
    return {
      usuarios: []
    }
  },
  created(){
    this.popularUsuarios();
  },
  methods:{
    popularUsuarios(){
      this.$http.get('/usuarios')
        .then(async (res)=>{
          this.usuarios = res.data
        })
    },
    formataData(data){
      const date = new Date(data)
      if(date){
        return dateTime.format(date,'DD/MM/YY','YYYY-MM-DD')
      }else{
        return ''
      }
    }
  }
}
</script>

<style>
  .info-card {
    display: grid;
    grid-auto-flow: column;
    padding: 2px;
    margin: 2px;
  } 
  .user-card{
    display: inline-block;
    padding: 2px;
    margin: 2px;
  }
</style>