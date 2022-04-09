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
    <div class="form-row">
      <button class="button" :class="{'button--disabled' : !validFields}" v-if="mode == 'login'">
        <span>Connection</span>
      </button>
      <button @click="signUp()" class="button" :class="{'button--disabled' : !validFields}" v-else>
        <span>Créer un compte</span>
      </button>
    </div>
  </div>
</template>

<script>

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
    }
  },
  methods: {
    switchToCreateAccount () {
      this.mode = 'create'
    },
    switchToLogin () {
      this.mode = 'login'
    },
    signUp () {
      this.$store.dispatch('signUp', {
        email: this.email,
        username: this.username,
        password: this.password
      })
    }
  }
}
</script>

<style scoped>
.card {
  margin: 80px auto;
}
.form-row {
  display: flex;
  margin: 16px 0px;
  gap: 16px;
  flex-wrap: wrap;
}
.form-row__input {
  padding: 8px;
  border: none;
  border-radius: 8px;
  background: #f2f2f2;
  font-weight: 500;
  font-size: 16px;
  flex: 1;
  min-width: 100px;
}
.form-row__input::placeholder {
  color: #2c3e50;
}
</style>
