<template>
  <header class="top-bar">
    <img src="./assets/img/Logo.png" alt="Logo Groupomania" class="top-bar-logo">
    <nav class="top-bar">
      <router-link to="/">Accueil <Icon icon="ci:home-alt-fill" color="#f24e1e" height="30" /></router-link> |
      <router-link to="/users">Collègues <Icon icon="gis:globe-users" color="#f24e1e" height="30" /></router-link> |
      <router-link to="/profile/:userId">Profil <img :src="userProfile.picture" alt="photo de profil"></router-link> |
      <router-link to="/signup">Compte</router-link>
    </nav>
  </header>
  <router-view/>
</template>

<style lang="scss">

.top-bar{
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
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
  width: 25rem;
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
      userProfile: {
        picture: ''
      }
    }
  },
  components: {
    Icon
  }
}
</script>
