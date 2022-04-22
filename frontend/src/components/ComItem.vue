<template>
  <div>
    <p>{{ comments.length }}</p>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'ComItem',
  props: ['post'],
  data: () => {
    return {
      comments: []
    }
  },
  mounted () {
    const token = this.$store.state.user.token
    axios.get(`http://localhost:3000/api/post/${this.post.postId}/comments`, {
      headers: { Authorization: `Bearer ${token}` }
    }).then((response) => {
      console.log(response)
      this.comments = response.data.comments
    }).catch((error) => console.log(error))
  }
}
</script>

<style lang="scss" scoped>

</style>
