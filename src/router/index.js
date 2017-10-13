import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/components/Home'
import Profile from '@/components/User/Profile'
import BookSearching from '@/components/Library/Book/BookSearching'

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
      path: '/profile/:id?',
      name: 'Profile',
      props: true,
      component: Profile
    },
    {
      path: '/library/book/search',
      name: 'BookSearching',
      component: BookSearching
    }
  ]
})
