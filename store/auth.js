import cookie from 'js-cookie'
import moment from 'moment'

export const state = () => {
  return {
    auth: null,
    token: null,
  }
}

export const actions = {
  checkAuth({ commit, dispatch }) {
    let data
    return this.$axios
      .$get('account/profile')
      .then((user) => {
        data = user
        commit('setAuth', user)
        commit('setToken', cookie.get('api-token'))
        return dispatch('order/loadOrders', null, { root: true })
      })
      .then((orders) => {
        dispatch('listen', null, { root: true })
        return data
      })
  },
  login({ commit, dispatch }, payload) {
    let data
    return this.$axios
      .$post('auth/login', payload)
      .then(async (res) => {
        commit('setAuth', res.user)
        commit('setToken', res.token.bearer)
        cookie.set('api-token', res.token.bearer, {
          expires: moment(res.token.expiredAt).diff(moment(), 'days'),
          sameSite: 'Strict',
          secure: true,
        })
        data = res
        return dispatch('order/loadOrders', null, { root: true })
      })
      .then(() => {
        dispatch('listen', null, { root: true })
        return data
      })
  },
  logout({ commit }) {
    commit('setAuth', null)
    commit('setToken', null)
    cookie.remove('api-token')
  },
}

export const mutations = {
  setAuth(state, auth) {
    state.auth = auth || null
  },
  setToken(state, token) {
    state.token = token || null
  },
}
