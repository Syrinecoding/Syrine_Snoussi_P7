<template>
  <div class="home">
    <PostInput />
    <ListPosts />
  </div>
</template>

<script>
import PostInput from '@/components/PostInput.vue'
import ListPosts from '@/components/ListPosts.vue'
// @ is an alias to /src
export default {
  name: 'HomeView',
  components: {
    PostInput,
    ListPosts
  }
}
</script>

<style scoped>
.home {
  width: 700px;
  margin: 0px auto;
  max-width: 100%;
  padding: 10px;
}
</style>
