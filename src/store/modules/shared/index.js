const state = {
  loading: false,
  error: null,
  info: null,
  success: null
}

const getters = {
  GET_LOADING: (state) => {
    return state.loading
  },
  GET_ERROR: (state) => {
    return state.error
  },
  GET_SUCCESS: (state) => {
    return state.success
  },
  GET_INFO: (state) => {
    return state.info
  }
}

const mutations = {
  SET_LOADING (state, payload) {
    state.loading = payload
  },
  SET_ERROR (state, payload) {
    state.error = payload
  },
  SET_SUCCESS (state, payload) {
    state.success = payload
  },
  SET_INFO (state, payload) {
    state.info = payload
  },
  CLEAR_ERROR (state) {
    state.error = null
  },
  CLEAR_ALL_MESSAGE (state) {
    state.success = null
    state.info = null
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
