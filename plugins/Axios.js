import cookie from 'js-cookie'

export default function ({ $axios }) {
  $axios.onRequest(({ headers }) => {
    const token = cookie.get('api-token')
    if (token) {
      headers.common.Authorization = 'Bearer ' + token
    }
  })
}
