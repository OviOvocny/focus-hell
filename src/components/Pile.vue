<template>
  <div class="pile">
    <img
      v-for="(c, i) in cards.slice(0, 8)"
      :key="i"
      :src="c"
      turned
      class="pile-card"
      :style="{transform: transforms[i], pointerEvents: 'none'}"
    />
    <div class="counter" v-show="cards.length > 0">{{ Math.floor(cards.length / 2)}}</div>
  </div>
</template>

<script>
export default {
  props: {
    playerIndex: Number
  },
  data () {
    return {
      transforms: Array(64).fill(0).map(c => `rotateY(180deg) rotateZ(${Math.random() * 20 - 10}deg)`)
    }
  },
  computed: {
    cards () {
      return this.$store.getters.collectedCards(this.playerIndex)
    }
  },
  methods: {
    getRandom () {
      return `rotateY(180deg) rotateZ(${Math.random() * 20 - 10}deg)`
    }
  },
  watch: {
    cards (val, prev) {
      if (val.length !== prev.length) {
        this.transforms = []
        for (let i = 0; i < val.length; i++) {
          this.transforms.push(`rotateY(180deg) rotateZ(${Math.random() * 20 - 10}deg)`)
        }
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.pile
  perspective 100px
  position relative
  width calc(3em + 6vw)
  height @width
  margin 1.5em

.pile-card
  display block
  position absolute
  width 90%
  height @width
  top 5%
  left 5%
  background-color #eee
  padding 3%
  border-radius 3%
  object-fit cover

.counter
  position absolute
  top -.5em
  left @top
  box-shadow .25em .25em 1em var(--bg)
  width 2em
  height @width
  line-height @height
  border-radius 1em
  background-color var(--primary)
  font-weight bold
  border .1em solid
</style>
