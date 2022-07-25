<template>
  <b-container class="py-5">
    <b-row>
      <b-col md="6">
        <h4 class="mb-3">Choose Payment Type</h4>
        <b-button
          v-for="payment in payments"
          :key="payment.value"
          :variant="payment.value === paymentType ? 'dark' : 'outline-dark'"
          block
          class="bg-transparent text-dark"
          @click="paymentType = payment.value"
        >
          <div class="d-flex">
            <div>
              <b-iconstack font-scale="1.5">
                <b-icon stacked icon="square"></b-icon>
                <b-icon stacked icon="check" v-if="payment.value === paymentType"></b-icon>
              </b-iconstack>
              {{ payment.text }}
            </div>
            <div class="ml-auto"></div>
          </div>
        </b-button>

        <form-button variant="primary" block size="lg" class="mt-4" @click="checkout" :loading="loading">Checkout</form-button>
      </b-col>
      <b-col md="6">
        <h4 class="mb-3">Chosen plan</h4>
        <b-button
          v-for="plan in plans"
          :key="plan.id"
          :variant="plan.slug === slug ? 'primary' : 'outline-primary'"
          block
          class="py-3"
          @click="slug = plan.slug"
        >
          <div class="d-flex">
            <div>
              <b-iconstack font-scale="1.5">
                <b-icon stacked icon="square"></b-icon>
                <b-icon stacked icon="check" v-if="plan.slug === slug"></b-icon>
              </b-iconstack>
              {{ plan.name }}
            </div>
            <div class="ml-auto">
              <small
                ><strong>IDR {{ Number(plan.price).toLocaleString('id-ID', { currency: 'IDR' }) }}</strong
                >/ {{ plan.months }} bulan</small
              >
            </div>
          </div>
        </b-button>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  name: 'CheckoutPage',
  async asyncData({ $axios, query }) {
    let slug = query.plan
    const plans = await $axios.$get('/prices')
    slug = plans.find((el) => el.slug === slug)?.slug || plans[0].slug
    return {
      slug,
      plans,
      loading: false,
      paymentType: 'bca',
      payments: [
        { value: 'bca', text: 'BCA Virtual Account' },
        { value: 'bni', text: 'BNI Virtual Account' },
        { value: 'bri', text: 'BRI Virtual Account' },
        { value: 'indomaret', text: 'Indomaret / iSaku' },
        { value: 'alfamart', text: 'Alfa Group' },
      ],
    }
  },
  computed: {
    plan() {
      return this.plans.find((el) => el.slug === this.slug)
    },
  },
  methods: {
    async checkout() {
      this.loading = true

      try {
        const order = await this.$store.dispatch('order/checkout', { priceId: this.plan.id, paymentType: this.paymentType })
        console.log(order)
      } catch (e) {
        this.$swal({
          title: 'Error',
          text: this.$errorMessage(e),
          type: 'error',
        })
      }
      this.loading = false
    },
  },
}
</script>
