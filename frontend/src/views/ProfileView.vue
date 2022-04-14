<template>
  <div class="card">
      <h1 class="card__title">Mon profil</h1>
      <img v-if="user.picture == null" src="../assets/img/cats_00016.jpg" alt="chat">
      <img v-else :src="user.picture" alt="photo de profil">
      <!-- <label @click="upload =!upload" for="image">modifier l'image</label> -->
      <form enctype="multipart/form-data">
        <input type="file" name="image" id="image" accept=".jpg, .jpeg, .png, .gif" @change="onFileSelected">
        <button @click="updateImg">Valider</button>
      </form>
      <div>
        <p>{{ user.username }}</p>
        <p>{{ user.position }}</p>
      </div>
      <p @click="show = !show">Modifier mes informations</p>
      <!-- <div v-if="show">
      </div> -->
      <!-- ci-dessus importer composant  -->
      <div class="form-row">
        <button class="button">Déconnexion</button>
      </div>
  </div>
</template>

<script>

import axios from 'axios'

export default {
  name: 'ProfileView',
  data () {
    return {
      user: {},
      selectedFile: null
    }
  },
  methods: {
    onFileSelected (event) {
      this.selectedFile = event.target.file[0]
    },
    updateImg () {
      const token = this.$store.state.user.token
      const fd = new FormData()
      fd.append('image', this.selectedFile, this.selectedFile.name)
      axios.put(`http://localhost:3000/api/user/profile/${this.$store.state.user.userId}`, fd, { headers: { Authorization: `Bearer ${token}` } })
        .then((response) => { console.log(response) })
        .catch((error) => { this.error = error.response.data })
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
  }
}
</script>
