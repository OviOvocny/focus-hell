<template>
  <div id="app">
    <transition name="fade" mode="out-in">
      <router-view/>
    </transition>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  computed: {
    userId () {
      return localStorage.getItem('userId')
    }
  },
  created () {
    this.$store.dispatch('bindUser', this.userId)
  }
}
</script>

<style lang="stylus">
:root
  --primary #ee5d3d
  --primary-stop #ee3d3d
  --primary-text #790000
  --secondary #ee3da7
  --bg #351515

  --ease-out-back cubic-bezier(0.435, 0.010, 0.100, 1.415)

.fade-enter-active, .fade-leave-active
  transition opacity .2s, transform .3s var(--ease-out-back)

.fade-enter
  opacity 0
  transform scale(.9)
.fade-leave-to
  opacity 0
  transform scale(1.1)

html
  box-sizing border-box

*, *::before, *::after
  box-sizing inherit

body
  margin 0
  padding 0
  color white
  background-color var(--bg)

a
  color var(--primary)
  &:visited
    color var(--secondary)

#app
  font-family 'Avenir', Helvetica, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  text-align center

.text-block
  display inline-block
  font-weight bold
  background-color white
  padding .3em .5em
  margin 0 .15em
  color var(--bg)
  transition background-color .5s
  &.primary
    background-color var(--primary)
    color white
</style>
