const baseUrl = process.env.BASE_URL || 'http://localhost:3000'
const baseApiUrl = process.env.BASE_API_URL || 'http://localhost:4000'

export default {
  ssr: false,

  publicRuntimeConfig: {
    baseUrl,
    baseApiUrl,
    production: process.env.NODE_ENV === 'production',
    pusherKey: process.env.PUSHER_KEY,
  },

  head: {
    title: 'frontend',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    // script: [{ src: 'https://app.sandbox.midtrans.com/snap/snap.js', 'data-client-key': 'SB-Mid-client-QJbS4LVD7SKbLhLG' }],
  },

  loading: {
    color: '#007bff',
    height: '3px',
  },

  css: ['~/assets/fonts/inter/style.css', '~/assets/scss/main.scss'],

  plugins: ['~/plugins/ApiErrorResponse.js', '~/plugins/Axios.js'],

  components: true,

  buildModules: [],

  modules: ['bootstrap-vue/nuxt', '@nuxtjs/axios', 'nuxt-client-init-module', 'vue-sweetalert2/nuxt'],

  axios: {
    baseURL: baseApiUrl,
    progress: false,
  },

  bootstrapVue: {
    icons: true,
    bootstrapCSS: false,
    bootstrapVueCSS: false,
  },

  build: {},
}
