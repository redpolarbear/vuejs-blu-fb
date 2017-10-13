import * as firebase from 'firebase'

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
  async SEARCH_BOOK_BY_ISBN_ASYNC ({state, dispatch, getters, rootGetters}, payload) { // payload = { isbn: isbn }
    const url = 'http://feedback.api.juhe.cn/ISBN'
    const params = {
      sub: payload.isbn,
      key: '436d9b993fd3c3138954fd6fc9f89053'
    }
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
