<template>
  <b-form @submit.prevent="submit(form)">
    <form-input v-model="form.name" name="name" placeholder="Name" :error="errors.name" />
    <form-input v-model="form.email" name="email" placeholder="Email address" :error="errors.email" />
    <form-input v-model="form.password" name="password" placeholder="Password" :error="errors.email" password />
    <form-input v-model="form.role" name="role" placeholder="Role" :error="errors.role" select :options="roles" />
    <form-input v-model="form.proExpiredAt" name="proExpiredAt" placeholder="Pro Expired At" :error="errors.proExpiredAt" date />
    <form-button type="submit" variant="primary" :loading="loading">Update</form-button>
  </b-form>
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
  name: 'AdminUpdateUserProfilePage',
  layout: 'admin',
  async asyncData({ $axios, params }) {
    const roles = await $axios.$get('/admin/roles')
    const user = await $axios.$get('/admin/users/' + params.id)
    return {
      id: params.id,
      form: {
        name: user.name,
        email: user.email,
        password: '',
        role: user.role?.id || '',
        proExpiredAt: user.pro ? user.proExpiredAt : '',
      },
      errors: initialError,
      loading: false,
      roles: [{ value: '', text: 'none' }, ...roles.map((el) => ({ value: el.id, text: el.name }))].filter(
        (el) => el.text !== 'Super Admin'
      ),
    }
  },
  methods: {
    async submit(data) {
      this.loading = true
      this.errors = initialError
      try {
        const user = await this.$axios.$put('/admin/users/' + this.id, data)
        this.form = {
          name: user.name,
          email: user.email,
          password: '',
          role: user.role?.id || '',
          proExpiredAt: user.pro ? user.proExpiredAt : '',
        }
        this.$swal({
          icon: 'success',
          text: 'User updated',
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
  },
}
</script>
