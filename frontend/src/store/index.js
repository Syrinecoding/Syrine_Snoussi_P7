import { createStore } from 'vuex'

const axios = require('axios')

const instance = axios.create({
  baseURL: 'http://localhost:3000/api/'
})

export default createStore({
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
    signUp: ({ commit }, user) => {
      return new Promise((resolve, reject) => {
        instance.post('/user/signup', user)
          .then(function (response) {
            console.log(response.data)
            console.log(user)
            commit('setUser', response.data.username)
            resolve(response)
          })
          .catch(function (error) {
            console.log(error)
            reject(error)
          })
      })
    }
  },
  modules: {
  }
})
