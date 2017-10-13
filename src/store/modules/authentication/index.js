import * as firebase from 'firebase'
import _ from 'lodash'
import * as types from '../../types'
import profile from './profile/index'

const state = {
  user: null,
  showLogin: false,
  showSignup: false
}

const getters = {
  GET_USER: (state) => {
    return state.user
  },
  GET_LOGIN_MODAL: (state) => {
    return state.showLogin
  },
  GET_SIGNUP_MODAL: (state) => {
    return state.showSignup
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
  async USER_SIGNUP ({commit, dispatch, rootGetters}, payload) {
    commit(types.SET_LOADING, true, { root: true })
    commit(types.CLEAR_ERROR, null, { root: true })
    try {
      const newUser = await firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
      await newUser.updateProfile({
        displayName: payload.id,
        photoURL: payload.photoURL
      })
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
        await dispatch(types.ACTION_LOAD_USER_INFO_ASYNC, payload.id, { root: true })
        commit('SET_USER', rootGetters[types.USER_INFO])
      }
      commit(types.SET_LOADING, false, { root: true })
      commit('TOGGLE_SIGNUP_MODAL', false)
    } catch (error) {
      // Handle Errors here.
      var errorCode = error.code
      var errorMessage = error.message
      // [START_EXCLUDE]
      if (errorCode === 'auth/weak-password') {
        errorMessage = 'The password is too weak.'
      }
      commit(types.SET_LOADING, false, { root: true })
      commit('TOGGLE_SIGNUP_MODAL', false)
      commit(types.SET_ERROR, errorMessage, { root: true })
      console.log(error)
    }
  },
  async USER_LOGIN ({commit, dispatch, rootGetters}, payload) {
    commit(types.SET_LOADING, true, { root: true })
    commit(types.CLEAR_ERROR, null, { root: true })
    try {
      const user = await firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
      if (user) {
        await dispatch(types.ACTION_LOAD_USER_INFO_ASYNC, user.displayName, { root: true })
        // commit(types.SET_USER, state.userInfo)
        commit('SET_USER', rootGetters[types.USER_INFO])
      }
      commit(types.SET_LOADING, false, { root: true })
      commit('TOGGLE_LOGIN_MODAL', false)
    } catch (error) {
      // Handle Errors here.
      let errorCode = error.code
      let errorMessage = error.message
      // [START_EXCLUDE]
      if (errorCode === 'auth/wrong-password') {
        errorMessage = 'Wrong password.'
      }
      commit(types.SET_LOADING, false, { root: true })
      commit('TOGGLE_LOGIN_MODAL', false)
      commit(types.SET_ERROR, errorMessage, { root: true })
      console.log(error)
    }
  },
  async AUTO_SIGNIN ({commit, dispatch, rootGetters}, payload) {
    await dispatch(types.ACTION_LOAD_USER_INFO_ASYNC, payload.displayName, { root: true })
    // commit(types.SET_USER, state.userInfo)
    commit('SET_USER', rootGetters[types.USER_INFO])
  },
  USER_LOGOUT ({commit}) {
    firebase.auth().signOut()
    commit('SET_USER', null)
    commit(types.SET_USER_PROFILE, null, { root: true })
    commit(types.SET_USER_INFO, null, { root: true })
  }
}

export default {
  state,
  getters,
  mutations,
  actions,
  modules: {
    profile: {
      namespaced: true,
      ...profile
    }
  }
}
