<template>
  <div
    v-if="ready"
    class="game"
    :style="theme"
  >
    <!-- Split controls 1 -->
    <div class="controls controls-left">
      <div>
        <btn mega to="/">Close</btn>
        <btn mega @click="resetGame">Start over</btn>
      </div>
      <div>
        <!-- pile -->
        <avatar :user="game.players['1']" live></avatar>
      </div>
    </div>
    <!-- Main play area -->
    <desk class="desk" @illegal="illegalFeedback" />
    <!-- Split controls 2 -->
    <div class="controls controls-right">
      <div>
        <avatar v-if="game.players['2']" :user="game.players['2']" live></avatar>
        <!-- pile -->
      </div>
      <div>
        <div>{{game.gameState.turns}} turns</div>
        <btn mega @click="signalReady" :disabled="game.turnActions.length < 2">{{ endButtonText }}</btn>
      </div>
    </div>
  </div>
  <div v-else class="loading-screen">
    <div>
      <logo />
      <div class="loading-text">Connecting...</div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import Desk from '@/components/Desk'

export default {
  name: 'game',
  data () {
    return {
      ready: false
    }
  },
  computed: {
    ...mapState(['user', 'game']),
    ...mapGetters(['match', 'theme', 'playing', 'done']),
    endButtonText () {
      if (this.done) {
        return 'Waiting...'
      } else {
        return this.playing ? 'End turn' : 'End observing'
      }
    }
  },
  created () {
    this.$store.dispatch('bindGame', this.$route.params.id).then(() => {
      this.ready = true
      this.$store.dispatch('getDeckMap')
    })
  },
  methods: {
    ...mapActions(['signalReady', 'endGame', 'resetGame']),
    illegalFeedback () {

    }
  },
  components: {
    Desk
  }
}
</script>

<style lang="stylus">
.loading-screen
  display flex
  justify-content center
  align-items center
  width 100vw
  height 100vh
  div div svg
    height 70%
    width @height
    fill var(--primary)

.loading-text
  font-weight bold
  font-size 1.1rem
  margin 1em

.game
  display flex
  justify-content space-between
  flex-wrap wrap
  min-height 100vh
@media (orientation portrait)
  .game
    flex-direction column

.controls
  margin 1em 0
  flex 1 1 0em
  display flex
  justify-content space-between
  align-items center
  flex-direction column
  button, a
    display block
    margin .5em
@media (orientation portrait)
  .controls
    margin 0 1em
    flex-direction row
</style>
