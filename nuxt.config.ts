export default defineNuxtConfig({
    // Defaults
    compatibilityDate: '2024-11-01',
    devtools: { enabled: false },

    // Head [Icon, charset, meta]
    app: {
        head: {
            link: [{ rel: 'icon', type: 'image/svg', href: '/logo.svg' }]
        }
    },

    // Src Directory
    srcDir: 'src/',

    // Modules and components
    modules: ['@nuxt/ui', '@nuxt/image', '@nuxt/fonts', 'shadcn-nuxt', '@pinia/nuxt', '@vee-validate/nuxt'],
    components: {
        dirs: [
            { path: '~/components/global', global: true },
        ]
    },

    // Tailwind CSS
    css: ['~/assets/css/main.css'],

    // State Manager (Pinia)
    pinia: {
        storesDirs: ['./src/stores/**']
    },

    // Libraries
    shadcn: {
        prefix: 'Ui',
        componentDir: './src/components/ui'
    },

    veeValidate: {
        autoImports: true
    }
});