export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@pinia/nuxt',
    '@nuxt/fonts',
    '@nuxtjs/color-mode',
  ],
  devtools: {
    enabled: true,
  },
  css: ['~/assets/styles/main.scss'],
  colorMode: {
    preference: 'system',
    fallback: 'light',
    classSuffix: '',
  },
  compatibilityDate: '2025-07-15',
  eslint: {
    config: {
      stylistic: true,
      standalone: true,
    },
  },
  fonts: {
    defaults: {
      weights: [400, 500, 600, 700, 800],
      styles: ['normal'],
      subsets: ['latin', 'cyrillic'],
    },
  },
})
