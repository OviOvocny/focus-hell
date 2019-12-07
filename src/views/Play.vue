<template>
  <div class="play">
    <h2>Hosting new games is not available at this time. Sorry about that.</h2>
    <btn mega class="return-btn" to="/play/oxGWY">Return to last game</btn>
    <btn mega class="join-btn" to="/join">Join game</btn>
    <btn class="back-btn" @click="$router.go(-1)">Back</btn>
  </div>
</template>

<style lang="stylus" scoped>
.play
  min-height 100vh

.return-btn, .join-btn
  position fixed
  bottom 1em
.return-btn
  right 1em
.join-btn
  left 1em
</style>
