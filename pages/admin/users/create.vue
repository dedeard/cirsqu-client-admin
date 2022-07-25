<template>
  <b-card header="CREATE USER">
    <b-form @submit.prevent="submit(form)">
      <form-input v-model="form.name" name="name" placeholder="Name" :error="errors.name" />
      <form-input v-model="form.email" name="email" placeholder="Email address" :error="errors.email" />
      <form-input v-model="form.password" name="password" placeholder="Password" :error="errors.email" password />
      <form-input v-model="form.role" name="role" placeholder="Role" :error="errors.role" select :options="roles" />
      <form-input v-model="form.proExpiredAt" name="proExpiredAt" placeholder="Pro Expired At" :error="errors.proExpiredAt" date />
      <form-button type="submit" variant="primary" :loading="loading">Create user</form-button>
      <b-button to="/admin/users" variant="danger" :disabled="loading">Cancel</b-button>
    </b-form>
  </b-card>
</template>

<script>
const initialError = {
  name: '',
  email: '',
  password: '',
  role: '',
  proExpiredAt: '',
}

export default {
  name: 'AdminCreateUserPage',
  layout: 'admin',
  middleware: ['auth', 'admin'],
  meta: {
    can: 'Manage user',
  },
  async asyncData({ $axios }) {
    const roles = await $axios.$get('/admin/roles')
    return {
      roles: [{ value: '', text: 'none' }, ...roles.map((el) => ({ value: el.id, text: el.name }))].filter(
        (el) => el.text !== 'Super Admin'
      ),
    }
  },
  data() {
    return {
      form: {
        name: '',
        email: '',
        password: '',
        role: '',
        proExpiredAt: '',
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
        await this.$axios.$post('/admin/users', data)
        return this.$router.push('/admin/users')
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
  },
}
</script>
