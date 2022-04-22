<template>
  <div>
    <p>{{ post.postId }}</p>
    <img src="" alt="photo de profil" class="tinyCirc">
    <p>username</p>
    <p>contenu</p>
  </div>
</template>

<script>
export default {
  props: ['post.postId'],
  data: () => {
    return {}
  }
}
</script>

<style lang="scss" scoped>

</style>
