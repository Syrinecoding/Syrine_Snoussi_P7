<template>
  <div class="card">
    <div>
      <h1 class="card__title">{{ user.username }}</h1>
    </div>
    <div>
      <img :src="user.picture" alt="photo de profil">
    </div>
    <div id="profileImg">
     {{ displayInit(user) }}
    </div>
    <button @click="upload = !upload" class="btn"><Icon icon="ic:round-add-a-photo" color="#367ca1" height="30" /></button>
    <div v-if="upload">
      <file-upload />
    </div>
      <h3>{{ user.position }}</h3>
    <div class="form-row">
      <button @click="logout()" class="button">Déconnexion</button>
    </div>
    <button @click="deleteUser(user)"  class="btn delt">Supprimer le compte ?</button>
  </div>
</template>

<script>
import FileUpload from '../components/FileUpload.vue'
import axios from 'axios'
import { Icon } from '@iconify/vue'
import { mapActions } from 'vuex'

export default {
  name: 'ProfileView',
  components: {
    FileUpload,
    Icon
  },
  data () {
    return {
      user: {},
      upload: false,
      userProfile: {},
      username: ''
    }
  },
  methods: {
    logout: function () {
      this.$store.commit('logout')
      this.$router.push('/signup')
    },
    ...mapActions(['deleteUser']),
    deleteUser () {
      // const user = localStorage.getItem('user')
      const user = this.$store.state.user
      this.$store.dispatch('deleteUser', user)
    },
    displayInit (user) {
      const pict = user.picture
      console.log(pict)
      const name = user.username
      console.log(name)
      if (pict != null) {
        const intial = name.charAt(0)
        console.log(intial)
        return intial
      }
    }
  },
  mounted: function () {
    console.log('ProfileView', this.$store.state.user)
    if (this.$store.state.user.userId === -1) {
      this.$router.push('/signup')
      return
    }
    axios.get(`http://localhost:3000/api/user/profile/${this.$store.state.user.userId}`, {
      headers: {
        Authorization: `Bearer ${this.$store.state.user.token}`
      }
    })
      .then((res) => {
        console.log(res.data)
        this.user = res.data.user
        this.$store.commit('userProfile', res.data.user)
      })
      .catch(err => console.log(err.message))
  }
}
</script>

<style scoped>

.card__title {
  padding-bottom: 20px;
}
#profileImg {
  max-width: 100%;
  width: 150px;
  height: 150px;
  border-radius: 50%;
  line-height: 150px;
  margin: 0 auto;
  background: #054263;
  color: white;
  font-weight: bold;
  font-size: 4rem;
}

img {
  max-width: 100%;
  width: 500px;
  border-radius: 35px;
  margin: 0 auto;
}
.delt {
  font-size: 14px;
  text-decoration: underline;
  margin-top: 30px;
}

</style>
