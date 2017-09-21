import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/components/Home'
import Profile from '@/components/User/Profile'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile
    }
  ]
})
