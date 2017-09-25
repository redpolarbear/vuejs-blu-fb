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
        <span class="nav-item" v-if="!userIsAuthenticated">
          <a class="button" @click="toggleLogin">
            Log in
          </a>
          <app-login :showLogin="showLogin" @closeLogin="showLogin=$event"></app-login>
          <a class="button is-info" @click="toggleSignup">
            Sign Up
          </a>
          <app-signup :showSignup="showSignup" @closeSignup="showSignup=$event"></app-signup>
        </span>
        <router-link tag="a" class="nav-item is-tab" v-if="userIsAuthenticated" to="/profile">
        <!-- <router-link tag="a" class="nav-item is-tab" v-if="userIsAuthenticated" :to="'/profile/' + getUser._id"> -->
          <img :src="getUser.photoURL" class="avatar-photo">
        </router-link>
        <span class="nav-item" v-if="userIsAuthenticated">
          <a class="button" @click="onLogout">
            Log out
          </a>
        </span>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapGetters } from 'vuex'
import LoginComponent from '../User/Login'
import SignupComponent from '../User/Signup'

export default {
  name: 'navigator',
  components: {
    'app-login': LoginComponent,
    'app-signup': SignupComponent
  },
  data () {
    return {
      showLogin: false,
      showSignup: false
    }
  },
  computed: {
    ...mapGetters(['getUser']),
    menuItems () {
      let menuItems = []
      if (this.userIsAuthenticated) {
        menuItems = [
          { icon: 'fa-home', title: 'Home', link: '/' },
          { icon: 'fa-bolt', title: 'Moments', link: '/moments' },
          { icon: 'fa-bell-o', title: 'Notifications', link: '/notifications' },
          { icon: 'fa-envelope', title: 'Messages', link: '/messages' }
        ]
      }
      return menuItems
    },
    userIsAuthenticated () {
      return this.getUser !== null && this.getUser !== undefined
    }
  },
  methods: {
    toggleLogin () {
      this.showLogin = !this.showLogin
    },
    toggleSignup () {
      this.showSignup = !this.showSignup
    },
    onLogout () {
      this.$store.dispatch('logout')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
