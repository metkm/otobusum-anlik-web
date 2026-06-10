// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@nuxt/ui',
    '@nuxt/scripts',
    '@pinia/nuxt',
    'pinia-plugin-persistedstate/nuxt',
    '@vueuse/nuxt',
    'motion-v/nuxt',
    '@nuxtjs/i18n',
  ],
  ssr: false,
  devtools: { enabled: false },
  app: {
    head: {
      meta: [
        { name: 'viewport', content: 'viewport-fit=cover, initial-scale=1' },
      ],
      link: [
        { rel: 'manifest', href: 'manifest.json' },
      ],
    },
    rootAttrs: {
      style: 'background-color: oklch(20.5% 0 0);',
    },
  },
  css: [`~/assets/main.css`],
  runtimeConfig: {
    public: {
      scripts: {
        googleMaps: {
          apiKey: '', // NUXT_PUBLIC_SCRIPTS_GOOGLE_MAPS_API_KEY
        },
      },
      baseUrl: '',
    },
  },
  experimental: {
    viteEnvironmentApi: true,
    typedPages: true,
  },
  compatibilityDate: '2025-07-15',
  eslint: {
    config: {
      stylistic: true,
    },
  },
  i18n: {
    locales: [
      { code: 'en', language: 'en-US', file: 'en.json' },
      { code: 'tr', language: 'tr-TR', file: 'tr.json' },
    ],
    strategy: 'no_prefix',
    detectBrowserLanguage: {
      useCookie: false,
    },
  },
  icon: {
    clientBundle: {
      scan: true,
    },
  },
  scripts: {
    registry: {
      googleMaps: {},
    },
  },
})
