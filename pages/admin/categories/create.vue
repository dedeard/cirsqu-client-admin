<template>
  <b-card header="CREATE CATEGORY">
    <b-form @submit.prevent="submit(form)">
      <form-input v-model="form.name" name="name" placeholder="Name" :error="errors.name" />
      <form-input v-model="form.description" name="description" placeholder="Description" :error="errors.description" textarea />
      <form-button type="submit" variant="primary" :loading="loading">Create category</form-button>
      <b-button to="/admin/categories" variant="danger" :disabled="loading">Cancel</b-button>
    </b-form>
  </b-card>
</template>

<script>
const initialError = {
  name: '',
  description: '',
}

export default {
  name: 'AdminCreateCategoryPage',
  layout: 'admin',
  middleware: ['auth', 'admin'],
  meta: {
    can: 'Manage category',
  },
  data() {
    return {
      form: {
        name: '',
        description: '',
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
        await this.$axios.$post('/admin/categories', data)
        return this.$router.push('/admin/categories')
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
