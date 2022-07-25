<template>
  <div class="card">
    <div class="card-header">
      <span>CATEGORIES</span>
      <span class="float-right">
        <b-button variant="primary" size="sm" to="/admin/categories/create">Create</b-button>
      </span>
    </div>
    <b-table striped hover :items="items" :fields="fields">
      <template #cell(action)="data">
        <b-button variant="info" size="sm" :to="'/admin/categories/' + data.item.id">Edit</b-button>
        <b-button variant="danger" size="sm" @click.prevent="deleteCategory(data.item.id)">Delete</b-button>
      </template>
    </b-table>
  </div>
</template>

<script>
export default {
  name: 'AdminCategoryListsPage',
  layout: 'admin',
  middleware: ['auth', 'admin'],
  meta: {
    can: 'Manage category',
  },
  async asyncData({ $axios }) {
    const items = await $axios.$get('admin/categories')
    return {
      fields: [
        { key: 'name', sortable: true },
        { key: 'action', class: 'action-cell' },
      ],
      items,
    }
  },
  methods: {
    async deleteCategory(id) {
      const result = await this.$swal({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
      })
      if (result.value) {
        try {
          await this.$axios.$delete('admin/categories/' + id)
          this.items = this.items.filter((item) => id !== item.id)
        } catch (e) {
          const err = this.$errorMessage(e)
          this.$bvToast.toast(err.message, {
            title: 'Error',
            variant: 'danger',
          })
        }
      }
    },
  },
}
</script>

<style>
.action-cell {
  width: 140px;
}
</style>
