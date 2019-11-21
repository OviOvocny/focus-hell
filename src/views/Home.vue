<template>
  <div class="home">
    <logo full class="home-logo"/>
    <btn to="/play">LOL</btn>
  </div>
</template>

<script>

export default {
  name: 'home'
}
</script>

<style lang="stylus">
.home-logo
  margin auto
  svg
    max-height 300px
    fill white
</style>
