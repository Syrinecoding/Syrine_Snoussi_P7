<template>
  <div>
    <p>{{ comments.length }}</p>
  </div>
</template>

<script>
// import axios from 'axios'

export default {
  name: 'ComItem',
  props: ['post'],
  data: () => {
    return {
      comments: []
    }
  },
  mounted () {
  }
}
</script>

<style lang="scss" scoped>

</style>
