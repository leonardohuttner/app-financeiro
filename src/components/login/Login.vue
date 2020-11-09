<template>
<div class="c-container-login  justify-center row items-center">
    <title>Entre</title>
    <div class="c-field-login">
        <h4>Entrar</h4>
        <q-input class="q-ma-md" v-model="user.username" label="Username:" autofocus filled style="weight:200px" :style="this.$q.platform.is.ios ? 'font-size:17px' : ''" />
        <q-input class="q-ma-md" type="pass" v-model="user.senha" label="Senha:" filled style="weight:200px" :style="this.$q.platform.is.ios ? 'font-size:17px' : ''" />
        <q-btn color="secondary" style="margin-left:75%">Login</q-btn>
        <h6>Ainda não é cadastrado? </h6>
    </div>
</div>
</template>

<script>
export default {
    data() {
        return {
            user: {
                username: '',
                senha: ''
            }
        }
    },
}
</script>

<style>
.c-container-login {
    height: 100vh;
    background-color: rgb(66, 92, 141);
}

.container {
    margin-top: 20px;
}

.c-field-login {
    border-radius: 5px;
    width: 40%;
    padding: 8px;
    margin: 5px 30px;
    background-color: rgba(255, 255, 255, 0.76);
}
</style>
