<template>
  <div :class="['avatar', { compact }]">
    <div :class="['image', { highlighted, done }]">
      <img :src="user.avatar" :alt="user.name">
    </div>
    <div class="info">
      <span :class="['text-block', {primary: highlighted}]">{{ user.name }}</span>
      <span class="text-block primary" v-if="level">{{ user.level }}</span>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  props: {
    live: Boolean,
    level: Boolean,
    compact: Boolean,
    user: {
      type: Object,
      default () {
        return {
          name: 'Anonymous',
          avatar: '/img/icons/apple-touch-icon.png'
        }
      }
    }
  },
  computed: {
    ...mapState(['game']),
    highlighted () {
      return this.live && this.game.players[this.game.gameState.currentPlayer].id === this.user.id
    },
    done () {
      return this.live && this.game.readyToEnd.includes(this.user.id)
    },
    statusText () {
      if (this.done) {
        return 'Finished'
      } else {
        return this.highlighted ? 'Playing' : 'Observing'
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.avatar
  display inline-flex
  flex-wrap wrap
  align-items center
  justify-content center

.image
  position relative
  width 80px
  height @width
  margin .5em
  border-radius (@width/2)
  background-color var(--primary)
  transition .3s var(--ease-out-back)
  img
    width 100%
    height @width
    object-fit cover
    border-radius 50%
    transition inherit

.image.highlighted
  img
    transform scale(.85)

.image.done
  transform scale(.7)
  background-color white
  animation breathe 5s linear infinite
  img
    transform scale(.85)
    box-shadow 0 0 2em .5em var(--primary)

.info
  font-size 1.2rem

.compact
  .image
    width 60px
    height @width
  .info
    font-size 1rem

@keyframes breathe
  50%
    background-color alpha(white, 0%)

</style>
