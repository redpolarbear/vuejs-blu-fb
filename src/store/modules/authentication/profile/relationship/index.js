import * as firebase from 'firebase'
import shortid from 'shortid'
import * as types from '../../../../types'

const state = {
  isFollowing: false
}

const getters = {
  GET_IS_FOLLOWING: (state) => {
    return state.isFollowing
  }
}

const mutations = {
  SET_IS_FOLLOWING (state, payload) {
    state.isFollowing = payload
  }
}

const actions = {
  async FOLLOW_THE_USER_ASYNC ({commit, rootGetters}, payload) {
    commit(types.SET_LOADING, true, { root: true })
    commit(types.CLEAR_ALL_MESSAGE, null, { root: true })
    // check the payload.id is valid
    if (shortid.isValid(payload.id)) {
      try {
        // check if the user who is going to follow exists - db.ref('usersProfile').hasChild('payload.id')
        const usersProfile = await firebase.database().ref('usersProfile/' + payload.id).once('value')
        // console.log(usersProfile.hasChild(payload.id))
        if (usersProfile.val()) {
          const addFollowings = firebase.database().ref('followings/' + rootGetters[types.USER].id).child(payload.id).set(true)
          const addFollowers = firebase.database().ref('followers/' + payload.id).child(rootGetters[types.USER].id).set(true)
          await Promise.all([addFollowings, addFollowers])
        }
      } catch (error) {
        // Handle Errors here.
        let errorMessage = error.message
        commit(types.SET_LOADING, false, { root: true })
        commit(types.SET_ERROR, errorMessage, { root: true })
        console.log(error)
      }
    }
    commit(types.SET_LOADING, false, { root: true })
  },
  async UNFOLLOW_THE_USER_ASYNC ({commit, rootGetters}, payload) {
    commit(types.SET_LOADING, true, { root: true })
    commit(types.CLEAR_ALL_MESSAGE, null, { root: true })
    // check the payload.id is valid
    if (shortid.isValid(payload.id)) {
      try {
        // check if the user who is going to follow exists - db.ref('usersProfile').hasChild('payload.id')
        const usersProfile = await firebase.database().ref('usersProfile/' + payload.id).once('value')
        // console.log(usersProfile.hasChild(payload.id))
        if (usersProfile.val()) {
          const addFollowings = firebase.database().ref('followings/' + rootGetters[types.USER].id).child(payload.id).set(null)
          const addFollowers = firebase.database().ref('followers/' + payload.id).child(rootGetters[types.USER].id).set(null)
          await Promise.all([addFollowings, addFollowers])
        }
      } catch (error) {
        // Handle Errors here.
        let errorMessage = error.message
        commit(types.SET_LOADING, false, { root: true })
        commit(types.SET_ERROR, errorMessage, { root: true })
        console.log(error)
      }
    }
    commit(types.SET_LOADING, false, { root: true })
  },
  RELATIONSHIP_CHECK ({commit, state}, payload) {
    try {
      // const myFollowings = await firebase.database().ref('followings/' + payload.authUserId + '/' + payload.id).once('value')
      firebase.database().ref('followings/' + payload.authUserId + '/' + payload.id).on('value', function (snapshot) {
        commit('SET_IS_FOLLOWING', !!snapshot.val())
      })
    } catch (error) {
      // Handle Errors here.
      let errorMessage = error.message
      commit(types.SET_ERROR, errorMessage, { root: true })
    }
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
