<template>
  <header class="top-bar">
    <img src="./assets/img/Logo.png" alt="Logo Groupomania" class="top-bar-logo">
    <nav class="top-bar-nav">
      <router-link to="/">Accueil <Icon icon="ci:home-alt-fill" color="#f24e1e" height="30" /></router-link> |
      <router-link to="/users">Collègues <Icon icon="gis:globe-users" color="#f24e1e" height="30" /></router-link> |
      <router-link to="/profile">Profil <img src="./assets/img/ProfilTiny.png" alt="photo de profil"></router-link> |
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
    }
}

nav {
  padding: 20px;
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
  components: {
    Icon
  }
}
</script>
