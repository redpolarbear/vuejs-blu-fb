import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase'
import _ from 'lodash'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null,
    profile: null,
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
          displayName: payload._id,
          photoURL: payload.photoURL
        })
        await Promise.all([newUser, newUserProfile])
        if (newUser) {
          const user = {
            ..._.omit(payload, 'password'),
            uid: newUser.uid
          }
          firebase.database().ref('usersProfile').child(payload._id).update({
            ...user,
            createdAt: firebase.database.ServerValue.TIMESTAMP,
            updatedAt: firebase.database.ServerValue.TIMESTAMP
          })
          commit('setLoading', false)
          commit('setUser', user)
        }
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
    async signUserIn ({commit}, payload) {
      commit('setLoading', true)
      commit('clearError')
      try {
        const user = await firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
        if (user) {
          const userProfile = await firebase.database().ref('usersProfile/' + user.displayName).once('value')
          commit('setLoading', false)
          commit('setUser', userProfile.val())
        }
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
    async autoSignIn ({commit}, payload) {
      const userProfile = await firebase.database().ref('usersProfile/' + payload.displayName).once('value')
      commit('setUser', userProfile.val())
    },
    logout ({commit}) {
      firebase.auth().signOut()
      commit('setUser', null)
    },
    clearError ({commit}) {
      commit('clearError')
    },
    async loadUserProfile ({commit}, payload) {
      commit('setLoading', true)
      commit('clearError')
      try {
        const userProfile = await firebase.database().ref('usersProfile/' + payload.id).once('value')
        commit('setLoading', false)
        if (userProfile.val()) {
          commit('setProfile', userProfile.val())
        } else {
          commit('setError', 'User Profile was not found.')
        }
      } catch (error) {
        // Handle Errors here.
        let errorMessage = error.message
        commit('setLoading', false)
        commit('setError', errorMessage)
        console.log(error)
      }
    }
  }
})

