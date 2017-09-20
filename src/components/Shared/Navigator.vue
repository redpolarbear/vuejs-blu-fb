<template>
  <nav class="nav has-shadow">
    <div class="container">
      <div class="nav-left">
        <!-- <a class="nav-item" href="../index.html">
          <img src="../images/bulma.png" alt="Description">
        </a> -->
      </div>
      <span class="nav-toggle">
        <span></span>
        <span></span>
        <span></span>
      </span>
      <div class="nav-right nav-menu">
        <router-link
          tag="a" 
          class="nav-item is-tab" 
          v-for="item in menuItems" 
          :key="item.title" 
          :to="item.link" 
          active-class='is-active' 
          exact>
            <i class="fa" v-bind:class="item.icon"></i>
            &nbsp; {{ item.title }}
        </router-link>
        <span class="nav-item">
          <a class="button">
            Log in
          </a>
          <a class="button is-info">
            Sign Up
          </a>
        </span>
      </div>
    </div>
  </nav>
  <!-- <nav class="nav has-shadow">
    <div class="container">
      <div class="nav-left">
        
      </div>
      <div class="nav-center">
        <a class="nav-item" href="#">
          <span class="icon">
            <i class="fa fa-twitter"></i>
          </span>
        </a>
      </div>
      <span class="nav-toggle">
        <span></span>
        <span></span>
        <span></span>
      </span>
      <div class="nav-right nav-menu">
        
      </div>
    </div>
  </nav> -->
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'navigator',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  computed: {
    ...mapGetters['getUser'],
    menuItems () {
      let menuItems = [
        { icon: 'fa-home', title: 'Home', link: '/' }
      ]
      if (this.userIsAuthenticated) {
        menuItems = [
        { icon: 'fa-home', title: 'Home', link: '/' },
        { icon: 'fa-bolt', title: 'Moments', link: '/moments' },
        { icon: 'fa-bell-o', title: 'Notifications', link: '/notifications' },
        { icon: 'fa-envelope', title: 'Messages', link: '/messages' }
        ]
      }
      return menuItems
    }
  },
  userIsAuthenticated () {
    return this.getUser !== null && this.getUser !== undefined
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
