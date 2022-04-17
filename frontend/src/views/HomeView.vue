<template>
  <div class="home">
    <PostInput />
    <div class="post">
      <div>
        <img class="post__img" src="../assets/img/cats_00041.jpg" alt="chat roux">
        <h3>Chat roux</h3>
        <p class="post__content">Voici mon chat</p>
      </div>
      <div class="post__reactions">
        <span class="post__likes">J'aime</span>
        <!-- au click : J'aime s'incremente -->
        <p class="post__comments">Je commente</p>
        <!-- au click : Je commente switch vers input -->
      </div>
    </div>
  </div>
</template>

<script>
import PostInput from '../components/PostInput.vue'
// @ is an alias to /src
export default {
  name: 'HomeView',
  components: { PostInput }
}
</script>

<style scoped>
.home {
  width:fit-content;
  margin: 0px auto;
  max-width: 100%;
  padding: 10px;
}

.post {
  border: 3px solid #ffc074;
  border-radius: 35px;
  width: 500px;
  padding: 10px;
}
.post__img {
  border-radius: 35px;
}
.post__reactions {
  display: flex;
  justify-content: space-around;
}
</style>
