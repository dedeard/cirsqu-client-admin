<template>
  <b-card title="Card Title" no-body>
    <b-card-header header-tag="nav">
      <b-nav card-header tabs>
        <b-nav-item :to="`/admin/lessons/${$route.params.id}`" exact-active-class="active">Info</b-nav-item>
        <b-nav-item :to="`/admin/lessons/${$route.params.id}/episodes`" exact-active-class="active">Episodes</b-nav-item>
      </b-nav>
    </b-card-header>
    <b-card-body>
      <nuxt-child />
    </b-card-body>
  </b-card>
</template>

<script>
export default {
  name: 'EditLessonPage',
  layout: 'admin',
  middleware: ['auth', 'admin'],
  meta: {
    can: 'Manage lesson',
  },
}
</script>
