<template>
  <div>
    <app-navbar />
    <b-container class="py-3">
      <b-row>
        <b-col md="4" lg="3" class="mb-3">
          <b-card bg-variant="light" class="mb-1 shadow-sm">
            <div class="text-center py-2">
              <form-avatar />
              <h4 class="text-truncate text-capitalize m-0">{{ auth.name }}</h4>
              <p class="text-muted m-0">{{ role.name }}</p>
            </div>
          </b-card>
          <div v-for="link in links" :key="link.to">
            <b-link
              v-if="can(link.can)"
              :to="'/admin' + link.to"
              class="d-block border px-3 py-2 mb-1 shadow-sm"
              active-class="bg-primary text-white border-primary"
            >
              {{ link.text }}
            </b-link>
          </div>
        </b-col>
        <b-col md="8" lg="9">
          <Nuxt class="px-10 pb-10" />
        </b-col>
      </b-row>
    </b-container>
    <footer class="pb-10 text-center text-gray-400">© CIRSQU {{ new Date().getFullYear() }}</footer>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'DefaultLayout',
  data() {
    return {
      links: [
        { text: 'Dashboard', to: '/dashboard' },
        { text: 'Users', to: '/users', can: 'Manage user' },
        { text: 'Prices', to: '/prices', can: 'Manage price' },
        { text: 'Categories', to: '/categories', can: 'Manage category' },
        { text: 'Lessons', to: '/lessons', can: 'Manage lesson' },
        { text: 'Roles', to: '/roles', can: 'Manage role' },
      ],
    }
  },
  computed: {
    ...mapGetters(['auth', 'role', 'permissions']),
  },
  methods: {
    can(permision) {
      if (this.role.name === 'Super Admin') {
        return true
      }
      if (!permision || this.permissions.find((el) => el === permision)) {
        return true
      }
      return false
    },
  },
}
</script>
