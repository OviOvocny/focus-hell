<template>
  <div :class="['card', {flipped}]">
    <div class="card-side back">
      <logo style="opacity: .5" />
    </div>
    <div class="card-side face"></div>
  </div>
</template>

<script>
export default {
  props: {
    flipped: Boolean
  }
}
</script>

<style lang="stylus" scoped>
.card
  position relative
  transform-style preserve-3d
  transition transform .5s var(--ease-out-back)
  cursor pointer
  &.flipped
    transform rotateY(-180deg)

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
</style>
