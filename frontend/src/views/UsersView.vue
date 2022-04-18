<template>
  <h1>Nos membres</h1>
  <div v-for="user in users" :key="user.userID" class="user">
    <img :src="user.picture" alt="photo de profil" class="imgCirc">
    <div>
      <h3 class="user__info">{{ user.username }}</h3>
      <p class="user__info">{{ user.position }}</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      users: []
    }
  },
  mounted () {
    console.log(this.$store.state.user.token)
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
