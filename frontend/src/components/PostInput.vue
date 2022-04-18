<template>
  <div class="alert alert--success" v-if="isSuccess">
    Publication postée !
  </div>
  <div class="posting">
    <img  class="imgCirc" :src="$store.state.userProfile.picture" alt="photo de profil">
    <form @submit.prevent="createPost" enctype="multipart/form-data">
      <div class="column">
        <input type="text" class="form-row__input" placeholder="Votre titre">
        <textarea
          id="content"
          class="form-row__input"
          cols="45"
          rows="5"
          v-model="content"
          v-on:keyup.enter="createPost"
          placeholder="Faites-nous rire !">
        </textarea>
      </div>
    </form>
    <div>
      <button @click="upload = !upload" class="btn"><Icon icon="fa-solid:photo-video" color="#367ca1" height="30" /></button>
    </div>
    <form @submit.prevent="createPost" enctype="multipart/form-data">
      <div v-if="upload" class="upload">
        <div class="form-row">
          <label>
            <input type="file" name="image" id="image" class="form-row__input" @change="onSelect ($event)"/>
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
  name: 'PostInput',
  components: {
    Icon
  },
  data () {
    return {
      user: {},
      userProfile: {},
      content: '',
      file: '',
      isSuccess: false,
      upload: false
    }
  },
  methods: {
    onSelect (event) {
      this.file = event.target.files[0]
      console.log(event)
    },
    createPost () {
      const token = this.$store.state.user.token
      const formData = new FormData()
      if (this.file == null) {
        formData.append('content', this.content)
      } else {
        formData.append('content', this.content)
        formData.append('image', this.file, this.file.name)
      }
      axios.post('http://localhost:3000/api/post/', formData, {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then((response) => {
          console.log(response)
          this.isSuccess = true
        })
        .catch((error) => console.log(error))
    }
  },
  mounted: function () {
    // console.log('PostInput.vue', this.$store.state.user.picture)
    if (this.$store.state.user.userId === -1) {
      this.$router.push('/signup')
    }
  }
}
</script>

<style scoped>
.posting {
  border: 3px solid #ffc074;
  border-radius: 35px;
  padding: 10px;
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  align-items: center;
  margin: 16px  0px;
  gap: 16px;
  width: 700px;
}
/* .form-row {
  padding: 10px;
  border-radius: 35px;
  align-items: center;
  width: 600px;
}; */
.column {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.upload {
  width: 700px;
}
#image {
  width: 500px;
}
</style>
