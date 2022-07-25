<template>
  <b-card header="UPDATE ROLE">
    <b-form @submit.prevent="submit(form)">
      <form-input v-model="form.name" name="name" placeholder="Role name" :error="errors.name" />
      <form-input
        v-model="form.permissions"
        name="permissions"
        placeholder="Permissions"
        :error="errors.permissions"
        select
        multiple
        :options="permissions"
      />
      <form-button type="submit" variant="primary" :loading="loading">Update Role</form-button>
      <b-button to="/admin/roles" variant="danger" :disabled="loading">Cancel</b-button>
    </b-form>
  </b-card>
</template>

<script>
const initialError = {
  name: '',
  permissions: '',
}

export default {
  name: 'AdminUpdateRolePage',
  layout: 'admin',
  middleware: ['auth', 'admin'],
  meta: {
    can: 'Manage role',
  },
  async asyncData({ $axios, params }) {
    const id = params.id
    const role = await $axios.$get('/admin/roles/' + id)
    const permissions = await $axios.$get('/admin/permissions')
    return {
      id,
      role,
      permissions,
      form: {
        name: role.name,
        permissions: role.permissions,
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
        await this.$axios.$put('/admin/roles/' + this.id, data)
        this.$swal({
          icon: 'success',
          text: 'Role has been updated.',
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
