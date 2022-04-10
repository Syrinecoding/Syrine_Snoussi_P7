import { createStore } from 'vuex'

const axios = require('axios')

const instance = axios.create({
  baseURL: 'http://localhost:3000/api/'
})

export default createStore({
  state: {
    status: '',
    user: {
      userId: -1,
      token: ''
    },
    userProfile: {
      userId: Number,
      username: '',
      picture: '',
      position: '',
      isAdmin: ''
    }
  },
  getters: {
  },
  mutations: {
    setStatus: function (state, status) {
      state.status = status
    },
    logUser: function (state, user) {
      instance.defaults.headers.common.Authorization = user.token
      state.user = user
    },
    userProfile: function (state, userProfile) {
      state.userProfile = userProfile
    }
  },
  actions: {
    logIn: ({ commit }, user) => {
      commit('setStatus', 'loading')
      // TODO ne faut-il pas utiliser un await pour attendre que user ait fini de taper ?
      return new Promise((resolve, reject) => {
        instance.post('/user/login', user)
          .then(function (response) {
            // console.log(response.data)
            // console.log(user)
            commit('setStatus', '')
            commit('logUser', response.data)
            resolve(response)
          })
          .catch(function (error) {
            console.log(error)
            commit('setStatus', 'error_login')
            reject(error)
          })
      })
    },
    signUp: ({ commit }, user) => {
      commit('setStatus', 'loading')
      return new Promise((resolve, reject) => {
        instance.post('/user/signup', user)
          .then(function (response) {
            // console.log(response.data)
            // console.log(user)
            commit('setStatus', 'created')
            resolve(response)
          })
          .catch(function (error) {
            console.log(error)
            commit('setStatus', 'error_create')
            reject(error)
          })
      })
    },
    getUserInfos: ({ commit }) => {
      instance.get('/user/profile/:userId')
        .then(function (response) {
          // console.log(response.data)
          // console.log(user)
          commit('userProfile', response.data.userId)
        })
        .catch(function (error) {
          console.log(error)
          commit('userProfile', 'error_profile')
        })
    }
  },
  modules: {
  }
})
