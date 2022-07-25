<template>
  <div class="py-3">
    <h1 class="text-center font-weight-normal mb-4 mt-2">RESET PASSWORD</h1>
    <b-form @submit.prevent="submit(form)">
      <form-input v-model="form.password" name="password" placeholder="New password" :error="errors.email" password />
      <form-button type="submit" variant="primary" block :loading="loading">Reset password</form-button>
      <hr />
      <b-button to="/login" variant="link" block :disabled="loading">Back to login page</b-button>
    </b-form>
  </div>
</template>

<script>
const initialError = {
  password: '',
  code: '',
  email: '',
}

export default {
  name: 'ResetPasswordPage',
  layout: 'password',
  middleware: ['guest'],
  asyncData({ query, error }) {
    const code = query.code || ''
    const email = query.email || ''
    if (!code || !email) return error({ statusCode: 400, message: 'Code and Email are required!' })
    return {
      form: {
        password: '',
        email,
        code,
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
        await this.$axios.$put('auth/password', data)
        this.$swal({
          icon: 'success',
          text: 'Password has been updated. You can login now.',
        })
        return this.$router.push('/login')
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
