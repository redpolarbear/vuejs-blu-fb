
const state = {
  collections: []
}

const getters = {
  GET_COLLECTIONS: (state) => {
    return state.collections
  }
}

const mutations = {
  ADD_ONE_COLLECTION (state, payload) {
    state.collections.push(payload)
  },
  REMOVE_ONE_COLLECTION (state, payload) {
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
