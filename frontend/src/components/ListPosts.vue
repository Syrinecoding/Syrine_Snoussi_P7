<template>
  <div v-for="post in posts" :key="post.postId" class="post">
    <div>
      <h3>{{ post.title }}</h3>
      <img class="post__img" src="../assets/img/cats_00041.jpg" alt="chat roux">
      <p class="post__content">{{ post.content }}</p>
    </div>
    <div class="post__reactions">
      <span class="post__likes">J'aime</span>
      <!-- au click : J'aime s'incremente -->
      <p class="post__comments">Je commente</p>
      <!-- au click : Je commente switch vers input -->
    </div>
  </div>
</template>

<script>

import axios from 'axios'

export default {
  name: 'ListPosts',
  data: () => {
    return {
      user: {},
      posts: []
    }
  },
  mounted () {
    const token = this.$store.state.user.token
    axios.get('http://localhost:3000/api/post/',
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    ).then((res) => {
      console.log(res.data)
      this.posts = res.data.posts
    }).catch(err => console.log(err.message))
  }
}
</script>

<style lang="scss" scoped>
.post {
  border: 3px solid #ffc074;
  border-radius: 35px;
  padding: 10px;
  width: 700px;
}
.post__img {
  border-radius: 35px;
  margin: 0 auto,
}
.post__reactions {
  display: flex;
  justify-content: space-around;
}
</style>
