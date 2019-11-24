<template>
  <component
    :is="tag"
    :to="to"
    :class="['fh-btn', { mega }]"
    @click="e => $emit('click', e)"
  >
    <slot />
  </component>
</template>

<script>
export default {
  props: {
    to: String,
    mega: Boolean
  },
  computed: {
    tag () {
      return this.to ? 'router-link' : 'button'
    }
  }
}
</script>

<style lang="stylus">
.fh-btn
  font-size 1rem
  font-family inherit
  display inline-block
  padding .4em .7em
  background-color transparent
  color white
  border .1em solid
  border-radius 10em
  min-width 5em
  text-decoration none
  cursor pointer
  transition .2s

  &:visited
    color inherit
  &:hover
    box-shadow inset 0 0 2em -1em currentColor
  &:active
    transform scale(.95)
  &:disabled
    opacity .8
    border-style dotted
    cursor not-allowed
    box-shadow none
    transform none
  &:focus
    outline none
    box-shadow inset 0 0 0 .2em var(--primary-stop)
  &:focus:not(:active):not(:hover)
    animation bop .4s

  &.mega
    color var(--primary-text)
    font-size 1.4rem
    font-weight bold
    background-color white
    border .2em solid var(--primary)
    &:hover
      box-shadow inset 0 0 .5em 0em var(--primary-stop)
    &:disabled
      color #333
      background-color alpha(white, 80%)
      border-color alpha(white, 50%)
      &:hover
        box-shadow none

@keyframes bop
  30%
    transform scaleX(1.1) scaleY(.9)
</style>
