<template>
  <div v-for="post in posts" :key="post.postId" class="post">
    <PostItem :post='post'/>
  </div>
</template>

<script>

import axios from 'axios'
// import { mapGetters } from 'vuex'
// import { Icon } from '@iconify/vue'
// import ComInput from './ComInput.vue'
import PostItem from './PostItem.vue'

export default {
  name: 'ListPosts',
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
  components: {
    // Icon,
    PostItem
    // ComInput
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

</style>
