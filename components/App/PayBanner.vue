<template>
  <b-alert variant="info" show>
    <b-container>
      <div class="d-flex">
        <h5 class="mr-3 my-auto text-uppercase">{{ waitingPaid.status }}</h5>
        <p class="my-auto">
          <strong>Rp {{ waitingPaid.grossAmount }}</strong> / {{ waitingPaid.months }} month
        </p>
        <b-button variant="primary" class="ml-auto" size="sm" @click="pay">Detail</b-button>
        <b-button variant="danger" class="ml-2" size="sm" @click="cancel">Cancel</b-button>
      </div>
    </b-container>
  </b-alert>
</template>

<script>
export default {
  name: 'AppPayBanner',
  computed: {
    waitingPaid() {
      return this.$store.getters.orders.find((el) => el.status === 'pending')
    },
  },
  methods: {
    pay() {
      window.snap.pay(this.waitingPaid.snapToken)
    },
    async cancel() {
      const result = await this.$swal({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#dc3545',
        cancelButtonColor: '#007bff',
        confirmButtonText: 'Yes, cancel it!',
      })
      if (result.value) {
        try {
          await this.$store.dispatch('order/cancelOrder', this.waitingPaid.id)
        } catch (e) {
          this.$swal({
            icon: 'error',
            text: this.$errorMessage(e),
          })
        }
      }
    },
  },
}
</script>
