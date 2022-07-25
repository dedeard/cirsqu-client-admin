<template>
  <b-container class="py-3">
    <b-row>
      <b-col md="4" lg="3" class="mb-3">
        <b-card bg-variant="light" class="mb-1 shadow-sm">
          <div class="text-center py-2">
            <form-avatar />
            <h4 class="text-truncate text-capitalize m-0">{{ auth.name }}</h4>
            <p class="text-muted">{{ auth.email }}</p>
            <b-button variant="danger" @click="logout" :disabled="logoutPending">LOGOUT</b-button>
          </div>
        </b-card>
      </b-col>
      <b-col md="8" lg="9">
        <b-card no-body>
          <b-card-header header-tag="nav">
            <b-nav card-header tabs>
              <b-nav-item to="/dashboard" exact-active-class="active">Activity</b-nav-item>
              <b-nav-item to="/dashboard/edit-profile" exact-active-class="active">Edit Profile</b-nav-item>
              <b-nav-item to="/dashboard/transactions" exact-active-class="active">Transactions</b-nav-item>
            </b-nav>
          </b-card-header>
          <nuxt-child class="card-body" />
        </b-card>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  name: 'DashboardWrapperPage',
  middleware: ['auth'],
  computed: {
    auth() {
      return this.$store.getters.auth
    },
  },
  data() {
    return {
      logoutPending: false,
    }
  },
  methods: {
    logout() {
      this.logoutPending = true
      this.$router.push('/')
    },
  },
  destroyed() {
    if (this.logoutPending) this.$store.dispatch('auth/logout')
  },
}
</script>
