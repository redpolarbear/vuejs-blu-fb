
import * as firebase from 'firebase'
import _ from 'lodash'
import * as types from '../../../types'

const state = {
  collections: []
  // addingLock: false
}

const getters = {
  GET_COLLECTIONS: (state) => {
    return state.collections
  }
  // GET_ADDING_LOCK: (state) => {
  //   return state.addingLock
  // },
  // GET_COLLECTION_BY_NAME: (state) => {
  //   return (name) => {
  //     return state.collections.find(e => e.collection.name === name)
  //   }
  // }
}

const mutations = {
  SET_COLLECTIONS (state, payload) {
    state.collections = payload
  },
  // SET_ADDING_LOCK (state, payload) {
  //   state.addingLock = payload
  // },
  ADD_ONE_EMPTY_COLLECTION (state) {
    state.collections.push({
      collection: { name: '' },
      isChecked: false,
      isEditing: true,
      isExisted: false,
      isLoading: false
    })
  },
  REMOVE_ONE_COLLECTION (state, payload) {
    state.collections.splice(payload.index, 1)
  },
  // REFRESH_THE_COLLECTIONS (state, payload) {
  //   state.collections = [...state.collections.slice(0, payload.index), state.collections[payload.index], ...state.collections.slice(payload.index + 1)]
  // },
  UPDATE_ONE_COLLECTION (state, payload) {
    state.collections[payload.index] = Object.assign({}, _.omit(payload, 'index'))
      // collection: payload.collection,
    //   isChecked: payload.isChecked,
    //   isEditing: payload.isEditing,
    //   isExisted: payload.isExisted
    // })
    // state.collections[payload.index] = Object.assign({}, { collection: payload.collection, isEditing: payload.isEditing })
    state.collections = [...state.collections.slice(0, payload.index), state.collections[payload.index], ...state.collections.slice(payload.index + 1)]
  },
  ENABLE_COLLECTION_EDITING (state, payload) {
    state.collections[payload.index].isEditing = true
    state.collections = [...state.collections.slice(0, payload.index), state.collections[payload.index], ...state.collections.slice(payload.index + 1)]
  },
  DISABLE_COLLECTION_EDITING (state, payload) {
    state.collections[payload.index].isEditing = false
    state.collections = [...state.collections.slice(0, payload.index), state.collections[payload.index], ...state.collections.slice(payload.index + 1)]
  },
  TOGGLE_COLLECTION_CHECK (state, payload) {
    state.collections[payload.index].isChecked = !state.collections[payload.index].isChecked
    // commit('REFRESH_THE_COLLECTIONS', payload)
    state.collections = [...state.collections.slice(0, payload.index), state.collections[payload.index], ...state.collections.slice(payload.index + 1)]
  },
  ENABLE_COLLECTION_LOADING (state, payload) {
    state.collections[payload.index].isLoading = true
    state.collections = [...state.collections.slice(0, payload.index), state.collections[payload.index], ...state.collections.slice(payload.index + 1)]
  },
  DISABLE_COLLECTION_LOADING (state, payload) {
    state.collections[payload.index].isLoading = false
    state.collections = [...state.collections.slice(0, payload.index), state.collections[payload.index], ...state.collections.slice(payload.index + 1)]
  }
}

const actions = {
  async LOAD_COLLECTIONS_ASYNC ({commit, rootGetters}) { // TODO: try..catch...
    try {
      const usersCollections = await firebase.database().ref('userCollectionsBooks/' + rootGetters[types.USER].id).once('value')
      let usersCollectionsArray = Object.entries(usersCollections.val()).map(e => Object.assign({isEditing: false, isExisted: false, isChecked: false, isLoading: false}, {collection: e[1]}))
      // let arr = Object.entries(usersCollections).map(e => Object.assign(e[1], { key: e[0] }))
      commit('SET_COLLECTIONS', usersCollectionsArray)
      // commit('SET_COLLECTIONS', Object.assign({}, usersCollections.val()))
    } catch (error) {
    }
  },
  async SAVE_ONE_COLLECTION_INTO_FB ({state, commit, rootGetters}, payload) { // TODO: try {} catch (error) {}
    commit('ENABLE_COLLECTION_LOADING', { index: payload.index })
    let collectionKey = ''
    let collection = {}
    if (payload.collection.uid) {
      collectionKey = payload.collection.uid
      collection[collectionKey] = {
        ...payload.collection,
        updatedAt: firebase.database.ServerValue.TIMESTAMP
      }
    } else {
      collectionKey = firebase.database().ref('userCollectionsBooks/' + rootGetters[types.USER].id).push().key
      collection[collectionKey] = {
        name: payload.collection.name,
        uid: collectionKey,
        createdAt: firebase.database.ServerValue.TIMESTAMP,
        updatedAt: firebase.database.ServerValue.TIMESTAMP
      }
    }
    await firebase.database().ref('userCollectionsBooks').child(rootGetters[types.USER].id).update(collection)
    commit('UPDATE_ONE_COLLECTION', {
      collection: collection[collectionKey],
      index: payload.index,
      isChecked: false,
      isEditing: false,
      isExisted: false,
      isLoading: false
    })
    commit('DISABLE_COLLECTION_LOADING', { index: payload.index })
  },
  async REMOVE_ONE_COLLECTION_FROM_FB ({commit, rootGetters}, payload) {
    await firebase.database().ref('userCollectionsBooks/' + rootGetters[types.USER].id + '/' + payload.collection.uid).remove()
    commit('REMOVE_ONE_COLLECTION', { index: payload.index })
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
