<template>
  <div class="wrapper">
    <div class="post__user">
      <div v-if="post.picture">
        <img :src="post.picture" alt="" class="imgCirc">
      </div>
      <div v-else>
        <img src="../assets/img/depositphotos_profile.jpeg" alt="avatar" class="imgCirc">
      </div>
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
    <div class="post__reactions">
      <div class="post__likes">
        <span class="post__number">{{ likes }} </span>
        <button @click="like(post.postId)" class="btn"><Icon icon="wpf:like" color="#f24e1e" height="30" class="icon"/>J'aime</button>
      </div>
      <button @click="comInput = !comInput" class="btn"><Icon icon="fe:comment" color="#f24e1e" height="30" class="icon"/>Je commente</button>
    </div>
    <div class="alert alert--success" v-if="isSuccess">
      Commentaire publié !
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
      <button @click="showComments()" class="btn com__btn">Commentaires</button>
      <div v-for="comm in comments" :key="comm.commentId">
        <div v-if="showCom" class="com__user">
          <img :src="comm.picture" alt="" class="tinyCirc">
          <div>
            <h5 class="com__title">{{ comm.username}}</h5>
            <p>{{ comm.content }}</p>
          </div>
          <div class="post__delete">
            <button @click="deleteCom(comm.commentId)" v-if="comm.userId == this.$store.state.user.userId || this.$store.state.userProfile.isAdmin > 0" class="btn"><Icon icon="fluent:delete-24-regular" color="#367ca1" height="25" /></button>
          </div>
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
      likes: 0,
      comments: [],
      commentId: null,
      postId: null,
      comInput: false,
      content: '',
      contentCom: '',
      isSuccess: false,
      showCom: false,
      commentsLoaded: false
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
        this.likes = response.data.result[0].likes
      }).catch((error) => console.log(error))
    },
    addComment (postId) {
      const token = this.$store.state.user.token
      axios.post(`http://localhost:3000/api/post/${postId}/comment/`, { content: this.contentCom }, {
        headers: { Authorization: `Bearer ${token}` }
      }).then((response) => {
        console.log(response)
        this.isSuccess = true
        setTimeout(function (scope) {
          scope.isSuccess = false
        }, 2000, this)
        this.comInput = false
      }).catch((error) => console.log(error))
    },
    showComments () {
      this.showCom = !this.showCom
      if (this.showCom && !this.commentsLoaded) {
        this.getComments()
      }
    },
    getComments () {
      const token = this.$store.state.user.token
      axios.get(`http://localhost:3000/api/post/${this.post.postId}/comments`, {
        headers: { Authorization: `Bearer ${token}` }
      }).then((response) => {
        console.log(response)
        this.comments = response.data
        this.commentsLoaded = true
        console.log(response.data)
      }).catch((error) => console.log(error))
    },
    deleteCom (commentId) {
      const token = this.$store.state.user.token
      axios.delete(`http://localhost:3000/api/post/comment/${commentId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then((response) => {
        console.log(response)
        this.showCom = false
        this.commentsLoaded = false
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
    this.likes = this.post.likes
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
  max-width : 100%;
  width: 600px;
  // min-height: 600px;
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
  border: 1px solid lightgrey;
  padding: 5px;
  border-radius: 8px;
  background: #FFF5EE;
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
