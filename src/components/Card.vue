<template>
  <div :class="['card', { turned, turnable, off, collected }]" @click.passive="turn">
    <div class="card-side back">
      <logo style="opacity: .5" />
    </div>
    <div class="card-side face">
      <img class="card-image" :src="src">
    </div>
  </div>
</template>

<script>
export default {
  props: {
    index: Number,
    src: {
      type: String,
      default: '/img/fh-full.svg'
    },
    turned: Boolean,
    collected: Boolean
  },
  data () {
    return {
    }
  },
  computed: {
    turnable () {
      return this.$store.getters.canTurn
    },
    off () {
      return !this.$store.getters.isSinglePlayer && this.collected
    }
  },
  methods: {
    turn () {
      this.$store.dispatch('selectCard', this.index)
      this.$parent.$emit('illegal')
    }
  }
}
</script>

<style lang="stylus" scoped>
.card
  position relative
  transform-style preserve-3d
  transition transform .4s var(--ease-out-back), opacity .3s
  cursor not-allowed
  &.turnable
    cursor pointer
  &.turned
    transform rotateY(-180deg)
  &.off
    cursor default
    pointer-events none
    //opacity 0
  &.collected
    transform rotateY(-180deg) scale(0)

.card-side
  position absolute
  width 100%
  height 100%
  backface-visibility hidden
  border-radius 5%

.back
  background linear-gradient(135deg, var(--primary), var(--primary-stop))
  padding 15%

.face
  transform rotateY(180deg)
  background-color #fff

.card-image
  position relative
  background-color #eee
  width 94%
  height @width
  margin 3%
  border-radius 3%
  object-fit cover
</style>
