import { defineNuxtPlugin } from '#app'
import config from '@/config.json'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.hook('app:mounted', () => {
    document.title = config.title
  })
})
