<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import InnovaTechLogoIcon from '~/assets/icons/InnovaTechLogoIcon.vue'

const containerRef = ref(null)
const isVisible = ref(false)
let observer = null

onMounted(() => {
  observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        isVisible.value = true
        observer.unobserve(entry.target)
      }
    },
    { threshold: 0.1 }
  )
  if (containerRef.value) observer.observe(containerRef.value)
})

onUnmounted(() => {
  if (containerRef.value && observer) {
    observer.unobserve(containerRef.value)
  }
})
</script>

<template>
  <footer ref="containerRef">
    <template v-if="isVisible">
      <ElRow style="margin-top: 32px" v-motion-slide-top :duration="1000" :delay="1000">
        <ElCol :xs="24" :sm="8">
          <ElRow class="footer-text details-wrapper-left">
            <a href="https://innova-tech.hr/" target="_blank">
              InnovaTech, obrt za informatičke usluge
            </a>
          </ElRow>
          <ElRow class="footer-text details-wrapper-left">vl. Toni Kolarić</ElRow>
          <ElRow class="footer-text details-wrapper-left">Josipa bana Jelačića 98</ElRow>
          <ElRow class="footer-text details-wrapper-left">Martin, Hrvatska</ElRow>
        </ElCol>
        <ElCol :xs="24" :sm="8" align="center">
          <ElIcon class="logo-wrapper">
            <InnovaTechLogoIcon class="logo" />
          </ElIcon>
        </ElCol>
        <ElCol :xs="24" :sm="8">
          <ElRow class="footer-text details-wrapper-right">
            <a href="tel:+385913067273">+385 91 3067 273</a>
          </ElRow>
          <ElRow class="footer-text details-wrapper-right">
            <a href="mailto:info@innova-tech.hr">info@innova-tech.hr</a>
          </ElRow>
        </ElCol>
      </ElRow>

      <ElRow justify="center" align="middle" v-motion-slide-top :duration="1000" :delay="1200">
        <ElCol :xs="24" :sm="8" align="center">
          <NuxtLink to="/privacy-policy" class="footer-text">Politika privatnosti</NuxtLink>
        </ElCol>
        <ElCol :xs="24" :sm="8" align="center">
          <NuxtLink to="/terms-of-use" class="footer-text">Uvjeti korištenja</NuxtLink>
        </ElCol>
        <ElCol :xs="24" :sm="8" align="center">
          <NuxtLink to="/cookie-policy" class="footer-text">Pravila kolačića</NuxtLink>
        </ElCol>
      </ElRow>

      <ElRow justify="center" class="ending-line" v-motion-slide-top :duration="1000" :delay="1500">
        <p class="footer-text">
          Copyright © 2025 InnovaTech, obrt za informatičke usluge.
          <a href="https://innova-tech.hr/" target="_blank" style="font-weight: 900">
            Web stranicu izradio InnovaTech
          </a>
        </p>
      </ElRow>
    </template>
  </footer>
</template>

<style scoped>
footer {
  max-width: 1920px;
  padding: 32px 0;
  background-color: rgba(0, 0, 0, 0.5);
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  font-weight: 500;
}
a {
  color: var(--el-color-primary);
}
.footer-text {
  font-size: 16px;
  letter-spacing: 0.3px;
  color: var(--el-color-primary);
}
.details-wrapper-left {
  justify-content: start;
  margin-left: 20%;
  margin-top: 10px;
}
.details-wrapper-right {
  justify-content: end;
  margin-right: 20%;
  margin-top: 10px;
}
.logo-wrapper {
  width: 140px;
  height: auto;
  padding: 20px;
  color: var(--el-color-primary);
}
.logo {
  width: 100%;
  height: auto;
}
.ending-line {
  margin-top: 16px;
  text-align: center;
}

@media (max-width: 768px) {
  .details-wrapper-left {
    justify-content: center;
    text-align: center;
    margin-left: 0;
  }
  .details-wrapper-right {
    justify-content: center;
    text-align: center;
    margin-right: 0;
  }
}

@media only screen and (max-width: 991px) {
  footer {
    padding: 5% 0;
  }
}
</style>
