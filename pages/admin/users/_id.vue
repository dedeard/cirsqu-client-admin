<template>
  <b-card title="Card Title" no-body>
    <b-card-header header-tag="nav">
      <b-nav card-header tabs>
        <b-nav-item :to="`/admin/users/${$route.params.id}`" exact-active-class="active">Activity</b-nav-item>
        <b-nav-item :to="`/admin/users/${$route.params.id}/profile`" exact-active-class="active">Edit Profile</b-nav-item>
        <b-nav-item :to="`/admin/users/${$route.params.id}/transactions`" exact-active-class="active">Transactions</b-nav-item>
      </b-nav>
    </b-card-header>
    <nuxt-child class="card-body" />
  </b-card>
</template>

<script>
export default {
  name: 'AdminUserPage',
  layout: 'admin',
  middleware: ['auth', 'admin'],
  meta: {
    can: 'Manage user',
  },
}
</script>
