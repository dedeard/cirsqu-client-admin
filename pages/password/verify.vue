<template>
  <div class="py-3">
    <h1 class="text-center font-weight-normal mb-4 mt-2">EMAIL VERIFICATION</h1>
    <b-alert show variant="success">The verification code has been sent to your email.</b-alert>
    <b-form @submit.prevent="submit(form)">
      <form-input v-model.trim="form.code" name="code" placeholder="Verification code" :error="errors.code" uppercase />
      <form-button type="submit" variant="primary" block :loading="loading">Verify code</form-button>
      <hr />
      <b-button to="/login" variant="link" block :disabled="loading">Back to login page</b-button>
    </b-form>
  </div>
</template>

<script>
const initialError = {
  email: '',
  code: '',
}

export default {
  name: 'ForgotPasswordPage',
  layout: 'password',
  middleware: ['guest'],
  asyncData({ query }) {
    return {
      form: {
        email: query.email,
        code: '',
      },
      errors: initialError,
      loading: false,
    }
  },
  methods: {
    async submit(data) {
      this.loading = true
      this.errors = initialError
      try {
        await this.$axios.$post('auth/password/verify-code', data)
        return this.$router.push({ path: '/password/reset', query: data })
      } catch (e) {
        const err = this.$errorResponse(e)
        this.errors = { ...this.errors, ...err.errors }
        if (err.message) {
          this.$swal({
            icon: 'error',
            text: err.message,
          })
        }
        this.loading = false
      }
    },
  },
}
</script>
