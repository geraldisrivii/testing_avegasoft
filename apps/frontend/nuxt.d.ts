// nuxt.d.ts
// import { Api } from './api'

declare module '#app' {
  interface NuxtApp {
    $api: typeof $fetch
  }
}
