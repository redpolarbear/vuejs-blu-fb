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
          <!-- <app-login :showLogin="showLogin" @closeLogin="showLogin=$event"></app-login> -->
          <app-login :showLogin="getShowLogin"></app-login>
          <a class="button is-info" @click="toggleSignup">
            Sign Up
          </a>
          <app-signup :showSignup="getShowSignup"></app-signup>
        </span>
        <!-- <router-link tag="a" class="nav-item is-tab" v-if="userIsAuthenticated" to="/profile" exact>
          <img :src="getUser.photoURL" class="avatar-photo">
        </router-link> -->
        <span class="nav-item is-tab" v-if="userIsAuthenticated">
          <dropdown trigger="hover">
            <a class="button is-white">
              <img :src="getUser.photoURL" class="avatar-photo">
              <span class="icon is-small">
                <i class="fa fa-angle-down"></i>
              </span>
            </a>
            <div slot="content">
              <menus>
                <menu-item icon="user" to="/profile">My Profile</menu-item>
                <div class="divider"></div>
                <menu-item icon="sign-out" :click="onLogout">Log out</menu-item>
              </menus>
            </div>
          </dropdown>
        </span>
        <span class="nav-item" v-if="userIsAuthenticated">
          <a class="button is-primary" @click="onLogout">
            Publish
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
    }
  },
  computed: {
    ...mapGetters(['getUser', 'getShowLogin', 'getShowSignup']),
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
      this.$store.commit('toggleShowLogin', true)
    },
    toggleSignup () {
      this.$store.commit('toggleShowSignup', true)
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
