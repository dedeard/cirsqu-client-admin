<template>
  <div>
    <video controls autoplay ref="videoPlayer" class="video-js" :src="'https://www.w3schools.com/html/mov_bbb.mp4?token=' + token"></video>
  </div>
</template>

<script>
import videojs from 'video.js'

export default {
  name: 'CVideo',
  props: {
    options: {
      type: Object,
      default() {
        return {}
      },
    },
  },
  computed: {
    token() {
      return this.$store.getters.token.access?.bearer
    },
  },
  data() {
    return {
      player: null,
    }
  },
  mounted() {
    this.player = videojs(this.$refs.videoPlayer, this.options, () => {
      this.player.log('onPlayerReady', this)
    })
  },
  beforeDestroy() {
    if (this.player) {
      this.player.dispose()
    }
  },
}
</script>
