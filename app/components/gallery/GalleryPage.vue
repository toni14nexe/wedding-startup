<script setup lang="ts">
import { dateTime } from '@/config.json'
import { Loading, ArrowLeftBold, ArrowRightBold, CloseBold } from '@element-plus/icons-vue'
import ImageWidget from './ImageWidget.vue'
import type { CloudinaryResponse } from '~/types/CloudinaryTypes'

const images = ref<string[]>([])
const today = new Date()
today.setHours(0, 0, 0, 0)
const weddingDay = new Date(dateTime)
weddingDay.setHours(0, 0, 0, 0)
const dayAfterWedding = new Date(weddingDay)
dayAfterWedding.setDate(weddingDay.getDate() + 1)
const imagesLoading = ref(true)
const currentIndex = ref()
const dialogImageUrl = ref<any>('')
const dialogVisible = ref(false)
const pagination = ref<{
  perPage: number
  lastCursor: string | undefined
  nextCursor: string
  total: number
}>({
  perPage: 20,
  lastCursor: undefined,
  nextCursor: '',
  total: 0,
})

const uploadState = computed(() => {
  if (today < weddingDay) return 'before'
  if (today.getTime() === weddingDay.getTime() || today.getTime() === dayAfterWedding.getTime())
    return 'allowed'
  return 'after'
})

onMounted(() => {
  if (uploadState.value !== 'before') fetchImages()
})

async function fetchImages() {
  if (pagination.value.lastCursor !== pagination.value.nextCursor) {
    imagesLoading.value = true
    pagination.value.lastCursor = pagination.value.nextCursor
    const res = await $fetch<CloudinaryResponse>(
      `/api/cloudinary/list?perPage=${pagination.value.perPage}&nextCursor=${pagination.value.nextCursor}`
    )
    res.resources.map((image: any) => images.value.push(image.secure_url))
    if (res.nextCursor) pagination.value.nextCursor = res.nextCursor
    pagination.value.total = res.totalCount
    imagesLoading.value = false
  }
}

function openPreview(url: string) {
  const list = images.value.map((image) => image)
  const index = list.indexOf(url)
  if (index !== -1) currentIndex.value = index
  else currentIndex.value = 0
  dialogImageUrl.value = url
  dialogVisible.value = true
}

function switchToPrevImage() {
  const list = images.value.map((image) => image)
  if (!list.length) return
  currentIndex.value = (currentIndex.value - 1 + list.length) % list.length
  dialogImageUrl.value = list[currentIndex.value]
}

function switchToNextImage() {
  const list = images.value.map((image) => image)
  if (!list.length) return
  currentIndex.value = (currentIndex.value + 1 + list.length) % list.length
  dialogImageUrl.value = list[currentIndex.value]
}
</script>

<template>
  <h2 v-motion-slide-bottom :duration="1500">Galerija</h2>

  <div v-if="uploadState === 'before'" class="info-message">
    <p v-motion-slide-left :duration="1500" :delay="300">
      Ovdje ćete moći pogledati slike iz svatova.
    </p>
    <p v-motion-slide-right :duration="1500" :delay="300">
      Upload fotografija bit će omogućen na dan svatova na
      <NuxtLink to="/upload">
        <ElButton type="primary" size="large">UPLOAD</ElButton>
      </NuxtLink>
      stranici
    </p>
  </div>

  <div v-else v-motion-slide-bottom :duration="1500" :delay="300">
    <ElRow
      :gutter="12"
      class="mb-24"
      v-infinite-scroll="fetchImages"
      :infinite-scroll-disabled="images.length >= pagination.total"
    >
      <ElCol
        v-if="images.length"
        v-for="image in images"
        :key="image"
        :xs="12"
        :sm="6"
        class="image mb-12"
      >
        <ImageWidget :image="image" @click="openPreview" />
      </ElCol>
    </ElRow>

    <ElRow v-if="imagesLoading" justify="center" class="mt-24">
      <ElIcon class="rotating-icon"><Loading /></ElIcon>
      Učitavanje galerije . . .
    </ElRow>

    <ElRow
      v-else-if="!imagesLoading && images.length < pagination.total"
      justify="center"
      class="mt-24"
    >
      <ElButton type="primary" size="large" @click="fetchImages">PRIKAZI VISE</ElButton>
    </ElRow>
  </div>

  <ElDialog
    v-model="dialogVisible"
    fullscreen
    :close-icon="CloseBold"
    @keyup.left="switchToPrevImage"
    @keyup.right="switchToNextImage"
  >
    <ElRow class="preview-img-wrapper">
      <ElIcon
        v-if="images.length > 1"
        class="gallery-arrow-wrapper-left"
        @click="switchToPrevImage"
      >
        <ArrowLeftBold />
      </ElIcon>
      <img :src="dialogImageUrl" class="preview-img" alt="Preview" />
      <ElIcon
        v-if="images.length > 1"
        class="gallery-arrow-wrapper-right"
        @click="switchToNextImage"
      >
        <ArrowRightBold />
      </ElIcon>
    </ElRow>
  </ElDialog>
</template>

<style lang="css" scoped>
.image {
  width: 100%;
  height: 30dvh;
}
.preview-img-wrapper {
  max-width: 100%;
  height: calc(100dvh - 48px);
}
img {
  width: 100%;
  max-height: calc(100dvh - 48px);
  object-fit: contain;
}
.rotating-icon {
  animation: spin 2s linear infinite;
}
@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
