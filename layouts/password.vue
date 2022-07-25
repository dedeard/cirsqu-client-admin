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
              <div class="p-3">
                <Nuxt class="px-10 pb-10" />
              </div>
            </div>
          </b-col>
        </b-row>
      </b-container>
    </main>
    <footer class="pb-10 text-center text-gray-400">© CIRSQU {{ new Date().getFullYear() }}</footer>
  </div>
</template>

<script>
export default {
  name: 'PasswordLayout',
}
</script>

<style>
.is-nav-active {
  background-color: var(--light) !important;
}
</style>
