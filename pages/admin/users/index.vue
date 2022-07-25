<template>
  <div class="card">
    <div class="card-header">
      <span>USERS</span>
      <span class="float-right">
        <b-button variant="primary" size="sm" to="/admin/users/create">Create</b-button>
      </span>
    </div>
    <b-table striped hover :items="users" :fields="fields">
      <template #cell(proExpiredAt)="data">
        <span v-if="data.item.pro">{{ formatDate(data.item.proExpiredAt) }}</span>
      </template>
      <template #cell(action)="data">
        <b-button
          v-if="data.item.role?.name !== 'Super Admin' || $store.getters.role?.name === 'Super Admin'"
          variant="info"
          size="sm"
          :to="'/admin/users/' + data.item.id"
          >Edit</b-button
        >
        <b-button v-if="data.item.role?.name !== 'Super Admin'" variant="danger" size="sm" @click.prevent="deleteUser(data.item.id)"
          >Delete</b-button
        >
      </template>
    </b-table>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  name: 'AdminUsersPage',
  layout: 'admin',
  middleware: ['auth', 'admin'],
  meta: {
    can: 'Manage user',
  },
  async asyncData({ $axios }) {
    const users = await $axios.$get('/admin/users')
    return {
      fields: [
        { key: 'name', sortable: true },
        { key: 'email', sortable: true },
        { key: 'role.name', sortable: true, label: 'Role' },
        { key: 'proExpiredAt', label: 'Pro' },
        { key: 'action', class: 'action-cell' },
      ],
      users,
    }
  },
  methods: {
    formatDate(date) {
      return moment(date).format('DD-MMM-YYYY')
    },
    async deleteUser(id) {
      const result = await this.$swal({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
      })
      if (result.value) {
        try {
          await this.$axios.$delete('admin/users/' + id)
          this.users = this.users.filter((user) => id !== user.id)
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
