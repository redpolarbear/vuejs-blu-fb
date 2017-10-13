import * as firebase from 'firebase'
import shortid from 'shortid'
import * as types from '../../../types'
import relationship from './relationship'

const state = {
  userProfile: null,
  userInfo: null
}

const getters = {
  GET_USER_PROFILE: (state) => {
    return state.userProfile
  },
  GET_USER_INFO: (state) => {
    return state.userInfo
  }
}

const mutations = {
  SET_USER_INFO (state, payload) {
    state.userInfo = payload
  },
  SET_USER_PROFILE (state, payload) {
    state.userProfile = payload
  }
}

const actions = {
  async LOAD_USER_INFO_ASYNC ({commit}, id) {
    try {
      // load the profile
      const userProfile = firebase.database().ref('usersProfile/' + id).once('value')
      // load the followings and the followers
      const userFollowings = firebase.database().ref('followings/' + id).once('value')
      const userFollowers = firebase.database().ref('followers/' + id).once('value')
      const values = await Promise.all([userProfile, userFollowings, userFollowers])
      // if the id is valid but the user does not exist, return null
      commit('SET_USER_INFO', values[0].val() ? {...(Object.assign({}, values[0].val())),
        followingsNo: values[1].numChildren() || 0,
        followersNo: values[2].numChildren() || 0} : null)
    } catch (error) {
      // Handle Errors here.
      let errorMessage = error.message
      commit(types.SET_ERROR, errorMessage, { root: true })
      console.log(error)
    }
  },
  async LOAD_USER_PROFILE_BY_ID_ASYNC ({state, commit, dispatch}, payload) {
    commit(types.SET_LOADING, true, { root: true })
    commit(types.CLEAR_ERROR, null, { root: true })
    try {
      if (shortid.isValid(payload.id)) {
        // if the payload.id is valid, load the profile of the user whose profile page is being visited, setup the userId = payload.id
        await dispatch('LOAD_USER_INFO_ASYNC', payload.id)
        commit('SET_USER_PROFILE', state.userInfo)
      } else {
        // the payload.id is invalid, return null
        commit('SET_USER_PROFILE', null)
      }
      commit(types.SET_LOADING, false, { root: true })
    } catch (error) {
      // Handle Errors here.
      let errorMessage = error.message
      commit(types.SET_LOADING, false, { root: true })
      commit(types.SET_ERROR, errorMessage, { root: true })
      console.log(error)
    }
  }
}

export default {
  state,
  getters,
  mutations,
  actions,
  modules: {
    relationship: {
      namespaced: true,
      ...relationship
    }
  }
}
