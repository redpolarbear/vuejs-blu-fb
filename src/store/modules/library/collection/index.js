
import * as firebase from 'firebase'
import _ from 'lodash'
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
  CLEAR_COLLECTIONS (state) {
    state.collections = []
  },
  ADD_ONE_EMPTY_COLLECTION (state) {
    state.collections.push({
      collection: { name: '' },
      meta: {
        booksNo: 0,
        isChecked: false,
        isEditing: true,
        isExisted: false,
        isLoading: false
      }
    })
  },
  REMOVE_ONE_COLLECTION (state, payload) {
    state.collections.splice(payload.index, 1)
  },
  UPDATE_ONE_COLLECTION (state, payload) {
    state.collections[payload.index] = Object.assign({}, _.omit(payload, 'index'))
    state.collections = [...state.collections.slice(0, payload.index), state.collections[payload.index], ...state.collections.slice(payload.index + 1)]
  },
  ENABLE_COLLECTION_EDITING (state, payload) {
    state.collections[payload.index].meta.isEditing = true
    state.collections = [...state.collections.slice(0, payload.index), state.collections[payload.index], ...state.collections.slice(payload.index + 1)]
  },
  DISABLE_COLLECTION_EDITING (state, payload) {
    state.collections[payload.index].meta.isEditing = false
    state.collections = [...state.collections.slice(0, payload.index), state.collections[payload.index], ...state.collections.slice(payload.index + 1)]
  },
  TOGGLE_COLLECTION_CHECK (state, payload) {
    state.collections[payload.index].meta.isChecked = !state.collections[payload.index].meta.isChecked
    state.collections = [...state.collections.slice(0, payload.index), state.collections[payload.index], ...state.collections.slice(payload.index + 1)]
  },
  ENABLE_COLLECTION_LOADING (state, payload) {
    state.collections[payload.index].meta.isLoading = true
    state.collections = [...state.collections.slice(0, payload.index), state.collections[payload.index], ...state.collections.slice(payload.index + 1)]
  },
  DISABLE_COLLECTION_LOADING (state, payload) {
    state.collections[payload.index].meta.isLoading = false
    state.collections = [...state.collections.slice(0, payload.index), state.collections[payload.index], ...state.collections.slice(payload.index + 1)]
  }
}

const actions = {
  async LOAD_COLLECTIONS_ASYNC ({commit, rootGetters}) { // TODO: try..catch...
    try {
      const usersCollections = await firebase.database().ref('userCollectionsBooks/' + rootGetters[types.USER].id).once('value')
      let usersCollectionsArray = Object.entries(usersCollections.val()).map(e => Object.assign({
        meta: {
          isEditing: false,
          isExisted: false,
          isChecked: false,
          isLoading: false,
          booksNo: e[1].books === null ? 0 : _.size(e[1].books)
        }
      }, {collection: e[1]}))
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
    if (payload.collection.uid) { // modify the name of the collection
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
      meta: {
        booksNo: payload.meta.booksNo,
        isChecked: false,
        isEditing: false,
        isExisted: false,
        isLoading: false
      }
    })
    commit('DISABLE_COLLECTION_LOADING', { index: payload.index })
  },
  async REMOVE_ONE_COLLECTION_FROM_FB ({commit, rootGetters}, payload) {
    await firebase.database().ref('userCollectionsBooks/' + rootGetters[types.USER].id + '/' + payload.collection.uid).remove()
    commit('REMOVE_ONE_COLLECTION', { index: payload.index })
  },
  async SAVE_THE_BOOK_INTO_COLLECTION_IN_FB ({state, commit, rootGetters}, payload) {
    const collectionUid = state.collections[payload.checkedIndex].collection.uid
    // check if the book is existed
    const collectionBooks = await firebase.database().ref('userCollectionsBooks/' + rootGetters[types.USER].id + '/' + collectionUid).child('books').once('value')
    if (collectionBooks.val()) { // already collected some books
      const collectionBooksArray = Object.entries(collectionBooks.val()).map(e => Object.assign({}, e[1]))
      const newBook = rootGetters[types.BOOK_INFO]
      const isExisted = collectionBooksArray.find(e => newBook.isbn10 === e.isbn10 || newBook.isbn13 === e.isbn13)
      if (isExisted !== undefined) {
        const infoMessage = 'You have already got this book.'
        commit(types.SET_INFO, infoMessage, { root: true })
        return
      }
    }
     // the collection is empty or never collect this book into this collection
    let update = {}
    const updateKey = firebase.database().ref('userCollectionsBooks/' + rootGetters[types.USER].id + '/' + collectionUid).child('books').push().key
    update['userCollectionsBooks/' + rootGetters[types.USER].id + '/' + collectionUid + '/books/' + updateKey] = rootGetters[types.BOOK_INFO]
    await firebase.database().ref().update(update)
    const successMessage = 'Successfully added.'
    commit(types.SET_SUCCESS, successMessage, { root: true })
    // await firebase.database().ref('userCollectionsBooks/' + rootGetters[types.USER].id + '/' + collectionUid + '/books').update({})
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
