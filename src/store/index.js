import Vue from 'vue'
import Vuex from 'vuex'
import db from './firestore'
import { vuexfireMutations, firestoreAction } from 'vuexfire'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {},
    game: {
      deck: {},
      options: {}
    }
  },
  mutations: {
    ...vuexfireMutations
  },
  actions: {
    bindUser: firestoreAction(({ bindFirestoreRef }) => {
      return bindFirestoreRef('user', db.collection('users').doc('ZhS7j1D0T8odeNFe9skX'))
    })
  },
  modules: {
  }
})
