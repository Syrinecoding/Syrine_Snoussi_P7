<template>
  <form class="form-row">
    <img  class="imgCirc" :src="$store.state.userProfile.picture" alt="photo de profil">
    <textarea class="form-row__input" name="content" id="" cols="10" rows="5" placeholder="Faites-nous rire !"></textarea>
    <Icon icon="fa-solid:photo-video" color="#367ca1" height="30" />
  </form>
</template>

<script>
// import axios from 'axios'
import { Icon } from '@iconify/vue'

export default {
  name: 'PostInput',
  components: {
    Icon
  },
  data () {
    return {
      userProfile: {}
    }
  },
  mounted: function () {
    // console.log('PostInput.vue', this.$store.state.user.picture)
    if (this.$store.state.user.userId === -1) {
      this.$router.push('/signup')
    }
  }
}
</script>

<style scoped>
.form-row {
  padding: 10px;
  border: 3px solid #ffc074;
  border-radius: 35px;
  align-items: center;
};

</style>
