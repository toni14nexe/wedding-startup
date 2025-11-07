<script setup lang="ts">
import UploadPage from '~/components/upload/UploadPage.vue'
import { dateTime } from '@/config.json'

const router = useRouter()

const uploadState = computed(() => getUploadState(dateTime))

onMounted(() => {
  if (uploadState.value === 'after') router.push('/')
})
</script>

<template>
  <main class="page-container">
    <UploadPage />
  </main>
</template>

<style lang="css" scoped>
.page-container {
  min-height: 60dvh;
}
</style>
