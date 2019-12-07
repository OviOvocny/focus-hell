<template>
  <transition name="swap" mode="out-in">
    <div
      key=1
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
        <div class="player-corner">
          <pile :player-index="1" />
          <avatar :user="game.players['1']" live></avatar>
        </div>
      </div>
      <!-- Main play area -->
      <desk class="desk" @illegal="illegalFeedback" />
      <!-- Split controls 2 -->
      <div class="controls controls-right">
        <div class="player-corner">
          <avatar v-if="game.players['2']" :user="game.players['2']" live></avatar>
          <pile :player-index="2" />
        </div>
        <div>
          <div class="turn-count">
            <b>{{game.gameState.turns}}</b>
            turns
          </div>
          <btn mega class="endButton" @click="signalReady" :disabled="game.turnActions.length < 2 || done">{{ endButtonText }}</btn>
        </div>
      </div>
    </div>
    <div key=2 v-else class="loading-screen">
      <div>
        <logo />
        <div class="loading-text">Connecting...</div>
      </div>
    </div>
  </transition>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import Desk from '@/components/Desk'
import Pile from '@/components/Pile'

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
      document.documentElement.style.setProperty('--bg-img', `url(${this.$store.state.game.deck.backImage})`)
      this.$store.commit('showImage')
    })
  },
  beforeDestroy () {
    this.$store.commit('hideImage')
  },
  methods: {
    ...mapActions(['signalReady', 'endGame', 'resetGame']),
    illegalFeedback () {

    }
  },
  components: {
    Desk,
    Pile
  }
}
</script>

<style lang="stylus">
.swap-enter-active, .swap-leave-active
  transition transform .1s

.swap-enter, .swap-leave-to
  transform scale(1.2)
  opacity 0

.endButton
  position relative
  &:not(:disabled)
    animation bigbop .4s
  &::before
    position absolute
    top 0
    left calc(50% - 1em)
    z-index -1
    content ''
    width 2em
    height @width
    background-color white
    opacity 0
    border-radius 10em
.endButton:not(:disabled)::before
  opacity .8
  animation megapop 1.3s ease-out infinite

@keyframes megapop
  10%
    transform none
  70%, 100%
    transform scale(10)
    opacity 0

@keyframes bigbop
  30%
    transform scaleX(1.4) scaleY(.7)

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

.desk
  align-self center

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

.player-corner
  display flex
  align-items center
  flex-direction column
@media (orientation portrait)
  .player-corner
    flex-direction row

.turn-count
  font-size 1.5em
  b
    font-size 2em
</style>
