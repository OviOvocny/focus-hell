<template>
  <div class="home">
    <avatar :user="user" level compact />
    <logo full class="home-logo"/>
    <btn mega to="/play/oxGWY">Play</btn>
    <input type="text" v-model="name">
    <btn @click="setUser">Set</btn>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'home',
  data () {
    return {
      name: ''
    }
  },
  computed: mapState(['user']),
  methods: {
    setUser () {
      this.$store.dispatch('tryUser', this.name)
    }
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
