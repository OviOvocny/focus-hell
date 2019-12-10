<template>
  <div class="play">
    <h2>Hosting new games is not available at this time. Sorry about that.</h2>
    <div class="deck-grid" v-if="ready">
      <div class="deck" v-for="d in decks" :key="d.id">
        <img :src="covers[d.id]" :alt="d.name" class="deck-cover">
        <div class="title">{{d.name}}</div>
      </div>
    </div>
    <btn mega class="return-btn" v-if="$store.state.user.game" :to="`/play/${$store.state.user.game}`">Return to last game</btn>
    <btn mega class="join-btn" to="/join">Join game</btn>
    <btn class="back-btn" @click="$router.go(-1)">Back</btn>
  </div>
</template>

<script>
import list from '@/modules/list'
import { getFirst } from '@/modules/deckMap'

export default {
  data () {
    return {
      decks: [],
      covers: {}
    }
  },
  computed: {
    ready () {
      return this.decks.length > 0 && Object.keys(this.covers).length === this.decks.length
    }
  },
  created () {
    list('decks').then(docs => {
      this.decks = docs
      docs
        .map(d => d.id)
        .forEach(id => {
          getFirst(id).then(src => {
            this.covers = {
              ...this.covers,
              [id]: src
            }
          })
        })
    })
  }
}
</script>

<style lang="stylus" scoped>
.play
  min-height 100vh

.return-btn, .join-btn
  position fixed
  bottom 1em
.return-btn
  right 1em
.join-btn
  left 1em

.deck-grid
  display grid
  width 100%
  grid-template-columns repeat(5, 1fr)
  // grid-template-rows repeat(var(--grid-size), 1fr)
  grid-gap 1em
  padding 1em

.deck-cover
  width 15vw
  height @width
  object-fit cover
  border-radius .5em
  border .4em solid
</style>
