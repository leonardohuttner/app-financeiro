<template>
  <div class="background">
    <h2>Something was wrong</h2>
    <h3>Erro 404, pagina não encontrada</h3>
    <div class="nota">
        <img src="/wrong.png" alt="bad">
        <q-btn to="/geral">Voltar</q-btn>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style>
.background{
    background-color: #c3c6a8;
    color: aliceblue;
    
}
.nota {
    padding-top: 10px;
    height: 35%;
    width: 70%;
    border: 1px solid rgb(0, 0, 0);
}
</style>