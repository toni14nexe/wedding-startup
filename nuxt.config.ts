// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: true,
  nitro: {
    preset: 'netlify',
  },
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@element-plus/nuxt', 'nuxt-viewport'],
  css: ['~/assets/styles/main.css'],
  runtimeConfig: {
    public: {
      cloudinaryUploadPreset: process.env.CLOUDINARY_UPLOAD_PRESET,
      cloudinaryCloudName: process.env.CLOUDINARY_CLOUD_NAME,
      cloudinaryFolder: process.env.CLOUDINARY_FOLDER,
    },
  },
})
