export default defineNuxtConfig({
  modules: ['@nuxt/eslint', '@pinia/nuxt'],
  devtools: {
    enabled: true,
  },
  css: ['~/assets/styles/main.scss'],
  compatibilityDate: '2025-07-15',
  eslint: {
    config: {
      stylistic: true,
      standalone: true,
    },
  },
})
