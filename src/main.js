import Vue from 'vue'
import App from './App.vue'
import router from './plugins/router'
import './quasar'
import store from './plugins/store'
import firebase from 'firebase'

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  var firebaseConfig = {
    apiKey: "AIzaSyCS4gT8OvZEBsX7WtERM-9baebvFDznqfo",
    authDomain: "app-financeiro-8d803.firebaseapp.com",
    databaseURL: "https://app-financeiro-8d803.firebaseio.com",
    projectId: "app-financeiro-8d803",
    storageBucket: "app-financeiro-8d803.appspot.com",
    messagingSenderId: "937445333067",
    appId: "1:937445333067:web:46c1112c7fdde2da8855ce",
    measurementId: "G-R1H9WP7E46"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();


Vue.config.productionTip = false

let app = ''
firebase.auth().onAuthStateChanged(()=>{
  if(!app){
    new Vue({
      router,
      store,
      render: h => h(App),
    }).$mount('#app')
  }
})
