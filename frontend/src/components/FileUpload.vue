<template>
  <div class="file">
    <h3>Modifier ma photo</h3>
    <form @submit.prevent="onSubmit" enctype="multipart/form-data">
      <div class="form-row">
        <label>
          <input type="file" name="image" id="image" @change="onSelect ($event)"/>
        </label><br>
      </div>
      <div class="form-row">
        <button class="button">Valider</button>
      </div>
    </form>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'FileUpload',
  data () {
    return {
      user: {},
      FILE: ''
    }
  },
  methods: {
    onSelect (event) {
      this.FILE = event.target.files[0]
      console.log(event)
    },
    onSubmit () {
      const token = this.$store.state.user.token
      const fd = new FormData()
      fd.append('image', this.FILE, this.FILE.name)
      axios.put(`http://localhost:3000/api/user/profile/${this.$store.state.user.userId}`,
        fd,
        {
          headers: {
            Authorization: `Bearer ${token}`
            // 'Content-Type': 'multipart/form-data'
          }
        }
      ).then(function () {
        console.log('SUCCES !!')
      }).catch(function () {
        console.log('ECHEC !!')
      })
    }
  }
}
</script>
