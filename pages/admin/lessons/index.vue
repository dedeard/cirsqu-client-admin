<template>
  <div class="card">
    <div class="card-header">
      <span>LESSONS</span>
      <span class="float-right">
        <b-button variant="primary" size="sm" to="/admin/lessons/create">Create</b-button>
      </span>
    </div>
    <b-table striped hover :items="items" :fields="fields">
      <template #cell(action)="data">
        <b-button variant="info" size="sm" :to="'/admin/lessons/' + data.item.id">Edit</b-button>
        <b-button variant="danger" size="sm" @click.prevent="deleteLesson(data.item.id)">Delete</b-button>
      </template>
    </b-table>
  </div>
</template>

<script>
export default {
  name: 'AdminLessonListsPage',
  layout: 'admin',
  middleware: ['auth', 'admin'],
  meta: {
    can: 'Manage lesson',
  },
  async asyncData({ $axios }) {
    const items = await $axios.$get('/admin/lessons')
    return {
      fields: [
        { key: 'title', sortable: true },
        { key: 'publish', sortable: true },
        { key: 'action', class: 'action-cell' },
      ],
      items,
    }
  },
  methods: {
    async deleteLesson(id) {
      const result = await this.$swal({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
      })
      if (result.value) {
        try {
          await this.$axios.$delete('/admin/lessons/' + id)
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
