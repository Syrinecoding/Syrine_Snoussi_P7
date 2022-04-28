<template>
  <header class="top-bar">
    <img src="./assets/img/Logo.png" alt="Logo Groupomania" class="top-bar-logo">
    <nav class="top-bar">
      <router-link to="/">Accueil <Icon icon="ci:home-alt-fill" color="#f24e1e" height="30" class="icon" /></router-link>
      <router-link to="/users">Collègues <Icon icon="gis:globe-users" color="#f24e1e" height="30" class="icon"/></router-link>
      <router-link to="/profile/:userId">
        Profil
        <img v-if="picture" :src="picture" alt="photo de profil" class="tinyCirc">
        <img v-else src="./assets/img/depositphotos_profile.jpeg" alt="avatar" class="tinyCirc">
      </router-link>
      <router-link to="/signup">Login<Icon icon="ri:login-circle-fill" color="#f24e1e" height="30" class="icon" /></router-link>
    </nav>
  </header>
  <router-view/>
  <footer></footer>
</template>

<style lang="scss">

.top-bar{
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
  background: white;
  //border: 3px solid green;
    .top-bar-logo {
      width: 22rem;
      //border: 3px solid red;
    }
    img {
      width: 3rem;
      display: inline;
      vertical-align: middle;
    }
}

nav {
  padding: 20px;
  width: 35rem;
  //border: 3px solid red;
  a {
    font-weight: bold;
    color: #2c3e50;
    text-decoration: none;

    &.router-link-exact-active {
      color: #f24e1e;
    }
  }
}
footer {
  height: 100px;
}
</style>

<script>
import { Icon } from '@iconify/vue'
import axios from 'axios'
// import ProfileImg from '../src/components/ProfileImg.vue'

export default {
  data: () => {
    return {
      user: {},
      userProfile: {},
      userId: '',
      picture: ''
    }
  },
  props: ['tinyCirc'],
  components: {
    Icon
    // ProfileImg
  },
  methods: {
  },
  mounted () {
    const ls = localStorage.getItem('user')
    if (ls) {
      console.log('1')
      const user = JSON.parse(ls)
      const token = user.token// this.$store.state.user.token
      console.log('2', user)
      console.log(token)
      axios.get('http://localhost:3000/api/user/auth', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then((res) => {
        console.log(res)
        // this.$store.dispatch('fill', user)
        this.picture = this.$store.state.userProfile.picture
      }).catch(err => console.log(err))
    }
  },
  updated: function () {
    console.log(this.$store.state.user)
    // this.picture = this.$store.state.userProfile.picture
  }
}
</script>
