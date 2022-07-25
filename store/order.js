export const state = () => {
  return {
    orders: [],
  }
}

export const actions = {
  loadOrders({ commit, rootGetters }) {
    if (rootGetters.token) {
      this.$axios.$get('/orders').then((orders) => {
        commit('setOrders', orders)
      })
    }
  },
  checkout({ commit }, { priceId, paymentType }) {
    return this.$axios.$post(`/orders/checkout/${priceId}/${paymentType}`, {}).then((order) => {
      commit('addOrder', order)
      return order
    })
  },
  cancelOrder({ commit }, orderId) {
    return this.$axios.$put('/orders/' + orderId + '/cancel', {}).then((order) => {
      commit('updateOrder', order)
      return order
    })
  },
}

export const mutations = {
  setOrders(state, orders) {
    state.orders = orders
  },
  updateOrder(state, order) {
    state.orders = [...state.orders.map((o) => (o.id === order.id ? order : o))]
  },
  addOrder(state, order) {
    state.orders = [order, ...state.orders]
  },
}
