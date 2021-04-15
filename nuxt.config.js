export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'lotto-nuxt',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css?family=Kanit'
      }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['@assets/css/main.css'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: ['@nuxtjs/axios', '@nuxtjs/auth'],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},

  axios: {
    baseURL: 'http://127.0.0.1:8080/api/v1',
    proxyHeaders: false,
    credentials: false,
    headers: {
      Authrization: 'Bearer'
    }
  },
  auth: {
    strategies: {
      local: {
        endpoints: {
          login: { url: 'auth/signin', method: 'post', propertyName: 'token' },
          user: { url: '/auth/me', method: 'get', propertyName: false },
          logout: { url: '/auth/signout', method: 'post' }
        }
      }
    },
    redirect: {
      login: '/login'
    }
  }
}
