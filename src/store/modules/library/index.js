import book from './book'
import collection from './collection'

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
    },
    collection: {
      namespaced: true,
      ...collection
    }
  }
}
