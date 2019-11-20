<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="stylus">
:root
  --primary #ee5d3d
  --primary-stop #ee3d3d
  --secondary #ee3da7
  --bg #351515

  --ease-out-back cubic-bezier(0.435, 0.010, 0.100, 1.415)

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
</style>
