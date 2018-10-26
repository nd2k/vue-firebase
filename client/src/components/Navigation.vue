<template>
    <header>
        <section>
            <div class="col1">
                <router-link to="dashboard"><h3>OTC | Web app</h3></router-link>
                <ul class="inline">
                    <li><router-link to="dashboard">Tableau de bord</router-link></li>
                    <li><router-link to="settings">Options</router-link></li>
                    <li><a @click="logout">Déconnexion</a></li>
                </ul>
            </div>
        </section>
    </header>
</template>

<script>
const fb = require('../config/firebaseConfig.js')

export default {
  methods: {
    logout() {
      fb.auth.signOut().then(() => {
        this.$store.dispatch('clearData')
        this.$router.push('/login')
      }).catch(error => {
        console.log(error)
      })
    }
  }
}
</script>

<style>
</style>
