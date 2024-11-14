export default defineNuxtConfig({
  modules: ['@unocss/nuxt'],
  css: ['@unocss/reset/tailwind.css'],

  app: {
    head: {
      title: 'Wrikka OS',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' }
      ]
    },
    pageTransition: { name: 'page', mode: 'out-in' }
  },

  devtools: { enabled: false },

  experimental: {
    inlineSSRStyles: false
  },

  ssr: false,

  compatibilityDate: '2024-11-13',

  // Add router configuration to redirect root to chat
  router: {
    options: {
      redirect: {
        '': '/chat'
      }
    }
  }
})