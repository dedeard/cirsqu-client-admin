<template>
  <div class="card">
    <div class="card-header">
      <span>ROLES</span>
      <span class="float-right">
        <b-button variant="primary" size="sm" to="/admin/roles/create">Create</b-button>
      </span>
    </div>
    <b-table striped hover :items="roles" :fields="fields">
      <template #cell(action)="data">
        <b-button v-if="data.item.name !== 'Super Admin'" variant="info" size="sm" :to="'/admin/roles/' + data.item.id">Edit</b-button>
        <b-button v-if="data.item.name !== 'Super Admin'" variant="danger" size="sm" @click.prevent="deleteRole(data.item.id)"
          >Delete</b-button
        >
      </template>
    </b-table>
  </div>
</template>

<script>
export default {
  name: 'AdminRolesPage',
  layout: 'admin',
  middleware: ['auth', 'admin'],
  meta: {
    can: 'Manage role',
  },
  async asyncData({ $axios }) {
    const roles = await $axios.$get('/admin/roles')
    return {
      fields: [
        { key: 'name', sortable: true },
        { key: 'action', class: 'action-cell' },
      ],
      roles,
    }
  },
  methods: {
    async deleteRole(id) {
      const result = await this.$swal({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
      })
      if (result.value) {
        try {
          await this.$axios.$delete('/admin/roles/' + id)
          this.roles = this.roles.filter((item) => id !== item.id)
        } catch (e) {
          this.$swal({
            icon: 'error',
            text: this.$errorMessage(e),
          })
        }
      }
    },
  },
}
</script>

<style>
.action-cell {
  width: 124px;
}
</style>
