<template>
  <b-card class="my-3">
    <b-modal :id="'play-modal-' + episode.id" body-class="p-0" header-class="d-none" footer-class="p-1" size="lg">
      <template #default>
        <element-video-player :url="url" />
      </template>
      <template #modal-footer>
        <b-button variant="danger" block @click="$bvModal.hide('play-modal-' + episode.id)"> Close </b-button>
      </template>
    </b-modal>

    <b-modal :id="'edit-episode-modal-' + episode.id" header-class="d-none" footer-class="p-1" size="lg">
      <template #default>
        <b-form @submit.prevent="update(form)">
          <b-form-group label="Title:" label-for="input-title" :invalid-feedback="errors.title" :state="errors.title ? false : null">
            <b-form-input
              id="input-title"
              v-model="form.title"
              :state="errors.title ? false : null"
              type="text"
              placeholder="Enter title"
            ></b-form-input>
          </b-form-group>
          <b-form-group label="File url:" label-for="input-file" :invalid-feedback="errors.file" :state="errors.file ? false : null">
            <b-form-input
              id="input-file"
              v-model="form.file"
              :state="errors.file ? false : null"
              type="text"
              placeholder="Enter file url"
            ></b-form-input>
          </b-form-group>
          <b-form-group label="Status:" label-for="input-status" :invalid-feedback="errors.pro" :state="errors.pro ? false : null">
            <b-form-select
              id="input-status"
              v-model="form.pro"
              :options="[
                { value: true, text: 'Pro' },
                { value: false, text: 'Public' },
              ]"
              :state="errors.pro ? false : null"
            ></b-form-select>
          </b-form-group>
          <b-button type="submit" variant="primary" :disabled="loading">Update</b-button>
        </b-form>
      </template>
      <template #modal-footer>
        <b-button variant="danger" block @click="$bvModal.hide('edit-episode-modal-' + episode.id)"> Close </b-button>
      </template>
    </b-modal>

    <b-input-group size="sm" :prepend="episode.pro ? 'Pro' : 'Public'">
      <b-form-input :value="episode.title" readonly disabled />
      <b-input-group-append>
        <b-button variant="outline-primary" :disabled="playLoading" @click="getVideoUrl">Play</b-button>
        <b-button variant="outline-info" @click="$bvModal.show('edit-episode-modal-' + episode.id)">Edit</b-button>
        <b-button variant="outline-danger" @click="destroy">Delete</b-button>
      </b-input-group-append>
    </b-input-group>
  </b-card>
</template>

<script>
const initialError = {
  title: '',
  pro: '',
  file: '',
}
export default {
  name: 'ElementEpisodeList',
  props: {
    lid: {
      type: String,
      default: '',
    },
    episode: {
      type: Object,
      required: true,
      default: () => ({}),
    },
  },
  data() {
    return {
      open: false,
      form: {
        title: '',
        pro: true,
        file: '',
      },
      errors: initialError,
      loading: false,
      playLoading: false,
      url: '',
    }
  },
  mounted() {
    this.form.title = this.episode.title
    this.form.pro = this.episode.pro
    this.form.file = this.episode.file || ''
  },
  methods: {
    async update(data) {
      this.loading = true
      this.errors = initialError
      try {
        const lesson = await this.$axios.$put(`/admin/episodes/${this.lid}/${this.episode.id}`, data)
        const episode = lesson.episodes.find((el) => el.id === this.episode.id)
        this.form.title = episode.title
        this.form.pro = episode.pro
        this.form.file = episode.file || ''
        this.$emit('updated', lesson)
        this.$bvModal.hide('edit-episode-modal-' + this.episode.id)
        this.$swal({
          icon: 'success',
          text: 'Episode has been updated',
        })
      } catch (e) {
        const err = this.$errorResponse(e)
        this.errors = { ...this.errors, ...err.errors }
        if (err.message) {
          this.$swal({
            icon: 'error',
            text: err.message,
          })
        }
      }
      this.loading = false
    },
    async getVideoUrl() {
      if (!this.url) {
        this.playLoading = true
        try {
          const { url } = await this.$axios.$get('/admin/episodes/' + this.episode.id + '/url')
          this.url = url
          this.$bvModal.show('play-modal-' + this.episode.id)
        } catch (e) {
          const err = this.$errorResponse(e)
          this.$swal({
            icon: 'error',
            text: err.message,
          })
        }
        this.playLoading = false
      } else {
        this.$bvModal.show('play-modal-' + this.episode.id)
      }
    },
    async destroy() {
      const result = await this.$swal({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
      })
      if (result.value) {
        try {
          const lesson = await this.$axios.$delete(`/admin/episodes/${this.lid}/${this.episode.id}`)
          this.$emit('deleted', lesson)
        } catch (e) {
          this.$swal({ icon: 'error', text: this.$errorMessage(e) })
        }
      }
    },
  },
}
</script>
