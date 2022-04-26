<template>
  <h1>Nos membres</h1>
  <div v-for="user in users" :key="user.userID" class="user">
    <div v-if="user.picture">
      <img :src="user.picture" alt="photo de profil" class="imgCirc">    </div>
    <div v-else>
      <img src="../assets/img/depositphotos_profile.jpeg" alt="avatar" class="imgCirc">
    </div>
    <div>
      <h3 class="user__info">{{ user.username }}</h3>
      <p class="user__info">{{ user.position }}</p>
    </div>
    <button @click="deleteUser(user)" v-if="users.userID == this.$store.state.user.userId || this.$store.state.userProfile.isAdmin > 0" class="btn"><Icon icon="fluent:delete-24-regular" color="#367ca1" height="20" /></button>
  </div>
</template>

<script>

import axios from 'axios'
import { Icon } from '@iconify/vue'

export default {
  data () {
    return {
      users: [],
      user: {}
    }
  },
  components: {
    Icon
  },
  methods: {
    deleteUser (user) {
      const token = this.$store.state.user.token
      console.log(user.userID)
      axios.delete(`http://localhost:3000/api/user/profile/${user.userID}`, { headers: { Authorization: `Bearer ${token}` } })
        .then((res) => {
          console.log(res)
          location.reload()
        })
        .catch(err => console.log(err.message))
    }
  },
  mounted () {
    console.log(this.$store.state.user.token)
    if (this.$store.state.user.userId === -1) {
      this.$router.push('/signup')
      return
    }
    axios.get('http://localhost:3000/api/user/users', { headers: { Authorization: `Bearer ${this.$store.state.user.token}` } })
      .then((res) => {
        console.log(res.data)
        this.users = res.data.users
      })
      .catch(err => console.log(err.message))
  }
}
</script>

<style lang="scss" scoped>
.flex {
  display: flex;
  gap: 16px;
};
.user {
  max-width: 100%;
  width: 300px;
  display: flex;
  justify-content: space-around;
  gap: 16px;
  background: white;
  border: 3px solid #ffc074;
  border-radius: 35px;
  padding: 20px;
  margin: 20px auto;
}
.user__info {
  margin: 16px 0px;
  text-align: left;
  font-weight: 500;
  gap: 16px;
}

</style>
