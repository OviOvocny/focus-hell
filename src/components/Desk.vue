<template>
  <main
    class="desk"
    :style="{
      '--grid-size': grid,
    }"
  >
    <card
      v-for="(card, i) in game.cardState"
      :key="i"
      :index="parseInt(i)"
      :src="deckMap[i]"
      :turned="card != 0"
      :collected="card > 0"
    />
  </main>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import Card from '@/components/Card'
export default {
  computed: {
    ...mapState(['game']),
    ...mapGetters(['deckMap']),
    grid () {
      const deckSize = this.game.deck.cards.length
      if (deckSize <= 16) {
        return 4
      } else if (deckSize <= 36) {
        return 6
      } else {
        return 8
      }
    }
  },
  components: {
    Card
  }
}
</script>

<style lang="stylus" scoped>
.desk
  display grid
  grid-template-columns repeat(var(--grid-size), 1fr)
  grid-template-rows repeat(var(--grid-size), 1fr)
  grid-gap 1%
  padding 1em

.desk
  height 100vh
  width 100vh
  perspective 100vh
@media (orientation portrait)
  .desk
    width 100vw
    height 100vw
    perspective 100vw

</style>
