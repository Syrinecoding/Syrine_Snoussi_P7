<template>
  <!-- <router-link :to="{ name: 'PostView', params: { postId: post.postId }}"> -->
  <div class="post__user">
    <img :src="post.picture" alt="" class="imgCirc">
    <div>
      <h2 class="post__info">{{ post.username }}</h2>
      <h3 class="post__info">{{ post.title }}</h3>
    </div>
    <div class="post__delete">
      <button @click="deletePost()" v-if="post.user_id == this.$store.state.user.userId || this.$store.state.userProfile.isAdmin > 0" class="btn"><Icon icon="fluent:delete-24-regular" color="#367ca1" height="30" /></button>
    </div>
  </div>
  <img v-if="post.attachment" class="post__img" :src="post.attachment" alt="image">
  <p class="post__content">{{ post.content }}</p>
  <!-- </router-link> -->
  <div class="post__reactions">
    <div class="post__likes">
      <span class="post__number">{{ likes.length }}</span>
      <button @click="like(post.postId)" class="btn"><Icon icon="wpf:like" color="#f24e1e" height="30" class="icon"/>J'aime</button>
    </div>
    <button @click="comInput = !comInput" class="btn"><Icon icon="fe:comment" color="#f24e1e" height="30" class="icon"/>Je commente</button>
  </div>
  <form @submit.prevent="addComment(post.postId)" method="post">
    <div v-if="comInput" class="post__comment">
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
  <div>
    <button @click="showCom = !showCom" class="btn com__btn">{{ comments.length }} Commentaires</button>
    <div v-for="comm in comments" :key="comm.commentId">
      <div v-if="showCom" class="com__user">
        <img :src="comm.picture" alt="" class="tinyCirc">
        <div>
          <h5 class="com__title">{{ comm.username}}</h5>
          <p>{{ comm.content }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Icon } from '@iconify/vue'
import axios from 'axios'
// import ComItem from './ComItem.vue'

export default {
  name: 'PostItem',
  props: ['post'],
  components: {
    Icon
    // ComItem
  },
  data: () => {
    return {
      likes: [],
      comments: [],
      postId: null,
      comInput: false,
      content: '',
      contentCom: '',
      showCom: false
    }
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
        document.location.reload()
      }).catch((error) => console.log(error))
    },
    addComment (postId) {
      const token = this.$store.state.user.token
      axios.post(`http://localhost:3000/api/post/${postId}/comment/`, { content: this.contentCom }, {
        headers: { Authorization: `Bearer ${token}` }
      }).then((response) => {
        console.log(response)
      }).catch((error) => console.log(error))
    },
    likesNum () {
      const token = this.$store.state.user.token
      axios.get(`http://localhost:3000/api/post/${this.post.postId}/likes`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then((response) => {
        console.log(response)
        this.likes = response.data.likes
        // console.log(response.data.likes.length)
        // return this.likesNumber
      }).catch((error) => console.log(error))
    },
    getComments () {
      const token = this.$store.state.user.token
      axios.get(`http://localhost:3000/api/post/${this.post.postId}/comments`, {
        headers: { Authorization: `Bearer ${token}` }
      }).then((response) => {
        console.log(response)
        this.comments = response.data
        console.log(response.data)
      }).catch((error) => console.log(error))
    },
    deletePost () {
      const token = this.$store.state.user.token
      axios.delete(`http://localhost:3000/api/post/${this.post.postId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then((response) => {
        console.log(response)
        document.location.reload()
      }).catch((error) => console.log(error))
    }
  },
  mounted () {
    this.likesNum()
    this.getComments()
  }
}

</script>

<style lang="scss" scoped>
.post__user {
  display: flex;
  align-items: center;
  gap: 15px;
  padding-bottom: 10px;
}
.post__delete{
  margin-left: auto;
  // margin-right: 40px;
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
.post__comment {
  width: 600px;
  padding: 30px;
}
.com__btn {
  font-weight: bold;
  margin: 10px;
}
.com__user {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 8px 30px;
}
.com__title {
  text-align: left;
  font-size: 16px;
}
</style>
