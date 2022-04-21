<template>
  <div v-for="post in posts" :key="post.postId" class="post">
    <router-link :to="{ name: 'PostView', params: { postId: post.postId }}">
      <div class="post__user">
        <img :src="post.picture" alt="" class="imgCirc">
        <div>
          <h2 class="post__info">{{ post.username }}</h2>
          <h3 class="post__info">{{ post.title }}</h3>
        </div>
      </div>
      <img class="post__img" :src="post.attachment" alt="image">
      <p class="post__content">{{ post.content }}</p>
    </router-link>
    <div class="post__reactions">
      <div class="post__likes">
        <span class="post__number"></span>
        <button @click="like(post.postId)" class="btn"><Icon icon="wpf:like" color="#f24e1e" height="30" class="icon"/>J'aime</button>
      </div>
      <!-- au click : J'aime s'incremente -->
      <button @click="comment = !comment" class="btn"><Icon icon="fe:comment" color="#f24e1e" height="30" class="icon"/>Je commente</button>
    </div>
    <form @submit.prevent="addComment(post.postId)" method="post">
      <div v-if="comment" class="comment">
        <div class="form-row">
          <label>
            <input type="text" name="contentCom" id="content" class="form-row__input" v-model="contentCom"/>
          </label><br>
        </div>
        <div class="form-row">
          <button class="button">Valider</button>
        </div>
      </div>
    </form>
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
      likes: [],
      postId: '',
      comment: false,
      content: '',
      contentCom: ''
    }
  },
  components: {
    Icon
  },
  methods: {
    like (postId) {
      const token = this.$store.state.user.token
      axios.post(`http://localhost:3000/api/post/${postId}/like`, {}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then((response) => {
        console.log(response)
      }).catch((error) => console.log(error))
    },
    addComment (postId) {
      const token = this.$store.state.user.token
      axios.post(`http://localhost:3000/api/post/${postId}/comment/`, { content: this.contentCom }, {
        headers: { Authorization: `Bearer ${token}` }
      }).then((response) => {
        console.log(response)
      }).catch((error) => console.log(error))
    }
  },
  mounted () {
    const token = this.$store.state.user.token
    axios
      .get('http://localhost:3000/api/post/',
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
  // cursor: pointer;
  color: #2c3e50;
    a{
      text-decoration: none;
      color: #2c3e50;
    }
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
  justify-content: space-between;
  flex-wrap: wrap;
  padding: 30px;
}
.post__number {
  color: #F24E1E;
  font-weight: bold;
}
.comment {
  width: 600px;
  padding: 30px;
}
</style>
