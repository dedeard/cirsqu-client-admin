<template>
  <div class="card">
    <div class="card-header">
      <span>PRICES</span>
    </div>
    <b-table striped hover :items="prices" :fields="fields">
      <template #cell(action)="data">
        <b-button variant="info" size="sm" :to="'/admin/prices/' + data.item.id">Edit</b-button>
      </template>
    </b-table>
  </div>
</template>

<script>
export default {
  name: 'AdminPricesPage',
  layout: 'admin',
  middleware: ['auth', 'admin'],
  meta: {
    can: 'Manage price',
  },
  async asyncData({ $axios }) {
    const prices = await $axios.$get('/admin/prices')
    return {
      fields: [
        { key: 'name', sortable: true },
        { key: 'months', sortable: true },
        { key: 'action', class: 'action-cell' },
      ],
      prices,
    }
  },
}
</script>

<style>
.action-cell {
  width: 124px;
}
</style>
