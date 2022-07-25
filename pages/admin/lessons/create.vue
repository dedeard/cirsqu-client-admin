<template>
  <b-card header="CREATE LESSON">
    <b-form @submit.prevent="submit(form)">
      <form-input v-model="form.title" name="title" placeholder="Title" :error="errors.title" />
      <form-input v-model="form.description" name="description" placeholder="Description" :error="errors.description" textarea />
      <form-input
        v-model="form.categories"
        name="categories"
        placeholder="Categories"
        :error="errors.categories"
        select
        multiple
        :options="categories"
      />
      <form-button type="submit" variant="primary" :loading="loading">Create lesson</form-button>
      <b-button to="/admin/lessons" variant="danger" :disabled="loading">Cancel</b-button>
    </b-form>
  </b-card>
</template>

<script>
const initialError = {
  name: '',
  description: '',
  categories: '',
}

export default {
  name: 'CreateCategoryPage',
  layout: 'admin',
  middleware: ['auth', 'admin'],
  meta: {
    can: 'Manage lesson',
  },
  async asyncData({ $axios }) {
    const categories = await $axios.$get('/admin/categories')
    return {
      categories: categories.map((el) => ({ text: el.name, value: el.id })),
      form: {
        name: '',
        description: '',
        categories: [],
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
        await this.$axios.$post('/admin/lessons', data)
        return this.$router.push('/admin/lessons')
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
