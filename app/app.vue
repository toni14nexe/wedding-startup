<script setup lang="ts">
import 'element-plus/theme-chalk/display.css'
const runtimeConfig = useRuntimeConfig()
import config from '@/config.json'

const baseUrl = runtimeConfig.public.appBaseUrl

useHead({
  titleTemplate: `${config.title}`,
  meta: [
    {
      name: 'keywords',
      content: `${config.title}, vjenčanje, pozivnica, galerija, slike, upload`,
    },
    { name: 'author', content: 'InnovaTech obrt za informatičke usluge' },
    { property: 'og:type', content: 'website' },

    // Image
    {
      property: 'og:image',
      content: `${baseUrl}/wedding-1200x630.jpg`,
    },
    { property: 'og:image:width', content: '1200' },
    { property: 'og:image:height', content: '630' },
    { property: 'og:url', content: baseUrl },
    { name: 'twitter:card', content: 'summary_large_image' },
    {
      name: 'twitter:image',
      content: `${baseUrl}/wedding-1200x630.jpg`,
    },
  ],
  link: [
    {
      rel: 'icon',
      type: 'image/png',
      href: `${baseUrl}/favicon.ico`,
    },
    {
      rel: 'apple-touch-icon',
      href: `${baseUrl}/favicon.ico`,
    },
  ],
})

useSeoMeta({
  title: `${config.title} - Ovo je priča o našem vjenčanju`,
  description:
    'Ovdje možete pronaći informacije o našem vjenčanju i prilikom same proslave podijeliti doživljaje s nama kako bi još ljepše uvećali svoj dolazak!',
  ogTitle: `${config.title} - Ovo je priča o našem vjenčanju`,
  ogDescription:
    'Ovdje možete pronaći informacije o našem vjenčanju i prilikom same proslave podijeliti doživljaje s nama kako bi još ljepše uvećali svoj dolazak!',
  ogImage: `${baseUrl}/wedding-1200x630.jpg`,
  ogUrl: baseUrl,
  twitterCard: 'summary_large_image',
  twitterImage: `${baseUrl}/wedding-1200x630.jpg`,
})
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
