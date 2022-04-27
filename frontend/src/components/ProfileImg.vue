<template>
  <div v-if="picture" class="flex">
    <img :src="picture" alt="photo de profil">
  </div>
  <div v-if="!picture" class="imgCirc">
    <img src="../assets/img/depositphotos_profile.jpeg" alt="avatar">
    <!-- {{ displayInit() }} -->
  </div>
</template>

<script>

export default {
  name: 'ProfileImg',
  props: [
    'picture'
  ],
  data: () => {
    return {}
  },
  methods: {
    displayInit () {
      const name = this.$store.state.userProfile.username
      console.log(name)
      const intial = name.charAt(0)
      console.log(intial)
      return intial
    }
  },
  mounted: () => {
    console.log('profile img mounted')
  }
}

</script>

<style lang="scss" scoped>

.flex {
  display: inline-block;
}
</style>
