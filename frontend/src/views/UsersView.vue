<template>
  <div>
    <h1>Mes collègues</h1>
    <div v-for="user in users" :key="user.userID" class="card flex">
      <!-- <img src="../assets/img/ProfilTiny.png" alt=""> -->
      <div class="box">
        <p class="form-row">{{ user.username }}</p>
        <p class="form-row">{{ user.position }}</p>
      </div>
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

<style scoped>
.flex {
  display: flex;
  gap: 16px;
};
</style>
