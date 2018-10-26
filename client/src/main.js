import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { store } from './store'
import './assets/scss/app.scss'

const fb = require('./config/firebaseConfig')

Vue.config.productionTip = false

// Handle page reloads
let app
fb.auth.onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
    console.log('Firebase config is set up')
  }
})
