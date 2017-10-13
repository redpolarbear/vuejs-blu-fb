import book from './book'

const state = {

}

const getters = {

}

const mutations = {

}

const actions = {

}

export default {
  state,
  getters,
  mutations,
  actions,
  modules: {
    book: {
      namespaced: true,
      ...book
    }
  }
}
