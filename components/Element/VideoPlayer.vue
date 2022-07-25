<template>
  <div class="embed-responsive embed-responsive-16by9 bg-black">
    <video v-if="url" ref="videoPlayer" class="embed-responsive-item" controls autoplay :src="url"></video>
  </div>
</template>

<script>
export default {
  name: 'ElementVideoPlayer',
  props: {
    url: {
      type: String,
      required: true,
      default: '',
    },
  },
  data() {
    return {
      player: null,
    }
  },
  mounted() {
    this.player = this.$refs.videoPlayer
    this.player.addEventListener('ended', this.onEnded)
  },
  beforeDestroy() {
    if (this.player) {
      this.player.removeEventListener('ended', this.onEnded)
    }
  },
  methods: {
    onEnded() {
      if (this.player) {
        this.player.removeEventListener('ended', this.onEnded)
      }
      this.$emit('ended')
    },
  },
}
</script>

<style scoped>
.bg-black {
  background-color: black;
}
</style>
