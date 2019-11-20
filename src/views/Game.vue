<template>
  <div class="controls">
    <desk :grid="8" :cards="Array(64)" />
  </div>
</template>

<script>
import Desk from '@/components/Desk'

export default {
  name: 'game',
  components: {
    Desk
  }
}
</script>

<style lang="stylus">
.home-logo
  margin auto
  svg
    max-height 300px
    fill white
</style>
