export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: false },

  runtimeConfig: {
    public: {
      DEMO_CONTRACT_ADDRESS: process.env.DEMO_CONTRACT_ADDRESS,
      API_URL: process.env.SERVER_API_ENDPOINT,
    },
  },

  components: {
    global: true,
    dirs: [
      {
        path: "~/components/pages",
        pathPrefix: false,
        prefix: "Scoped",
        extensions: [".vue"],
        global: false,
      },
      {
        path: "~/components",
        pathPrefix: false,
        extensions: [".vue"],
        global: false,
      },
    ],
  },

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  googleFonts: {
    families: {
      Philosopher: {
        wght: [400, 700],
        ital: [400, 700],
      },
      Roboto: {
        wght: [400, 500, 600, 700, 800, 900],
        ital: [400, 500, 600, 700, 800, 900],
      },
    },
  },

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
            @use '~/scss/variables.scss' as *;
            @use '~/scss/typography/index.scss' as *;
            @use '~/scss/adaptive/adaptive.create-container.scss' as *; 
            @use '~/scss/adaptive/adaptive.mixins.scss' as *;
          `,
        },
      },
    },
    build: {
      commonjsOptions: {
        transformMixedEsModules: true,
      },
    },
    resolve: {
      dedupe: ["vue"],
      alias: {
        util: "util/",
      },
    },
    plugins: [],
  },

  modules: [
    "@pinia/nuxt",
    "@nuxt/image",
    "@nuxtjs/google-fonts",
    "@vee-validate/nuxt",
    "./modules/module.safe-teleport-ui",
  ],
});
