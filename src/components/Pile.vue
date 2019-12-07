<template>
  <div class="pile">
    <card
      v-for="(c, i) in cards"
      :key="i"
      :index="i"
      :src="c"
      turned
      class="pile-card"
      :style="{transform: transforms[i], pointerEvents: 'none'}"
    />
  </div>
</template>

<script>
import Card from '@/components/Card'
export default {
  props: {
    playerIndex: Number
  },
  data () {
    return {
      transforms: []
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
  components: {
    Card
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
  width 8em
  height @width

.pile-card
  position absolute
  width 90%
  height @width
  top 5%
  left 5%
</style>
