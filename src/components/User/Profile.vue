<template>
  <div class="container profile" v-if="profile">
    <div class="section profile-heading">
      <div class="columns">
        <div class="column is-2">
          <div class="image is-128x128 avatar">
            <img :src="profile.photoURL">
          </div>
        </div>
        <div class="column is-4 name">
          <p>
            <span class="title is-bold">{{ profile.displayName }}</span>
            <a class="button is-primary is-outlined follow" v-if="isMyself">Edit</a>
            <a class="button is-primary is-outlined follow" v-else>Follow</a>
          </p>
          <p class="tagline">{{ profile.about }}</p>
        </div>
        <div class="column is-2 followers has-text-centered">
          <p class="stat-val">129k</p>
          <p class="stat-key">followers</p>
        </div>
        <div class="column is-2 following has-text-centered">
          <p class="stat-val">2k</p>
          <p class="stat-key">following</p>
        </div>
        <div class="column is-2 likes has-text-centered">
          <p class="stat-val">29</p>
          <p class="stat-key">likes</p>
        </div>
      </div>
    </div>
    <div class="profile-options">
      <div class="tabs is-fullwidth">
        <ul>
          <li class="link is-active"><a><span class="icon"><i class="fa fa-list"></i></span> <span>My Lists</span></a></li>
          <li class="link"><a><span class="icon"><i class="fa fa-heart"></i></span> <span>My Likes</span></a></li>
          <li class="link"><a><span class="icon"><i class="fa fa-th"></i></span> <span>My Posts</span></a></li>
          <li class="link"><a><span class="icon"><i class="fa fa-bookmark"></i></span> <span>My Bookmarks</span></a></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
// import * as firebase from 'firebase'

export default {
  name: 'profile',
  data () {
    return {
    }
  },
  props: ['id'],
  computed: {
    ...mapGetters(['getProfile', 'getUser']),
    profile () {
      if (this.id === 'me' || this.id === null || this.id === undefined) {
        return this.getUser
      } else {
        this.$store.dispatch('loadUserProfile', { id: this.id })
        return this.getProfile
      }
    },
    isMyself () {
      if (this.getUser && this.profile) {
        console.log(this.getUser._id)
        console.log(this.profile._id)
        if (this.getUser._id === this.profile._id) {
          return true
        } else {
          return false
        }
      }
    }
  },
  methods: {
  }
}
</script>

<style scoped>
.container.profile {
  margin-top:50px;
}
.profile-heading {
  margin: 20px 0;
  padding-bottom: 30px;
}
.profile-heading .name {
  border-right: 1px solid #f1f1f1;
  margin:-30px 0;
  padding: 40px 30px 0 30px;
}
.profile-heading .followers, 
.profile-heading .following {
  border-right: 1px solid #f1f1f1;
  margin:-30px 0;
  padding: 70px 30px;
}
.profile-heading .likes {
  margin:-30px 0;
  padding: 70px 30px;
}
.profile-heading .stat-key {
  font-size: 20px;
  font-weight: 200;
}
.profile-heading .stat-val {
  font-size: 35px;
  font-weight: bold;
}
.profile-options {
  background-color: #f1f1f1;
  margin:-20px 0 20px 0;
}
.profile-options .link a {
  padding:18px;
  font-size: 18px;
}
.profile-options .link .icon {
  font-size: 16px;
  padding-top:2px;
}
.tagline {
  padding:20px 0;
  font-size: 16px;
  line-height: 1.4;
}
.avatar {
  float: right;
}
.follow {
  float: right;
}
.avatar img {
  border-radius: 200px;
}
p.title.is-bold {
  font-weight: bold;
}
.card .timestamp {
  float:right;
  color:#bbb;
}
</style>
