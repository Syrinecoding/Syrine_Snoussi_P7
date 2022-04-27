<template>
  <div v-if="userProfile.picture" class="flex">
    <img :src="userProfile.picture" alt="photo de profil" v-bind="$attrs">
  </div>
  <div v-if="!userProfile.picture" v-bind="$attrs">
    {{ displayInit() }}
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'ProfileImg',
  inheritAttrs: false,
  data: () => {
    return {
    }
  },
  computed: {
    ...mapState(['userProfile'])
  },
  methods: {
    displayInit () {
      const name = this.userProfile.username
      console.log(name)
      const intial = name.charAt(0)
      console.log(intial)
      return intial
    }
  }
}

</script>

<style lang="scss" scoped>

.flex {
  display: inline-block;
}
</style>
