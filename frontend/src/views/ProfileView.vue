<template>
  <div class="card">
    <h1 class="card__title">Mon profil</h1>
    <img :src="user.picture" alt="photo de profil">
    <div>
      <file-upload />
    </div>
    <div>
      <p>{{ user.username }}</p>
      <p>{{ user.position }}</p>
    </div>
    <div class="form-row">
      <button @click="logout()" class="button">Déconnexion</button>
    </div>
  </div>
</template>

<script>
import FileUpload from '../components/FileUpload.vue'
import axios from 'axios'

export default {
  name: 'ProfileView',
  components: {
    FileUpload
  },
  data () {
    return {
      user: {}
    }
  },
  mounted: function () {
    console.log('ProfileView', this.$store.state.user)
    if (this.$store.state.user.userId === -1) {
      this.$router.push('/signup')
      return
    }
    axios.get(`http://localhost:3000/api/user/profile/${this.$store.state.user.userId}`, { headers: { Authorization: `Bearer ${this.$store.state.user.token}` } })
      .then((res) => {
        console.log(res.data)
        this.user = res.data.user
        this.$store.commit('userProfile', res.data.user)
      })
      .catch(err => console.log(err.message))
  },
  methods: {
    logout: function () {
      this.$store.commit('logout')
      this.$router.push('/signup')
    }
  }
}
</script>

<style scoped>

</style>
