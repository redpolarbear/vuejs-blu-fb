
import * as firebase from 'firebase'
import * as types from '../../../types'

const state = {
  collections: [],
  addingLock: false
}

const getters = {
  GET_COLLECTIONS: (state) => {
    return state.collections
  },
  GET_ADDING_LOCK: (state) => {
    return state.addingLock
  }
}

const mutations = {
  SET_COLLECTIONS (state, payload) {
    state.collections = payload
  },
  SET_ADDING_LOCK (state, payload) {
    state.addingLock = payload
  },
  ADD_ONE_EMPTY_COLLECTION (state) {
    // state.collections = state.collections.concat([{ isEditing: true, name: '' }])
    state.collections.push({ name: '', isEditing: true })
  },
  REMOVE_ONE_EMPTY_COLLECTION (state, payload) {
    state.collections.splice(payload.index, 1)
  },
  UPDATE_ONE_COLLECTION (state, payload) {
    // state.collections = Object.assign({}, state.collections, state.collections.map((e, i) => {
    //   if (i === payload.index) {
    //     return Object.assign({}, { name: payload.name, isEditing: false })
    //   }
    // }))
    state.collections[payload.index] = {
      name: payload.name,
      isEditing: false
    }
    state.collections = [...state.collections.slice(0, payload.index), state.collections[payload.index], ...state.collections.slice(payload.index + 1)]
  },
  TOGGLE_COLLECTION_EDITING (state, payload) {
    state.collections[payload.index].isEditing = !state.collections[payload.index].isEditing
    state.collections = [...state.collections.slice(0, payload.index), state.collections[payload.index], ...state.collections.slice(payload.index + 1)]
    // state.collections = state.collections.map((e, i) => {
    //   console.log(i)
    //   if (i === payload) {
    //     return Object.assign({}, e, {
    //       isEditing: !e.isEditing
    //     })
    //   }
    // })
  }
}

const actions = {
  async LOAD_COLLECTIONS_ASYNC ({commit, rootGetters}) {
    try {
      const usersCollections = await firebase.database().ref('userCollectionsBooks/' + rootGetters[types.USER].id).once('value')
      let usersCollectionsArray = Object.entries(usersCollections.val()).map(e => Object.assign({ isEditing: false }, e[1]))
      // let arr = Object.entries(usersCollections).map(e => Object.assign(e[1], { key: e[0] }))
      // console.log(usersCollections.val())
      // console.log(Object.entries(usersCollections.val()))
      // console.log(usersCollectionsArray)
      commit('SET_COLLECTIONS', usersCollectionsArray)
      // commit('SET_COLLECTIONS', Object.assign({}, usersCollections.val()))
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
