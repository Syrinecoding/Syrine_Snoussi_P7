<template>
  <div v-for="post in posts" :key="post.postId" class="post">
    <div class="post__user">
      <img :src="post.picture" alt="" class="imgCirc">
      <div>
        <h2 class="post__info">{{ post.username }}</h2>
        <h3 class="post__info">{{ post.title }}</h3>
      </div>
    </div>
    <img class="post__img" :src="post.attachment" alt="image">
    <p class="post__content">{{ post.content }}</p>
    <div class="post__reactions">
      <div class="post__likes">
        <span class="post__number">{{likes.length}}</span>
        <button class="btn"><Icon icon="wpf:like" color="#f24e1e" height="30" class="icon"/>J'aime</button>
      </div>
      <!-- au click : J'aime s'incremente -->
      <p class="post__comments"><Icon icon="fe:comment" color="#f24e1e" height="30" class="icon"/>Je commente</p>
      <!-- au click : Je commente switch vers input -->
    </div>
  </div>
</template>

<script>

import axios from 'axios'
import { Icon } from '@iconify/vue'

export default {
  name: 'ListPosts',
  data: () => {
    return {
      user: {},
      posts: [],
      likes: []
    }
  },
  components: {
    Icon
  },
  methods: {
    getLikes () {
      const token = this.$store.state.user.token
      console.log(this.post.postId)
      axios.get(`http://localhost:3000/api/post/${this.post.postId}/like/`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      ).then((res) => {
        console.log(res.data)
        this.likes = res.data.likes
      }).catch(err => console.log(err.message))
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
  margin: 10px 0px;
}
.post__user {
  display: flex;
  align-items: center;
  gap: 15px;
  padding-bottom: 10px;
}
.post__info {
  text-align: left;
}
.post__img {
  border-radius: 35px;
  width: 600px;
  height: 600px;
  margin: 0 auto;
  object-fit: cover;
}
.post__content {
  padding: 10px;
}
.post__reactions {
  display: flex;
  justify-content: space-around;
}
.post__number {
  color: #F24E1E;
  font-weight: bold;
}
</style>
