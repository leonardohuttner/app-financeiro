<template>
  <div>
    <div class="row" v-if="!this.usuarios">
      <!-- <q-card :class="isMobile() ? 'card_mobile col-2 q-ma-xs' : 'card q-ma-xs'" horizontal bordered v-for="usuario in usuarios" :key="usuario.id" clickable>
        <q-card-section horizontal>
          <q-badge floating align="top" v-if="usuario.isAdmin == 1">
              Admin
          </q-badge>

          <q-card-section vertical :class="isMobile() ? 'full-width' : ''">
            <q-avatar rounded>
              <img src="https://thumbs.dreamstime.com/b/%C3%ADcone-do-usu%C3%A1rio-person-profile-sign-ilustra%C3%A7%C3%A3o-avatar-vetor-124240309.jpg" />
            </q-avatar>
            <q-item-label class="row">{{usuario.nome}}</q-item-label>
            <q-item-label class="row" caption>{{usuario.email}}</q-item-label>
            <q-item-label class="row" caption>Usuario desde:{{formataData(usuario.createdAt)}}</q-item-label>
          </q-card-section>
          <q-card-actions vertical class="justify-around">
            <q-btn flat round icon="delete"/>
            <q-btn flat round icon="mode_edit"/>
          </q-card-actions>
        </q-card-section>
      </q-card> -->
    </div>
    <div class="col">
      <q-list bordered separator>
        <q-item-label header>Funcionalidades</q-item-label>
        <q-item v-for="funcionalidade in funcionalidades" :key="funcionalidade.id">
          <q-item-section>
            {{funcionalidade.nome}}
            <q-item-label caption>
              {{funcionalidade.descricao}}
            </q-item-label>
          </q-item-section>
          <q-item-actions horizontal>
            <toggle-button v-model="funcionalidade.valor" @change="ativarDesativar(funcionalidade.id)"/>
            <q-btn flat round icon="delete" @click="deletarFuncionalidade(funcionalidade.id)"/>
          </q-item-actions>
        </q-item>
      </q-list>
    </div>

    <q-list bordered class="rounded-borders" style="max-width: 100%" >
      <q-item-label header>Usuarios</q-item-label>
      <q-btn icon="add" color="green" :label="isMobile() ? '' : 'Cadastrar novo usuario'" class="full-width" @click="novo_usuario = !novo_usuario"/>
      <q-item clickable v-ripple v-for="usuario in usuarios" :key="usuario.id">
        <q-item-section avatar>
        <q-item-section side top>
          <q-badge floating align="top" label="Administrador" v-if="usuario.isAdmin == 1"/>
        </q-item-section>
          <q-avatar>
            <img src="https://github.com/leonardohuttner.png">
          </q-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label lines="1">{{usuario.nome}}</q-item-label>
          <q-item-label caption lines="2">
            <span class="text-weight-bold">{{usuario.email}}</span>
          </q-item-label>
        </q-item-section>

        <q-item-actions>
            <q-btn flat round icon="mode_edit" @click="dialog_edita_usuario = !dialog_edita_usuario,editar_usuario(usuario.id_usuario)"/>
            <q-btn flat round icon="delete"/>
        </q-item-actions>
      </q-item>

      <q-separator inset="item" />
    </q-list>
    <q-dialog v-model="novo_usuario">
      <registroUsuarios/>
    </q-dialog>
    <q-dialog v-model="dialog_edita_usuario">
      <editaUsuario :usuario="this.usuario"/>
    </q-dialog>
  </div>
</template>

<script>
import dateTime from 'date-and-time'
import registroUsuarios from '../registrar/register.vue'
import editaUsuario from './Modal editar/editar_usuario.vue'
export default {
  components: { registroUsuarios,editaUsuario },
    data(){
        return {
          usuarios:[],
          usuario:{},
          funcionalidades:[],
          novo_usuario: false,
          dialog_edita_usuario: false
        }
    },
    created(){
    this.popularUsuarios();
    this.popularFuncionalidades();
  },
    methods:{
    formataData(data){
      const date = new Date(data)
      if(date){
        return dateTime.format(date,'DD/MM/YY','YYYY-MM-DD')
      }else{
        return ''
      }
    },
    isMobile(){
    return this.$q.platform.is.mobile
    },
    popularUsuarios(){
      this.$http.get('/usuarios')
        .then(async (res)=>{
          this.usuarios = res.data
      })
    },
    popularFuncionalidades(){
      this.$http.get('/funcionalidade')
        .then(async (res)=>{
          const dados = res.data
          dados.map(item=>{
            if(item.valor == 0){
              item.valor = false
            }else {
              item.valor = true
            }
          })
          this.funcionalidades = dados
        })
    },
    deletarFuncionalidade(id){
      this.$http.delete(`/funcionalidade/deletar/${id}`)
        .then(async (res)=>{
        this.$q.notify({
          color:'green',
          message: `O parametro id ${res.data.id_funcionalidade} foi deletado com sucesso!`,
          title:res.data.message,
            position:'top-right'
          })
        this.popularFuncionalidades()
      }).catch((err)=>{
          console.log('Erro log: '+err.message)
          this.$q.notify({
            color:'red',
            message:err.message,
            position:'top-right'
             })
           })
    },
    ativarDesativar(id){
      this.$http.post(`/funcionalidade/alterar/${id}`)
        .then(async (res)=>{
        this.$q.notify({
          color:'green',
          message: res.data.message,
          title:res.data.message,
            position:'top-right'
          })
        this.popularFuncionalidades()
      }).catch((err)=>{
        console.log('Erro log: '+err.message)
        this.$q.notify({
          color:'red',
          message:err.message,
          position:'top-right'
           })
          })
        this.popularFuncionalidades()
    },
    editar_usuario(id){
      const usuario_atualizar = this.usuarios.filter(e => e.id_usuario == id)
      this.usuario = usuario_atualizar[0]
    }
  }, 
}
</script>

<style>
.card_mobile{
    height: 18vh;
    width: 100%;
}
.card{
  height: 18vh;
  width: 25vh;
  min-width: 25vh;
  max-width: 40px;
}
</style>