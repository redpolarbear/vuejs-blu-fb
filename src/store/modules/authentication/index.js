import * as firebase from 'firebase'
import _ from 'lodash'
import * as types from '../../types'

const state = {
  user: null,
  showLogin: false,
  showSignup: false
}

const getters = {
  GET_USER: (state) => {
    return state.user
  }
}

const mutations = {
  SET_USER (state, payload) {
    state.user = payload
  },
  TOGGLE_LOGIN_MODAL (state, payload) {
    state.showLogin = payload
  },
  TOGGLE_SIGNUP_MODAL (state, payload) {
    state.showSignup = payload
  }
}

const actions = {
  async USER_SIGNUP ({ state, commit, dispatch }, payload) {
    commit(types.SET_LOADING, true)
    commit(types.CLEAR_ERROR)
    try {
      const newUser = await firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
      // const newUserProfile = await newUser.updateProfile({
      await newUser.updateProfile({
        displayName: payload.id,
        photoURL: payload.photoURL
      })
      // await Promise.all([newUser, newUserProfile])
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
        await dispatch('loadProfileByDefault', payload.id)
        commit(types.SET_USER, state.userInfo)
      }
      commit(types.SET_LOADING, false)
      commit(types.TOGGLE_SIGNUP_MODAL, false)
    } catch (error) {
      // Handle Errors here.
      var errorCode = error.code
      var errorMessage = error.message
      // [START_EXCLUDE]
      if (errorCode === 'auth/weak-password') {
        errorMessage = 'The password is too weak.'
      }
      commit(types.SET_LOADING, false)
      commit(types.TOGGLE_SIGNUP_MODAL, false)
      commit(types.SET_ERROR, errorMessage)
      console.log(error)
    }
  },
  async USER_LOGIN ({state, commit, dispatch}, payload) {
    commit(types.SET_LOADING, true)
    commit(types.CLEAR_ERROR)
    try {
      const user = await firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
      if (user) {
        await dispatch('loadProfileByDefault', user.displayName)
        commit(types.SET_USER, state.userInfo)
      }
      commit(types.SET_LOADING, false)
      commit(types.TOGGLE_LOGIN_MODAL, false)
    } catch (error) {
      // Handle Errors here.
      let errorCode = error.code
      let errorMessage = error.message
      // [START_EXCLUDE]
      if (errorCode === 'auth/wrong-password') {
        errorMessage = 'Wrong password.'
      }
      commit(types.SET_LOADING, false)
      commit(types.TOGGLE_LOGIN_MODAL, false)
      commit(types.SET_ERROR, errorMessage)
      console.log(error)
    }
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
