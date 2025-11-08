<script setup lang="ts">
import Upload from '../upload/Upload.vue'
import { dateTime } from '@/config.json'

const uploadState = computed(() => getUploadState(dateTime))
</script>

<template>
  <h2 v-motion-slide-bottom :duration="1500">Upload</h2>

  <div v-if="uploadState === 'before'" class="info-message">
    <p v-motion-slide-left :duration="1500" :delay="300">
      Ovdje ćete moći uploadati fotografija na dan svatova.
    </p>
    <p v-motion-slide-right :duration="1500" :delay="300">
      Upload će biti omogućen na dan svatova i dan poslije. Hvala na razumijevanju! ❤️
    </p>
  </div>

  <div v-else-if="uploadState === 'allowed'">
    <p v-motion-slide-left :duration="1500" :delay="300">Ovdje možete uploadati fotografije 🎉</p>
    <Upload />
  </div>

  <div v-else-if="uploadState === 'after'">
    <p v-motion-slide-left :duration="1500" :delay="300">Uploadanje više nije dozvoljeno!</p>
  </div>
</template>

<style lang="css" scoped>
@media screen and (max-width: 767px) {
  p {
    font-size: 18px;
  }
}
</style>
