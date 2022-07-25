<template>
  <header>
    <b-container>
      <div class="d-flex py-3 border-bottom">
        <b-link to="/" class="d-block">
          <svg-logo width="40px" height="40px" />
        </b-link>
        <div v-if="auth && auth.role" class="my-auto pl-3">
          <b-button variant="primary" to="/admin/dashboard">ADMIN</b-button>
        </div>
        <div class="px-3 flex-fill my-auto">
          <button class="px-2 border btn btn-block">
            <div class="d-flex">
              <div class="my-auto">
                <b-icon-search />
              </div>
              <div class="my-auto pl-2">
                <span>Search...</span>
              </div>
            </div>
          </button>
        </div>
        <div class="my-auto d-none d-lg-block" v-if="!auth">
          <b-button variant="link" class="mx-3" to="/">Start learning</b-button>
          <span class="text-secondary">|</span>
          <b-button variant="link" class="mx-3" to="/login">Login</b-button>
          <b-button variant="primary" to="/register">Register</b-button>
        </div>
        <div class="my-auto d-lg-none" v-if="!auth">
          <b-dropdown variant="primary" right>
            <template #button-content>
              <b-icon-menu-app />
            </template>
            <b-dd-item to="/">Start learning</b-dd-item>
            <b-dd-item to="/login">Login</b-dd-item>
            <b-dd-item to="/register" variant="primary">Register</b-dd-item>
          </b-dropdown>
        </div>
        <div class="my-auto d-none d-lg-block" v-if="auth">
          <b-button variant="link" class="mx-3" to="/">Start learning</b-button>
          <span class="text-secondary">|</span>
          <b-button variant="primary" class="ml-3" to="/pro">{{ auth.pro ? 'Renew Premium' : 'Join Premium' }}</b-button>
        </div>
        <div class="my-auto d-lg-none" v-if="auth">
          <b-dropdown variant="primary" right>
            <template #button-content>
              <b-icon-menu-app size="16" />
            </template>
            <b-dd-item to="/">Start learning</b-dd-item>
            <b-dd-item to="/pro" variant="primary">{{ auth.pro ? 'Renew Premium' : 'Join Premium' }}</b-dd-item>
          </b-dropdown>
        </div>
        <div v-if="auth" class="my-auto pl-3">
          <b-link to="/dashboard">
            <b-img :src="auth.avatar || '/avatar.png'" width="40px" height="40px" rounded="circle" />
          </b-link>
        </div>
      </div>
    </b-container>
  </header>
</template>

<script>
export default {
  name: 'AppNavbar',
  computed: {
    auth() {
      return this.$store.getters.auth
    },
  },
}
</script>
