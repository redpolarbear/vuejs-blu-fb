
import * as firebase from 'firebase'
import * as types from '../../../types'

const state = {
  collections: []
}

const getters = {
  GET_COLLECTIONS: (state) => {
    return state.collections
  }
}

const mutations = {
  SET_COLLECTIONS (state, payload) {
    state.collections = payload
  },
  ADD_ONE_COLLECTION (state, payload) {
    state.collections.push(payload)
  },
  REMOVE_ONE_COLLECTION (state, payload) {
  }
}

const actions = {
  async LOAD_COLLECTIONS_ASYNC ({commit, rootGetters}) {
    // const userId = rootGetters[types.USER].id
    // console.log(userId)
    try {
      const usersCollections = await firebase.database().ref('userCollectionsBooks/' + rootGetters[types.USER].id).once('value')
      // let usersCollectionsArray = Object.entries(usersCollections.val()).map(e => Object.assign({}, e[1]))
      // let arr = Object.entries(usersCollections).map(e => Object.assign(e[1], { key: e[0] }))
      console.log(usersCollections.val())
      // console.log(usersCollectionsArray)
      // commit('SET_COLLECTIONS', usersCollectionsArray)
      commit('SET_COLLECTIONS', Object.assign({}, usersCollections.val()))
    } catch (error) {

    }
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
