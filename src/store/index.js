import Vue from 'vue'
import Vuex from 'vuex'
import db from './firestore'
import { vuexfireMutations, firestoreAction } from 'vuexfire'
import { firestore } from 'firebase'
import { shuffle } from 'shuffle-seed'

db.enablePersistence().catch(e => {
  if (e.code === 'failed-precondition') {
    // Multiple tabs open, persistence can only be enabled
    // in one tab at a a time.
    console.error('Cannot enable offline because more instances')
  } else if (e.code === 'unimplemented') {
    // The current browser does not support all of the
    // features required to enable persistence
    console.error('Cannot enable offline because shit browser')
  }
})
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {},
    game: {}
  },
  getters: {
    theme (state) {
      const c = state.game.deck.theme
      return {
        '--primary': `hsl(${c.h},${c.s}%,${c.l}%)`,
        '--primary-stop': `hsl(${c.h - 10},${c.s}%,${c.l}%)`,
        '--primary-text': `hsl(${c.h - 10},${c.s + 15}%,${c.l - 35}%)`
      }
    },
    deckMap (state) {
      return shuffle(state.game.deck.cards.concat(state.game.deck.cards), state.game.id)
    },
    playerIndex (state) {
      return Object.keys(state.game.players).find(key => state.game.players[key].id === state.user.id)
    },
    match (state, getters) {
      if (state.game.turnActions.length < 2) {
        return false
      } else {
        const [i, j] = state.game.turnActions
        return getters.deckMap[i] === getters.deckMap[j]
      }
    },
    playing (state, getters) {
      return state.game.gameState.currentPlayer === getters.playerIndex
    },
    canTurn (state, getters) {
      return state.game.turnActions.length < 2 && getters.playing
    },
    isSinglePlayer (state) {
      return state.game.options.mode === 'single' || Object.keys(state.game.players).length === 1
    }
  },
  mutations: {
    ...vuexfireMutations
  },
  actions: {
    tryUser: firestoreAction(({ bindFirestoreRef }, userName) => {
      return db.collection('users')
        .where('name', '==', userName)
        .get()
        .then(data => data.docs[0].id)
        .then(id => {
          localStorage.setItem('userId', id)
          return bindFirestoreRef('user', db.collection('users').doc(id))
        })
    }),
    // Binding
    bindUser: firestoreAction(({ bindFirestoreRef }, userId) => {
      return bindFirestoreRef('user', db.collection('users').doc(userId))
    }),
    bindGame: firestoreAction(({ bindFirestoreRef }, gameId) => {
      return bindFirestoreRef('game', db.collection('games').doc(gameId))
    }),
    // Actions
    selectCard: firestoreAction(({ state, getters, dispatch }, index) => {
      if (
        state.game.cardState[index] !== 0 ||
        state.game.turnActions.length >= 2 ||
        !getters.playing
      ) return
      db.collection('games').doc(state.game.id)
        .update({
          [`cardState.${index}`]: -1,
          turnActions: firestore.FieldValue.arrayUnion(index)
        })
        .then(() => {
          if (getters.match) {
            dispatch('endTurn')
          }
        })
    }),
    signalReady: firestoreAction(({ state, dispatch }) => {
      db.collection('games').doc(state.game.id)
        .update({
          readyToEnd: firestore.FieldValue.arrayUnion(state.user.id)
        })
        .then(() => {
          if (state.game.readyToEnd.length === Object.keys(state.game.players).length) {
            dispatch('endTurn')
          }
        })
    }),
    endTurn: firestoreAction(({ state, getters }) => {
      const newState = getters.match ? parseInt(state.game.gameState.currentPlayer) : 0
      // Update cards
      state.game.turnActions.forEach(index => {
        db.collection('games').doc(state.game.id)
          .update({
            [`cardState.${index}`]: newState
          })
      })
      // Clear actions, increment turns
      db.collection('games').doc(state.game.id)
        .update({
          turnActions: [],
          readyToEnd: [],
          'gameState.turns': firestore.FieldValue.increment(1)
        })
      // Set next player if no match
      if (!getters.match) {
        const keys = Object.keys(state.game.players)
        let next = keys.indexOf(state.game.gameState.currentPlayer) + 1
        if (next >= keys.length) next = 0
        db.collection('games').doc(state.game.id)
          .update({
            'gameState.currentPlayer': keys[next]
          })
      }
    }),
    endGame: firestoreAction(({ state }) => {
      db.collection('games').doc(state.game.id)
        .update({
          finished: true
        })
    }),
    resetGame: firestoreAction(({ state }) => {
      const cardStateClean = {}
      for (let i = 0; i < state.game.deck.cards.length * 2; i++) {
        cardStateClean[i] = 0
      }
      db.collection('games').doc(state.game.id)
        .update({
          cardState: cardStateClean,
          gameState: {
            currentPlayer: '1',
            timeStarted: firestore.Timestamp.now(),
            turns: 0
          },
          turnActions: [],
          readyToEnd: []
        })
    })
  },
  modules: {
  }
})
