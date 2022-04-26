<template>
  <div class="home">
    <PostInput />
    <div v-for="post in posts" :key="post.postId" class="post">
      <PostItem :post='post'/>
    </div>
  </div>
</template>

<script>
import PostInput from '@/components/PostInput.vue'
import PostItem from '@/components/PostItem.vue'
import axios from 'axios'
// @ is an alias to /src
export default {
  name: 'HomeView',
  components: {
    PostInput,
    PostItem
  },
  data: () => {
    return {
      user: {},
      posts: {
        postId: '',
        picture: '',
        username: '',
        title: '',
        attachment: '',
        content: '',
        likes: Number
      },
      likes: [],
      postId: null,
      comment: false,
      content: '',
      contentCom: '',
      comments: []
    }
  },
  methods: {
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
.home {
  width: 700px;
  margin: 0px auto;
  max-width: 100%;
  padding: 10px;
}
.post {
  border: 3px solid #ffc074;
  border-radius: 35px;
  padding: 10px;
  max-width: 700px;
  margin: 10px 0px;
  /* cursor: pointer; */
  color: #2c3e50;
    a{
      text-decoration: none;
      color: #2c3e50;
    }
}
</style>
