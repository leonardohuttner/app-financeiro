<template>
<div class="fundo justify-center row items-center" :style="`height:${sizes()-10}px;`">
    <title>Registrar</title>
    <Stepper/>
</div>
</template>

<script>
import Stepper from '../components/Stepper.vue';

export default {
    components:{
        Stepper
    },
   
    data() {
        return {
                email: '',
                senha: '',
                userName:'',
        };
    },
    methods:{
      sizes(){
        return document.documentElement.clientHeight
        }
    },
}
</script>

<style>
.card{
    width: 90%;
    margin-bottom: 20%;
}
.fundo{
    background-image: url("../assets/money.jpg");
    height: 30em;

}
</style>