import * as firebase from 'firebase'
import * as types from '../../types'

const state = {
  userProfile: null,
  userInfo: null,
  isFollowing: false
}

const getters = {
  GET_USER_PROFILE: (state) => {
    return state.userProfile
  },
  GET_IS_FOLLOWING: (state) => {
    return state.isFollowing
  }
}

const mutations = {
  SET_USER_INFO (state, payload) {
    state.userInfo = payload
  },
  SET_USER_PROFILE (state, payload) {
    state.userProfile = payload
  },
  SET_IS_FOLLOWING (state, payload) {
    state.isFollowing = payload
  }
}

const actions = {
  async LOAD_USER_PROFILE_ASYNC ({commit, state}, id) {
    try {
      // load the profile
      const userProfile = firebase.database().ref('usersProfile/' + id).once('value')
      // load the followings and the followers
      const userFollowings = firebase.database().ref('followings/' + id).once('value')
      const userFollowers = firebase.database().ref('followers/' + id).once('value')
      const values = await Promise.all([userProfile, userFollowings, userFollowers])
      // if the id is valid but the user does not exist, return null
      commit(types.SET_USER_INFO, values[0].val() ? {...(Object.assign({}, values[0].val())),
        followingsNo: values[1].numChildren() || 0,
        followersNo: values[2].numChildren() || 0} : null)
    } catch (error) {
      // Handle Errors here.
      let errorMessage = error.message
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
