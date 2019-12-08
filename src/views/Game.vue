<template>
  <div>
    <transition name="fade">
      <div class="qr" ref="qr" id="qr" v-show="qrShown" @click="qrShown = false"></div>
    </transition>
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
            <avatar v-if="game.players['2']" :user="game.players['2']" live @click.native="writeQR"></avatar>
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
  </div>
</template>

<script>
import { BrowserQRCodeSvgWriter } from '@zxing/library'
import { mapState, mapGetters, mapActions } from 'vuex'
import Desk from '@/components/Desk'
import Pile from '@/components/Pile'

export default {
  name: 'game',
  data () {
    return {
      ready: false,
      qrShown: false
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
      new Audio('/sound/complete.mp3').play()
    })
  },
  beforeDestroy () {
    this.$store.commit('hideImage')
  },
  methods: {
    ...mapActions(['signalReady', 'endGame', 'resetGame']),
    illegalFeedback () {

    },
    writeQR () {
      const qrGen = new BrowserQRCodeSvgWriter()
      const base = 'https://fh.ovi.moe'
      this.$refs.qr.innerHTML = ''
      qrGen.writeToDom('#qr', `${base}/join/${this.game.id}`, 300, 300)
      const svg = this.$refs.qr.querySelector('svg')
      svg.removeAttribute('width')
      svg.removeAttribute('height')
      svg.setAttribute('viewBox', '0 0 300 300')
      this.qrShown = true
    }
  },
  components: {
    Desk,
    Pile
  }
}
</script>

<style lang="stylus">
.qr
  position fixed
  z-index 100
  width 90vh
  height @width
  top 50%
  left 50%
  transform translate(-50%, -50%)
  border-radius 2em
  box-shadow 0 0 10em 2em var(--bg)
  background-color white
@media (orientation portrait)
  .qr
    width 90vw
    height @width

.swap-enter-active, .swap-leave-active
  transition transform .4s

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
  overflow hidden
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
@media (max-height 400px), (max-width 400px)
  .controls
    font-size .7rem
    .fh-btn
      font-size 1.2rem
      padding .3em .5em
    .counter
      font-size 1.5em
    .avatar
      .info
        font-size 1rem
      .image
        width 50px
        height @width

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
