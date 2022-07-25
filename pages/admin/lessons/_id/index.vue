<template>
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
    <form-input
      v-model="form.publish"
      name="publish"
      placeholder="Status"
      :error="errors.publish"
      select
      :options="[
        { value: true, text: 'Public' },
        { value: false, text: 'Draf' },
      ]"
    />
    <form-button type="submit" variant="primary" :loading="loading">Update</form-button>
  </b-form>
</template>

<script>
const initialError = {
  title: '',
  description: '',
  publish: '',
  categories: '',
}
export default {
  name: 'EditLessonInfoPage',
  async asyncData({ $axios, params }) {
    const id = params.id
    const categories = await $axios.$get('/admin/categories')
    const lesson = await $axios.$get('/admin/lessons/' + id)
    return {
      categories: categories.map((el) => ({ value: el.id, text: el.name })),
      lesson,
      form: {
        title: lesson.title,
        description: lesson.description,
        publish: lesson.publish,
        categories: lesson.categories.map((el) => el.id),
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
        await this.$axios.$put('admin/lessons/' + this.lesson.id, data)
        this.$swal({
          icon: 'success',
          text: 'Lesson info has been updated.',
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
