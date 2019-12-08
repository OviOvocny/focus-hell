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
    <div class="foot">
      <btn to="/about">About</btn>
      <span style="opacity:.7">©2019 Investor Torture Unit</span>
      <btn to="/preferences">Preferences</btn>
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
  padding 2em 0
  min-height 100vh

.home-logo
  margin 1em auto
  svg
    max-height 300px
    fill white

.mainmenu
  display flex
  justify-content center
  flex-wrap wrap
  margin 5em auto
  max-width 900px
  .fh-btn
    //padding 1em 2em
    margin .5em 1em
    z-index 3

a.fh-btn.big-icon
  padding 1em 4em
  box-shadow 0 0 10em var(--primary)
  z-index 2
  img
    transform scale(1.4)
    transition transform .5s var(--ease-out-back)
  &:hover
    box-shadow 0 0 8em 1em var(--primary)
    transform scale(1.2)
    img
      transform scale(1.8)

.foot
  position fixed
  bottom 0
  left 0
  width 100vw
  display flex
  justify-content space-between
  flex-wrap wrap
  align-items center
  padding 2em 3em
  .fh-btn
    flex-grow 0
    flex-basis 8em
</style>
