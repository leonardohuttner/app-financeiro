import firebase from 'firebase'
export default {
    methods:{
        isAutenticado(){
            firebase.auth().onAuthStateChanged((user) => {
                if (user) {
                  return true
                } else {
                  return false
                }
        })
    }
}
}