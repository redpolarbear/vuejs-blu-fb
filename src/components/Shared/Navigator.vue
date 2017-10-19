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
          <a class="button is-primary">
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

import * as types from '../../store/types'

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
    ...mapGetters({
      getUser: types.USER,
      getShowLogin: types.LOGIN_MODAL,
      getShowSignup: types.SIGNUP_MODAL,
      getError: types.ERROR,
      getSuccess: types.SUCCESS,
      getInfo: types.INFO
    }),
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
  watch: {
    getError: function (errorMessage) {
      if (errorMessage) {
        this.$notify.open({
          content: errorMessage,
          placement: 'bottom-center',
          transition: 'slideUp',
          type: 'danger',
          duration: 2500
          // closable: false
        })
        this.$store.commit(types.CLEAR_ERROR)
      }
    },
    getSuccess: function (successMessage) {
      if (successMessage) {
        this.$notify.open({
          content: successMessage,
          placement: 'top-center',
          transition: 'slideDown',
          type: 'success',
          duration: 2500
          // closable: false
        })
        this.$store.commit(types.CLEAR_SUCCESS)
      }
    },
    getInfo: function (infoMessage) {
      if (infoMessage) {
        this.$notify.open({
          content: infoMessage,
          placement: 'top-center',
          transition: 'slideDown',
          type: 'warning',
          duration: 2500
          // closable: false
        })
        this.$store.commit(types.CLEAR_INFO)
      }
    }
  },
  methods: {
    toggleLogin () {
      this.$store.commit(types.TOGGLE_LOGIN_MODAL, true)
    },
    toggleSignup () {
      this.$store.commit(types.TOGGLE_SIGNUP_MODAL, true)
    },
    onLogout () {
      this.$store.dispatch(types.ACTION_USER_LOGOUT)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
