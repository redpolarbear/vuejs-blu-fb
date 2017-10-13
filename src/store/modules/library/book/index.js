import * as firebase from 'firebase'
import axios from 'axios'
import * as types from '../../../types'

const state = {
  bookInfo: null
}

const getters = {
  GET_BOOK_INFO: (state) => {
    return state.bookInfo
  }
}

const mutations = {
  SET_BOOK_INFO (state, payload) {
    state.bookInfo = payload
  }
}

const actions = {
  async SEARCH_BOOK_BY_ISBN_IN_FB_ASYNC ({commit}, payload) { // payload = { isbn: isbn } - validated
    commit(types.SET_LOADING, true, { root: true })
    commit(types.CLEAR_ERROR, null, { root: true })
    let child = ''
    if (payload.isbn.length === 10) {
      child = 'isbn10'
    } else if (payload.isbn.length === 13) {
      child = 'isbn13'
    }
    try {
      const bookSnapshot = await firebase.database().ref('book').orderByChild(child).equalTo(payload.isbn).once('value')
      if (bookSnapshot.val()) {
        bookSnapshot.forEach(childSnapshot => {
          commit('SET_BOOK_INFO', Object.assign({}, childSnapshot.val()))
          return true
        })
      } else {
        commit('SET_BOOK_INFO', null)
      }
      commit(types.SET_LOADING, false, { root: true })
    } catch (error) {
      // Handle Errors here.
      // let errorCode = error.code
      let errorMessage = error.message
      // [START_EXCLUDE]
      commit(types.SET_LOADING, false, { root: true })
      commit(types.SET_ERROR, errorMessage, { root: true })
      console.log(error)
    }
  },
  async SEARCH_BOOK_BY_ISBN_ASYNC ({commit}, payload) { // payload = { isbn: isbn } - validated
    commit(types.SET_LOADING, true, { root: true })
    commit(types.CLEAR_ERROR, null, { root: true })
    const url = 'http://feedback.api.juhe.cn/ISBN'
    const params = {
      sub: payload.isbn,
      key: '436d9b993fd3c3138954fd6fc9f89053'
    }
    try {
      const res = await axios.get(url, {
        params,
        headers: {'X-Requested-With': 'XMLHttpRequest'}
      })
      console.log(res)
      if (res.data.error_code === 0) {
        commit('SET_BOOK_INFO', res.data.result)
      } else {
        let errorMessage = ''
        switch (res.data.error_code) {
          case 305403:
            errorMessage = 'Missing required ISBN'
            break
          case 204401:
            errorMessage = 'Network Error. Please Re-try!'
            break
          case 204402:
            errorMessage = 'Unable to find the data'
            break
          case 10020:
            errorMessage = 'Interface Maintenance'
            break
          case 10021:
            errorMessage = 'Interface Failed'
            break
          default:
            errorMessage = 'Unknown Error Occurred. Please contact the administrator.'
            break
        }
        commit(types.SET_ERROR, errorMessage, { root: true })
      }
      commit(types.SET_LOADING, false, { root: true })
    } catch (error) {
      // Handle Errors here.
      // let errorCode = error.code
      let errorMessage = error.message
      // [START_EXCLUDE]
      commit(types.SET_LOADING, false, { root: true })
      commit(types.SET_ERROR, errorMessage, { root: true })
      console.log(error)
    }
  },
  async SAVE_BOOK_INFO_INTO_FB_ASYNC ({getters, commit}) {
    commit(types.SET_LOADING, true, { root: true })
    commit(types.CLEAR_ERROR, null, { root: true })
    let newBookKey = firebase.database().ref('book').push().key
    let newBookInfo = {}
    newBookInfo[newBookKey] = {
      uid: newBookKey,
      ...getters('GET_BOOK_INFO')
    }
    try {
      
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
