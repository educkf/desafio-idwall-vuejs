import Vue from 'vue'
import Router from 'vue-router'
import Store from '@/store'

import Login from './views/Login.vue'
import Feed from './views/Feed.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login,
      beforeEnter: (to, from, next) => {
        Store.dispatch('checkToken').then((response) => {
          !response ? next() : next({ path: '/feed' })
        })
      }
    },
    {
      path: '/feed',
      name: 'Feed',
      component: Feed,
      beforeEnter: (to, from, next) => {
        Store.dispatch('checkToken').then((response) => {
          response ? next() : next({ path: '/' })
        })
      }
    }
  ]
})
