<script setup lang="ts">
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
  <main>
    <div class="page-container">
      <h2 v-motion-slide-bottom :duration="1500">Galerija</h2>

      <div v-if="uploadState === 'before'" class="info-message">
        <p v-motion-slide-left :duration="1500" :delay="300">
          Ovdje ćete moći uploadati slike na dan svatova.
        </p>
        <p v-motion-slide-right :duration="1500" :delay="300">
          Upload fotografija bit će omogućen na dan svatova i dan poslije. Hvala na razumijevanju!
          ❤️
        </p>
      </div>

      <div v-else-if="uploadState === 'allowed'">
        <p v-motion-slide-left :duration="1500" :delay="300">
          Ovdje možete uploadati fotografije 🎉
        </p>
        <ElUpload action="/api/upload" multiple v-motion-slide-right :duration="1500" :delay="300">
          <ElButton size="large" type="primary">DODAJ FOTOGRAFIJE</ElButton>
        </ElUpload>
      </div>
    </div>
  </main>
</template>

<style lang="css" scoped>
.page-container {
  min-height: 60dvh;
}
</style>
