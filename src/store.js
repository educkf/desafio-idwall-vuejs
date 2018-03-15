import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    email: '',
    token: '',
    dogs: {
      husky: [],
      labrador: [],
      hound: [],
      pug: []
    }
  },
  mutations: {
    SET_TOKEN (state, payload) {
      localStorage.setItem('token', payload)
      state.token = payload
    },

    SET_DOGS (state, payload) {
      state.dogs[payload.category] = [...payload.dogs]
    }
  },
  actions: {
    handleLogin({ dispatch, commit, state}, email) {
      return Axios({
        method: 'post',
        url: 'https://iddog-api.now.sh/signup',
        data: '',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
        },
        params: {
          email: email
        }
      }).then((result) => {
        commit('SET_TOKEN', result.data.user.token)
        return true

      }).catch((err) => {
        console.log(err)
        return false
      })
    },

    getData({ dispatch, commit, state}, category) {
      const cachedCategory = state.dogs[category].length
  
      if (cachedCategory === 0) {

        return Axios({
          method: 'get',
          url: 'https://iddog-api.now.sh/feed',
          data: '',
          headers: {
            'Authorization': state.token,
            'Content-Type': 'application/json; charset=utf-8',
          },
          params: {
            category
          }
        }).then((result) => {
          commit('SET_DOGS', {category, dogs: result.data.list})
          return true

        }).catch((err) => {
          console.log(err)
          return false

        })

      } 
    },

    checkToken({ dispatch, commit, state}) {
      const token = localStorage.getItem('token')
      if(token){
        commit('SET_TOKEN', token)
        return token
      }
      return false
    }
  }
})
