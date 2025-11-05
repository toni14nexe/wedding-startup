<script setup lang="ts">
import Upload from '../upload/Upload.vue'
import { dateTime } from '@/config.json'

const today = new Date()
today.setHours(0, 0, 0, 0)
const weddingDay = new Date(dateTime)
weddingDay.setHours(0, 0, 0, 0)
const dayAfterWedding = new Date(weddingDay)
dayAfterWedding.setDate(weddingDay.getDate() + 1)

const uploadState = computed(() => {
  if (today < weddingDay) return 'before'
  if (today.getTime() === weddingDay.getTime() || today.getTime() === dayAfterWedding.getTime())
    return 'allowed'
  return 'after'
})
</script>

<template>
  <h2 v-motion-slide-bottom :duration="1500">Upload</h2>

  <div v-if="uploadState === 'before'" class="info-message">
    <p v-motion-slide-left :duration="1500" :delay="300">
      Ovdje ćete moći uploadati slike na dan svatova.
    </p>
    <p v-motion-slide-right :duration="1500" :delay="300">
      Upload će biti omogućen na dan svatova i dan poslije. Hvala na razumijevanju! ❤️
    </p>
  </div>

  <div v-else-if="uploadState === 'allowed'">
    <p v-motion-slide-left :duration="1500" :delay="300">Ovdje možete uploadati fotografije 🎉</p>
    <Upload />
  </div>
</template>

<style lang="css" scoped></style>
