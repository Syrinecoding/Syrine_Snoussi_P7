<template>
  <div class="alert alert--success" v-if="isSuccess">
    Publication postée !
  </div>
  <div class="posting">
    <ProfileImg class="profileInit"/>
    <form @submit.prevent="createPost" enctype="multipart/form-data">
      <div class="form-row">
        <input type="text" class="form-row__input" placeholder="Votre titre" v-model="title">
      </div>
      <div class="form-row">
        <textarea
          id="content"
          class="form-row__input"
          v-model="content"
          v-on:keyup.enter="createPost"
          placeholder="Faites-nous rire !">
        </textarea>
      </div>
    </form>
    <div class="form-row push">
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
import ProfileImg from './ProfileImg.vue'
import axios from 'axios'
import { Icon } from '@iconify/vue'

export default {
  name: 'PostInput',
  components: {
    Icon,
    ProfileImg
  },
  data () {
    return {
      title: '',
      content: '',
      user: {},
      userProfile: {},
      file: '',
      isSuccess: false,
      upload: false
    }
  },
  methods: {
    onSelect (event) {
      this.FILE = event.target.files[0]
      console.log(event)
    },
    createPost () {
      const token = this.$store.state.user.token
      const formData = new FormData()
      if (this.FILE == null) {
        formData.append('title', this.title)
        formData.append('content', this.content)
      } else {
        formData.append('title', this.title)
        formData.append('content', this.content)
        formData.append('image', this.FILE, this.FILE.name)
      }
      axios.post('http://localhost:3000/api/post/', this.formData, {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then((response) => {
          console.log(response.data)
          this.isSuccess = true
          setTimeout(function (scope) {
            scope.isSuccess = false
          }, 2000, this)
          this.upload = false
          // this.$emit('newPost')
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
  margin: 16px  auto;
  gap: 16px;
}
.form-row__input {
  width: 480px;
}

/* media input et image a passer en max width 100% */
@media (max-width: 768px) {
  .push {
    margin-left: auto;
  }
  .form-row__input {
    width: 100%;
  }
  #image {
    font-size: small;
  }
}
</style>
