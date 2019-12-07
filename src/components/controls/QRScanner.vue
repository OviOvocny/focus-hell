<template>
  <video id="qrPreview" :width="width" :height="height"></video>
</template>

<script>
import { BrowserQRCodeReader } from '@zxing/library'
export default {
  props: {
    scanning: Boolean,
    device: {
      type: Number,
      default: 0
    },
    width: {
      type: Number,
      default: 300
    },
    height: {
      type: Number,
      default: 300
    }
  },
  methods: {
    scan () {
      this.qr.decodeFromInputVideoDevice(this.videoDevices[this.device].deviceId, 'qrPreview')
        .then((result) => {
          this.$emit('result', result)
        }).catch((err) => {
          this.$emit('error', err)
          console.error(err)
        })
    }
  },
  created () {
    this.qr = new BrowserQRCodeReader()
    this.qr.getVideoInputDevices()
      .then(d => {
        this.videoDevices = d
        this.$emit('devices', d)
      })
      .catch(err => {
        this.$emit('error', err)
        console.error(err)
      })
  },
  watch: {
    scanning (active) {
      if (active) {
        this.scan()
      } else {
        this.qr.reset()
      }
    },
    device () {
      if (this.scanning) {
        this.qr.reset()
        this.scan()
      }
    }
  },
  beforeDestroy () {
    this.qr.reset()
  }
}
</script>
