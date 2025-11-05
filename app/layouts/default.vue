<script setup>
import Header from '@/components/layout/Header.vue'
import Footer from '@/components/layout/Footer.vue'
</script>

<template>
  <div class="background-black" />
  <div class="background-image" />
  <div class="content-wrapper">
    <ClientOnly>
      <Header />
      <NuxtPage />
      <Footer />
    </ClientOnly>
  </div>
</template>

<style scoped>
.background-image,
.background-black {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  margin-top: 0;
  z-index: 0;
}
.background-black {
  background-color: black;
}
.background-image {
  background-image: url('/background.jpg');
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
  opacity: 0.6;
}
.content-wrapper {
  position: relative;
  z-index: 1;
  padding-top: 0;
}
</style>
