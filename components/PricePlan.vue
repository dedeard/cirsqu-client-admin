<template>
  <b-card
    :header="pricePlan.name"
    header-class="h5 text-center"
    class="flex-fill mb-3"
    body-class="text-center flex-fill d-flex flex-column"
  >
    <h3>Rp {{ pricePlan.price }}</h3>
    <ul class="list-unstyled my-2 mb-3 flex-fill">
      <li v-for="(list, i) in pricePlan.details" :key="i">{{ list }}</li>
    </ul>
    <b-button variant="primary" block size="lg" :to="'/pro/checkout?plan=' + pricePlan.slug" :disabled="loading">Checkout</b-button>
  </b-card>
</template>

<script>
export default {
  name: 'PricePlan',
  props: {
    pricePlan: {
      type: Object,
      required: true,
      default: () => ({}),
    },
  },
  data() {
    return {
      loading: false,
    }
  },
}
</script>
