<template>
  <b-container class="py-3">
    <b-row class="py-5">
      <b-col lg="6" md="8" class="mx-auto">
        <h1 class="text-center">Get unlimited access with a premium membership</h1>
        <p class="lead text-center">Join thousands of developers improving their skills every day</p>
      </b-col>
    </b-row>
    <b-row>
      <b-col v-for="el in pricePlans" :key="el.id" md="4" class="d-flex">
        <price-plan :price-plan="el" />
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  name: 'ProPage',
  async asyncData({ $axios }) {
    const data = await $axios.$get('/prices')
    return {
      pricePlans: data,
    }
  },
}
</script>
