<template>
  <main
    class="desk"
    :style="{'--grid-size': grid}"
  >
    <card v-for="(card, i) in deck.cards" :key="i" />
  </main>
</template>

<script>
import Card from '@/components/Card'
export default {
  computed: {
    deck () {
      return this.$store.state.game.deck
    },
    grid () {
      if (!this.deck.cards) return 0
      const deckSize = this.deck.cards.length
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
