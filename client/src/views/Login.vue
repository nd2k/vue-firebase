<template>
  <div id="login">
    <transition name="fade">
        <div v-if="performingRequest" class="loading">
            <p>Loading...</p>
        </div>
    </transition>
    <section>
      <div class="col1">
        <h1>OTC web app!</h1>
        <p>Bienvenue dans la web application OTC.</p>
      </div>
      <div class="col2" :class="{ 'signup-form': !showLoginForm && !showForgotPassword }">
        <form v-if="showLoginForm" @submit.prevent>
          <h1>Connectez-vous</h1>

          <label for="email">Votre adresse e-mail</label>
          <input v-model.trim="loginForm.email" type="text" placeholder="Votre adresse email professionnelle" id="email" />

          <label for="password">Votre adresse e-mail</label>
          <input v-model.trim="loginForm.password" type="password" placeholder="*******" id="password" />

          <button class="button" @click="login">Connectez-vous</button>

          <div class="extras">
            <a @click="toggleForm">Créer un compte</a>
            <a @click="togglePasswordReset">Mot de passe oublié</a>
          </div>
        </form>

        <form v-if="!showLoginForm && !showForgotPassword" @submit.prevent>
          <h1>Enregistrez-vous</h1>

          <label for="name">Votre nom</label>
          <input v-model.trim="signupForm.name" type="text" placeholder="Arnaud Petillon" id="name" />

          <label for="name">Votre avatar</label>
          <input v-model.trim="signupForm.avatar" type="text" placeholder="https://scontent.fbru2-1.fna.fbcdn.net/v/t1.0-1/p240x240/18814163_10155233276729002_3053995931970522368_n.jpg?_nc_cat=109&_nc_ht=scontent.fbru2-1.fna&oh=38cfcb4c1bad2096ae082e1fccab91e6&oe=5C3C72E5" id="avatar" />

          <label for="email2">Votre adresse e-mail</label>
          <input v-model.trim="signupForm.email" type="text" placeholder="Votre adresse email professionnelle" id="email2" />

          <label for="password2">Votre adresse e-mail</label>
          <input v-model.trim="signupForm.password" type="password" placeholder="*******" id="password2" />

          <button class="button" @click="signup">Enregistrez-vous</button>

          <div class="extras">
            <a @click="toggleForm">Connectez-vous</a>
          </div>
        </form>

        <form v-if="showForgotPassword" @submit.prevent class="password-reset">
          <div v-if="!passwordResetSuccess">
            <h1>Réinitialisez votre mot de passe</h1>
            <p>Un email de confirmation vous sera envoyé afin de confirmer la réinitialisation.</p>

            <label for="email3">Votre adresse email</label>
            <input v-model.trim="passwordForm.email" type="text" placeholder="Votre adresse email professionnelle" id="email3">

            <button @click="resetPassword" class="button">Confirmer</button>

            <div class="extras">
              <a @click="togglePasswordReset">Connectez-vous</a>
            </div>
          </div>

          <div v-else>
            <h1>Email envoyé</h1>
            <p>Vérifier votre boîte mail afin de confirmer la réinitialisation de votre mot de passe.</p>
            <button @click="togglePasswordReset" class="button">Connectez-vous</button>
          </div>
        </form>

        <transition name="fade">
          <div v-if="errorMsg !== ''" class="error-msg">
            <p>{{ errorMsg }}</p>
          </div>
        </transition>

      </div>
    </section>
  </div>
</template>

<script>
const fb = require('../config/firebaseConfig.js')

export default {
  data() {
    return {
      loginForm: {
        email: '',
        password:''
      },
      signupForm: {
        name: '',
        avatar: '',
        email: '',
        password:''
      },
      passwordForm: {
        email: ''
      },
      showLoginForm: true,
      showForgotPassword: false,
      passwordResetSuccess: false,
      performingRequest: false,
      errorMsg: ''
    }
  },
  methods: {
    login() {
      this.errorMsg = ''
      this.performingRequest = true

      fb.auth.signInWithEmailAndPassword(this.loginForm.email, this.loginForm.password)
        .then(user => {
          this.$store.commit('setCurrentUser', user.user)
          this.$store.dispatch('fetchUserProfile')
          this.$router.push('/dashboard')
        })
        .catch(error => {
          console.log(error)
          this.performingRequest = false
          this.errorMsg = error.message
        })
        
    },
    signup() {
      this.errorMsg = ''
      this.performingRequest = true

      fb.auth.createUserWithEmailAndPassword(this.signupForm.email, this.signupForm.password).then(user => {
        this.$store.commit('setCurrentUser', user.user)

        // Create user object
        fb.usersCollection.doc(user.user.uid).set({
          name: this.signupForm.name,
          avatar: this.signupForm.avatar,
          email: this.signupForm.email
        }).then(() => {
          this.$store.dispatch('fetchUserProfile')
          this.$router.push('/dashboard')
        }).catch(error => {
          console.log(error)
          this.performingRequest = false
          this.errorMsg = error.message
        })
      }).catch(error => {
        console.log(error)
      })
    },
    toggleForm() {
      this.errorMsg = ''
      this.showLoginForm = !this.showLoginForm
    },
    togglePasswordReset() {
      if(this.showForgotPassword) {
        this.showLoginForm = false,
        this.showForgotPassword = false,
        this.passwordResetSuccess = false
      } else {
        this.showLoginForm = false,
        this.showForgotPassword = true
      }
    },
    resetPassword() {
      this.performingRequest = true

      fb.auth.sendPasswordResetEmail(this.passwordForm.email).then(() => {
        this.performingRequest = false,
        this.passwordResetSuccess = true,
        this.passwordForm = ''
      }).catch(error => {
        this.performingRequest = false,
        this.errorMsg = error.message
      })
    }
  }
}
</script>
