const state = {
  loading: false,
  error: null
}

const getters = {
  GET_LOADING: (state) => {
    return state.loading
  },
  GET_ERROR: (state) => {
    return state.error
  }
}

const mutations = {
  SET_LOADING (state, payload) {
    state.loading = payload
  },
  SET_ERROR (state, payload) {
    state.error = payload
  },
  CLEAR_ERROR (state) {
    state.error = null
  }
}

const actions = {
}

export default {
  state,
  getters,
  mutations,
  actions
}
