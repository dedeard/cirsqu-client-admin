<template>
  <div class="py-3">
    <h1 class="text-center font-weight-normal mb-4">LOGIN</h1>
    <b-form @submit.prevent="submit(form)">
      <form-input v-model="form.email" name="email" placeholder="Email address" :error="errors.email" />
      <form-input v-model="form.password" name="password" placeholder="Password" :error="errors.email" password />
      <div class="text-right mb-3">
        <b-link to="/password/forgot">Forgot password?</b-link>
      </div>
      <form-button type="submit" variant="primary" block :loading="loading">LOGIN</form-button>
    </b-form>
  </div>
</template>

<script>
const initialError = {
  email: '',
  password: '',
}
export default {
  name: 'LoginPage',
  layout: 'auth',
  middleware: ['guest'],
  data() {
    return {
      loading: false,
      errors: initialError,
      form: {
        email: '',
        password: '',
      },
    }
  },
  methods: {
    async submit(form) {
      this.loading = true
      this.errors = initialError
      try {
        await this.$store.dispatch('auth/login', form)
        return this.$router.push('/')
      } catch (e) {
        console.log(e)
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
  },
}
</script>
