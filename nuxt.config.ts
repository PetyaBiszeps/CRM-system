export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@pinia/nuxt',
    '@nuxt/fonts',
    '@nuxtjs/color-mode',
    '@nuxtjs/i18n',
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
  i18n: {
    restructureDir: 'app/',
    locales: [{
      code: 'en', name: 'English', language: 'en-US', file: 'en.json',
    }, {
      code: 'uk', name: 'Українська', language: 'uk-UA', file: 'uk.json',
    }],
    defaultLocale: 'en',
    strategy: 'no_prefix',
  },
})
