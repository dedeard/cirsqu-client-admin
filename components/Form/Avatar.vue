<template>
  <div class="d-inline-block position-relative text-center">
    <b-img :src="auth.avatar || '/avatar.png'" width="100px" rounded="circle" />
    <div class="position-relative" style="top: -15px">
      <b-button variant="primary" size="sm" pill :disabled="loading" @click.prevent="handleClick"><b-icon icon="camera"></b-icon></b-button>
      <input ref="input" type="file" class="d-none" accept="image/*" @change="handleChange" />
    </div>
  </div>
</template>

<script>
import FormData from 'form-data'
export default {
  name: 'FormAvatar',
  data() {
    return {
      loading: false,
    }
  },
  computed: {
    auth() {
      return this.$store.getters.auth
    },
  },
  methods: {
    handleClick() {
      this.$refs.input.click()
    },
    async handleChange(ev) {
      this.loading = true
      try {
        const file = ev.target.files[0]
        const data = new FormData()
        data.append('image', file)
        const user = await this.$axios.$put('/account/avatar', data)
        this.$store.commit('auth/setAuth', user)
        this.$swal({
          icon: 'success',
          text: 'Avatar has been updated.',
        })
      } catch (e) {
        this.$swal({
          icon: 'error',
          text: this.$errorMessage(e),
        })
      }
      this.loading = false
    },
  },
}
</script>
