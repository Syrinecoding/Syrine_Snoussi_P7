<template>
  <header class="top-bar">
    <img src="./assets/img/Logo.png" alt="Logo Groupomania" class="top-bar-logo">
    <nav class="top-bar">
      <router-link to="/">Accueil <Icon icon="ci:home-alt-fill" color="#f24e1e" height="30" class="icon" /></router-link>
      <router-link to="/users">Collègues <Icon icon="gis:globe-users" color="#f24e1e" height="30" class="icon"/></router-link>
      <!-- <router-link to="/profile/:userId">Profil
        <div v-if="store....">
          <img :src="$store.state.userProfile.picture" alt="photo de profil" class="tinyCirc">
        </div>
        <div v-if="!store....">

        </div> -->
      <!-- </router-link> -->
      <router-link to="/signup">Login<Icon icon="ri:login-circle-fill" color="#f24e1e" height="30" class="icon" /></router-link>
    </nav>
  </header>
  <router-view/>
</template>

<style lang="scss">

.top-bar{
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
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
</style>

<script>
import { Icon } from '@iconify/vue'

export default {
  data: () => {
    return {
      user: {},
      userProfile: {},
      userId: ''
    }
  },
  components: {
    Icon
  },
  mounted () {
    console.log('nav :', this.$store.state.userProfile)
  }
}
</script>
