<template>
  <div>
    <app-pay-banner v-if="$store.getters.orders?.find((el) => el.status === 'pending')" />
    <app-navbar />
    <Nuxt class="px-10 pb-10" />
    <footer class="pb-10 text-center text-gray-400">© CIRSQU {{ new Date().getFullYear() }}</footer>
  </div>
</template>

<script>
export default {
  name: 'DefaultLayout',
}
</script>
