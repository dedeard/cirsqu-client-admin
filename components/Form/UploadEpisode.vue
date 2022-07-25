<template>
  <b-form class="border-bottom py-3" @submit.prevent="submit()">
    <h4>UPLOAD LESSON EPISODE</h4>
    <b-alert variant="info" :show="percent > 0 && percent !== 100">{{ uploadMessage }}</b-alert>
    <b-alert variant="danger" :show="!!error">{{ error }}</b-alert>
    <div class="py-3">
      <b-form-file v-model="file" placeholder="Choose a video or drop it here..." drop-placeholder="Drop video here..."></b-form-file>
    </div>
    <b-button type="submit" variant="primary" :disabled="loading">Upload video</b-button>
  </b-form>
</template>

<script>
import FormData from 'form-data'

export default {
  name: 'FormUploadEpisode',
  props: {
    lid: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      file: null,
      error: '',
      loading: false,
      percent: 0,
    }
  },
  computed: {
    uploadMessage() {
      if (this.percent < 100) {
        return `DIPROSES ${this.percent}%`
      }
      return ''
    },
  },
  methods: {
    onUploadProgress(progressEvent) {
      this.percent = Math.round((progressEvent.loaded * 100) / progressEvent.total)
    },
    async submit() {
      this.loading = true
      this.error = ''
      const url = `/admin/episodes/${this.lid}`
      try {
        const data = new FormData()
        data.append('video', this.file)
        const lesson = await this.$axios.$post(url, data, {
          onUploadProgress: this.onUploadProgress,
        })
        this.$emit('created', lesson)
        this.file = null
      } catch (e) {
        this.error = this.$errorMessage(e)
      }
      this.loading = false
    },
  },
}
</script>
