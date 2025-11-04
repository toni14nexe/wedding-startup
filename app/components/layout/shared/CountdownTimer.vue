<script setup lang="ts">
import { dateTime } from '@/config.json'

const targetDate = new Date(dateTime)
const showCountdown = ref(true)
const countdownDays = ref()
const countdownHours = ref()
const countdownMin = ref()
const countdownSec = ref()
let interval: number | undefined

onMounted(() => {
  updateCountdown()
  interval = setInterval(updateCountdown, 1000)
})

onUnmounted(() => {
  clearInterval(interval)
})

function updateCountdown() {
  const now = new Date().getTime()
  const distance = targetDate.getTime() - now

  if (distance <= 0) {
    showCountdown.value = false
    return
  }

  countdownDays.value = Math.floor(distance / (1000 * 60 * 60 * 24))
  countdownHours.value = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  countdownMin.value = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
  countdownSec.value = Math.floor((distance % (1000 * 60)) / 1000)
}
</script>

<template>
  <div class="countdown-container" v-if="showCountdown">
    <div class="countdown-wrapper">
      {{ countdownDays }}
      <br />
      <span class="time-zone">DAN</span>
    </div>
    <div class="countdown-divider" />
    <div class="countdown-wrapper">
      {{ countdownHours }}
      <br />
      <span class="time-zone">SAT</span>
    </div>
    <div class="countdown-divider" />
    <div class="countdown-wrapper">
      {{ countdownMin }}
      <br />
      <span class="time-zone">MIN</span>
    </div>
    <div class="countdown-divider" />
    <div class="countdown-wrapper">
      {{ countdownSec }}
      <br />
      <span class="time-zone">SEK</span>
    </div>
  </div>
</template>

<style scoped>
.countdown-container {
  display: flex;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  border: 2px solid white;
  border-radius: 8px;
  opacity: 0.8;
}
.countdown-wrapper {
  padding: 12px 0;
  width: 25%;
  text-align: center;
  color: white;
  font-size: xxx-large;
}
.time-zone {
  font-size: x-large;
  letter-spacing: 2px;
}
.countdown-divider {
  height: auto;
}
</style>
