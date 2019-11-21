<template>
  <div class="controls">
    <span>{{user.name}}</span>
    <desk />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Desk from '@/components/Desk'

export default {
  name: 'game',
  data () {
    return {
    }
  },
  computed: mapState(['user', 'game']),
  components: {
    Desk
  }
}
</script>

<style lang="stylus">

</style>
