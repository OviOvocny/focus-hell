<template>
  <div class="controller-setup">
    <h2 v-if="qrActive">Show us the QR code and you're in!</h2>
    <h2 v-else>Start the scanner to save some time!</h2>
    <div class="viewfinder">
      <qr-scanner
        @devices="startScanner"
        :scanning="qrActive"
        :device="qrDevice"
        @result="processQr"
      />
    </div>
    <btn v-if="numQrDevices >= 2" class="switch-cam" @click="qrDevice = (qrDevice + 1) % numQrDevices">Use camera {{(qrDevice + 1) % numQrDevices + 1}}</btn>
    <btn v-if="numQrDevices > 0" @click="qrActive = !qrActive">{{qrActive ? 'Cancel scan' : 'Scan QR code'}}</btn>
    <div>
      <h3>Or type the code here. You do you.</h3>
      <input type="text" v-model="gameId" style="margin-right:1em" />
      <btn @click="goToSession" :disabled="!gameId">Join</btn>
    </div>
    <btn class="back-btn" @click="$router.go(-1)">Back</btn>
  </div>
</template>

<script>
import QRScanner from '@/components/controls/QRScanner'
export default {
  data () {
    return {
      // QR Scan
      qrActive: false,
      qrDevice: 0,
      numQrDevices: 0,
      // Game data
      gameId: null
    }
  },
  methods: {
    startScanner (devices) {
      if (devices.length <= 0) {
        console.log('No camera')
      } else {
        this.qrActive = true
        this.numQrDevices = devices.length
      }
    },
    processQr (result) {
      this.gameId = result.text.substr(result.text.lastIndexOf('/') + 1)
      this.goToSession()
    },
    goToSession () {
      this.$router.push(`/play/${this.gameId}`)
    }
  },
  components: {
    'qr-scanner': QRScanner
  }
}
</script>

<style lang="stylus" scoped>

</style>
