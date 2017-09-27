import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase'
import _ from 'lodash'
import shortid from 'shortid'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null,
    profile: null,
    isFollowing: false,
    loading: false,
    error: null
  },
  mutations: {
    setUser (state, payload) {
      state.user = payload
    },
    setProfile (state, payload) {
      state.profile = payload
    },
    setIsFollowing (state, payload) {
      state.isFollowing = payload
    },
    setLoading (state, payload) {
      state.loading = payload
    },
    setError (state, payload) {
      state.error = payload
    },
    clearError (state) {
      state.error = null
    }
  },
  getters: {
    getUser: (state) => {
      return state.user
    },
    getProfile: (state) => {
      return state.profile
    },
    getIsFollowing: (state) => {
      return state.isFollowing
    },
    getLoading: (state) => {
      return state.loading
    },
    getError: (state) => {
      return state.error
    }
  },
  actions: {
    async signUserUp ({commit}, payload) {
      commit('setLoading', true)
      commit('clearError')
      try {
        const newUser = await firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
        const newUserProfile = await newUser.updateProfile({
          displayName: payload.id,
          photoURL: payload.photoURL
        })
        await Promise.all([newUser, newUserProfile])
        if (newUser) {
          const user = {
            ..._.omit(payload, 'password'),
            uid: newUser.uid
          }
          firebase.database().ref('usersProfile').child(payload.id).update({
            ...user,
            createdAt: firebase.database.ServerValue.TIMESTAMP,
            updatedAt: firebase.database.ServerValue.TIMESTAMP
          })
          commit('setUser', user)
        }
        commit('setLoading', false)
      } catch (error) {
        // Handle Errors here.
        var errorCode = error.code
        var errorMessage = error.message
        // [START_EXCLUDE]
        if (errorCode === 'auth/weak-password') {
          errorMessage = 'The password is too weak.'
        }
        commit('setLoading', false)
        commit('setError', errorMessage)
        console.log(error)
      }
    },
    async signUserIn ({commit, dispatch}, payload) {
      commit('setLoading', true)
      commit('clearError')
      try {
        const user = await firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
        if (user) {
          commit('setUser', await dispatch('loadProfileByDefault', user.displayName))
        }
        commit('setLoading', false)
      } catch (error) {
        // Handle Errors here.
        let errorCode = error.code
        let errorMessage = error.message
        // [START_EXCLUDE]
        if (errorCode === 'auth/wrong-password') {
          errorMessage = 'Wrong password.'
        }
        commit('setLoading', false)
        commit('setError', errorMessage)
        console.log(error)
      }
    },
    async loadProfileByDefault ({commit, state}, id) {
      try {
        // load the profile
        const userProfile = firebase.database().ref('usersProfile/' + id).once('value')
        // load the followings and the followers
        const userFollowings = firebase.database().ref('followings/' + id).once('value')
        const userFollowers = firebase.database().ref('followers/' + id).once('value')
        const values = await Promise.all([userProfile, userFollowings, userFollowers])
        // if the id is valid but the user does not exist, return null
        return Promise.resolve(values[0].val() ? {...(Object.assign({}, values[0].val())),
          followingsNo: values[1].numChildren() || 0,
          followersNo: values[2].numChildren() || 0} : null)
      } catch (error) {
        // Handle Errors here.
        let errorMessage = error.message
        commit('setError', errorMessage)
        console.log(error)
      }
    },
    async autoSignIn ({commit, dispatch}, payload) {
      commit('setUser', await dispatch('loadProfileByDefault', payload.displayName))
    },
    logout ({commit}) {
      firebase.auth().signOut()
      commit('setUser', null)
      commit('setProfile', null)
    },
    clearError ({commit}) {
      commit('clearError')
    },
    async loadUserProfileById ({commit, state, dispatch}, payload) {
      commit('setLoading', true)
      commit('clearError')
      try {
        if (shortid.isValid(payload.id)) {
          // if the payload.id is valid, load the profile of the user whose profile page is being visited, setup the userId = payload.id
          commit('setProfile', await dispatch('loadProfileByDefault', payload.id))
        } else {
          // the payload.id is invalid, return null
          commit('setProfile', null)
        }
        commit('setLoading', false)
      } catch (error) {
        // Handle Errors here.
        let errorMessage = error.message
        commit('setLoading', false)
        commit('setError', errorMessage)
        console.log(error)
      }
    },
    async followUser ({commit, state}, payload) {
      commit('setLoading', true)
      commit('clearError')
      // check the payload.id is valid
      if (shortid.isValid(payload.id)) {
        try {
          // check if the user who is going to follow exists - db.ref('usersProfile').hasChild('payload.id')
          const usersProfile = await firebase.database().ref('usersProfile/' + payload.id).once('value')
          // console.log(usersProfile.hasChild(payload.id))
          if (usersProfile.val()) {
            const addFollowings = firebase.database().ref('followings/' + state.user.id).child(payload.id).set(true)
            const addFollowers = firebase.database().ref('followers/' + payload.id).child(state.user.id).set(true)
            await Promise.all([addFollowings, addFollowers])
          }
        } catch (error) {
          // Handle Errors here.
          let errorMessage = error.message
          commit('setLoading', false)
          commit('setError', errorMessage)
          console.log(error)
        }
      }
      commit('setLoading', false)
    },
    async unfollowUser ({commit, state}, payload) {
    },
    async relationshipChk ({commit, state}, payload) {
      try {
        const myFollowings = await firebase.database().ref('followings/' + payload.authUserId + '/' + payload.id).once('value')
        console.log(myFollowings.val())
        commit('setIsFollowing', !!myFollowings.val())
      } catch (error) {
        // Handle Errors here.
        let errorMessage = error.message
        commit('setError', errorMessage)
      }
    }
  }
})

