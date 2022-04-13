<template>
  <div class="card">
    <h1 class="card__title" v-if="mode == `login`">Connection</h1>
    <h1 class="card__title" v-else>Inscription</h1>
    <p v-if="mode == 'login'">Vous n'êtes pas encore inscrit ? <span class="card__action" @click="switchToCreateAccount()">Créer un compte</span></p>
    <p v-else>Vous êtes déjà incrit ? <span class="card__action" @click="switchToLogin()">Se connecter</span></p>
    <div class="form-row">
      <input v-model="email" class="form-row__input" type="email" placeholder="Adresse mail" />
    </div>
    <div class="form-row" v-if="mode == 'create'">
      <input v-model="username" class="form-row__input" type="text" placeholder="Nom d'utilisateur" />
    </div>
    <div class="form-row">
      <input v-model="password" class="form-row__input" type="password" placeholder="Mot de passe" />
    </div>
    <div class="form-row" v-if="mode == 'login' && status == 'error_login'">
      Adresse mail et/ou mot de passe invalide
    </div>
    <div class="form-row" v-if="mode == 'create' && status == 'error_create'">
      Vous êtes déjà inscrit !
    </div>
    <div class="form-row">
      <button @click="logIn()" class="button" :class="{'button--disabled' : !validFields}" v-if="mode == 'login'">
        <span v-if="status == 'loading'">Connection en cours...</span>
        <span v-else>Connection</span>
      </button>
      <button @click="signUp()" class="button" :class="{'button--disabled' : !validFields}" v-else>
        <span v-if="status == 'loading'">Création en cours...</span>
        <span v-else>Créer un compte</span>
      </button>
    </div>
  </div>
</template>

<script>

import { mapState } from 'vuex'

export default {
  name: 'LoginView',
  data: function () {
    return {
      mode: 'login',
      email: '',
      username: '',
      password: ''
    }
  },
  computed: {
    validFields: function () {
      if (this.mode === 'create') {
        if (this.email !== '' && this.username !== '' && this.password !== '') {
          return true
        } else {
          return false
        }
      } else {
        if (this.email !== '' && this.password !== '') {
          return true
        } else {
          return false
        }
      }
    },
    ...mapState(['status'])
  },
  methods: {
    switchToCreateAccount () {
      this.mode = 'create'
    },
    switchToLogin () {
      this.mode = 'login'
    },
    logIn () {
      const self = this
      this.$store.dispatch('logIn', {
        email: this.email,
        password: this.password
      }).then(function (response) {
        console.log(response.data.userId)
        self.$router.push(`/profile/${response.data.userID}`)
      }).catch(function (error) {
        console.log(error)
      })
    },
    signUp () {
      const self = this
      this.$store.dispatch('signUp', {
        email: this.email,
        username: this.username,
        password: this.password
      }).then(function (response) {
        self.logIn()
      }).catch(function (error) {
        console.log(error)
      })
    }
  }
}
</script>

<style scoped>
.card {
  margin: 80px auto;
}

</style>
