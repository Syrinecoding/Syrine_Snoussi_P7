<template>
  <div class="card">
    <h1 class="card__title">Mon profil</h1>
    <img :src="user.picture" alt="photo de profil">
    <button @click="upload = !upload" class="btn"><Icon icon="ic:round-add-a-photo" color="#367ca1" height="30" /></button>
    <div v-if="upload">
      <file-upload />
    </div>
    <div>
      <h2>{{ user.username }}</h2>
      <h3>{{ user.position }}</h3>
    </div>
    <div class="form-row">
      <button @click="logout()" class="button">Déconnexion</button>
    </div>
  </div>
</template>

<script>
import FileUpload from '../components/FileUpload.vue'
import axios from 'axios'
import { Icon } from '@iconify/vue'

export default {
  name: 'ProfileView',
  components: {
    FileUpload,
    Icon
  },
  data () {
    return {
      user: {},
      upload: false
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
.card__title {
  padding-bottom: 20px;
}
img {
  max-width: 100%;
  width: 500px;
  border-radius: 35px;
  margin: 0 auto;
}
</style>
