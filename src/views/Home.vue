<template>
  <div class="home">
    <avatar :user="user" level compact @click.native="visibleHacks = !visibleHacks" />
    <logo full class="home-logo"/>
    <div class="mainmenu">
      <btn mega to="/create">
        Create a set
        <img src="@/assets/icons/create.svg">
      </btn>
      <btn mega to="/play" class="big-icon">
        <img src="@/assets/icons/play.svg">
      </btn>
      <btn mega to="/community">
        Community
        <img src="@/assets/icons/community.svg">
      </btn>
    </div>
    <div v-if="visibleHacks">
      <input type="text" v-model="name" @change="setUser">
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'home',
  data () {
    return {
      name: '',
      visibleHacks: false
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
.home
  margin 2em 0

.home-logo
  margin 1em auto
  svg
    max-height 300px
    fill white

.mainmenu
  display flex
  justify-content center
  margin 5em auto
  .fh-btn
    padding 1em 2em
    margin 0 1em

a.fh-btn.big-icon
  padding 1em 4em
  img
    transform scale(1.4)
</style>
