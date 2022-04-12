<template>
    <h1>Hello world</h1>
    <div class="card">
        <h1 class="card__title">Mon profil</h1>
        <!-- <p>{{ userId.username }}</p>
        <p>{{ user.position }}</p> -->
        <img src="../assets/img/cats_00016.jpg" alt="chat">
        <div class="form-row">
          <button class="button">Déconnexion</button>
        </div>
    </div>
</template>

<script>

export default {
  name: 'ProfileView'
  // mounted: function () {
  //   console.log(this.$store.state.userId)
  //   if (this.$store.state.user.userId === -1) {
  //     this.$router.push('/')
  //     return
  //   }
  //   this.$store.dispatch('getUserInfos')
  // }
}
</script>
