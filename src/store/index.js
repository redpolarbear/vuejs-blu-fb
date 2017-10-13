import Vue from 'vue'
import Vuex from 'vuex'

import shared from './modules/shared'
import authentication from './modules/authentication'
// import * as types from './types'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    shared: {
      namespaced: true,
      ...shared
    },
    authentication: {
      namespaced: true,
      ...authentication
    }
  }
})

