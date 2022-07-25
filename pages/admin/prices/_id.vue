<template>
  <b-card header="UPDATE PRICE">
    <b-form @submit.prevent="submit(form)">
      <form-input v-model="form.name" name="name" placeholder="Price name" :error="errors.name" />
      <form-input v-model="form.slug" name="slug" placeholder="Slug" :error="errors.slug" />
      <form-input v-model="form.price" name="price" placeholder="Price" type="number" :error="errors.price" />
      <form-input-array v-model="form.details" name="details" placeholder="Details" :error="errors.details" />
      <form-button type="submit" variant="primary" :loading="loading">Update Price</form-button>
      <b-button to="/admin/prices" variant="danger" :disabled="loading">Cancel</b-button>
    </b-form>
  </b-card>
</template>

<script>
const initialError = {
  name: '',
  slug: '',
  price: '',
  details: '',
}

export default {
  name: 'AdminUpdatePricePage',
  layout: 'admin',
  middleware: ['auth', 'admin'],
  meta: {
    can: 'Manage price',
  },
  async asyncData({ $axios, params }) {
    const id = params.id
    const price = await $axios.$get('/admin/prices/' + id)
    return {
      id,
      price,
      form: {
        name: price.name,
        slug: price.slug,
        price: price.price,
        details: price.details,
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
        await this.$axios.$put('/admin/prices/' + this.id, data)
        this.$swal({
          icon: 'success',
          text: 'Price has been updated.',
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
