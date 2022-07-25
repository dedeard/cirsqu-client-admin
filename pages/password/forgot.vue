<template>
  <div class="py-3">
    <h1 class="text-center font-weight-normal mb-4 mt-2">FORGOT PASSWORD</h1>
    <b-form @submit.prevent="submit(form)">
      <form-input v-model="form.email" name="email" placeholder="Email address" :error="errors.email" />
      <form-button type="submit" variant="primary" block :loading="loading">Reset password</form-button>
      <hr />
      <b-button to="/login" variant="link" block :disabled="loading">Back to login page</b-button>
    </b-form>
  </div>
</template>

<script>
const initialError = {
  email: '',
}

export default {
  name: 'ForgotPasswordPage',
  layout: 'password',
  middleware: ['guest'],
  data() {
    return {
      form: {
        email: '',
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
        await this.$axios.$post('auth/password', data)
        this.$swal({
          icon: 'success',
          text: 'The verification code has been sent to your email.',
        })
        return this.$router.push('/password/verify?email=' + data.email)
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
