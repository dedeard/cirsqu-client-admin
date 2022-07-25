import Pusher from 'pusher-js'

export const state = () => ({})

export const getters = {
  auth(state) {
    return state.auth.auth
  },
  token(state) {
    return state.auth.token
  },
  role(state) {
    return state.auth?.auth?.role || null
  },
  permissions(state) {
    return state.auth?.auth?.role?.permissions || []
  },

  orders(state) {
    return state.order.orders || []
  },
}

export const actions = {
  async nuxtClientInit({ dispatch }) {
    try {
      await dispatch('auth/checkAuth')
    } catch (e) {
      // console.log(e)
    }
  },
  listen({ commit, getters }) {
    if (getters.token) {
      const pusher = new Pusher(this.$config.pusherKey, {
        cluster: 'ap1',
        userAuthentication: {
          endpoint: this.$config.baseApiUrl + '/account/pusher',
          headers: {
            Authorization: 'bearer ' + getters.token,
          },
        },
      })
      pusher.signin()

      pusher.user.bind('order-notification', (order) => {
        commit('order/updateOrder', order)
      })
    }
  },
}

export const mutations = {}
