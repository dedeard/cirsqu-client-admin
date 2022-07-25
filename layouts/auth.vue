<template>
  <div class="bg-white">
    <header class="d-flex py-4 bg-white shadow-sm">
      <nuxt-link to="/" class="block m-auto text-primary">
        <svg-logo width="2.5rem" height="2.5rem" />
      </nuxt-link>
    </header>
    <main class="py-4 px-3">
      <b-container>
        <b-row>
          <b-col md="8" lg="6" class="mx-auto">
            <div class="bg-light border">
              <b-row no-gutters>
                <b-col>
                  <nuxt-link
                    to="/login"
                    active-class="is-nav-active border-bottom-0 text-secondary border-right-0"
                    class="d-block text-center py-3 border-bottom border-right font-weight-bold text-primary bg-white"
                  >
                    LOGIN
                  </nuxt-link>
                </b-col>
                <b-col>
                  <nuxt-link
                    to="/register"
                    active-class="is-nav-active border-bottom-0 text-secondary border-left-0"
                    class="d-block text-center py-3 border-bottom border-left font-weight-bold text-primary bg-white"
                  >
                    REGISTER
                  </nuxt-link>
                </b-col>
              </b-row>
              <div class="p-3">
                <Nuxt class="px-10 pb-10" />
              </div>
            </div>
          </b-col>
        </b-row>
      </b-container>
    </main>
    <footer class="pb-10 text-center text-gray-400">
      © CIRSQU {{ new Date().getFullYear() }}
    </footer>
  </div>
</template>

<script>
export default {
  name: 'AuthLayout',
}
</script>

<style>
.is-nav-active {
  background-color: var(--light) !important;
}
</style>
