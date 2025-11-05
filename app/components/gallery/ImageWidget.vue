<script setup lang="ts">
defineProps(['image'])
const emit = defineEmits(['click'])
</script>

<template>
  <div
    v-if="image"
    class="image cursor-pointer"
    :style="`--image-bg: url(${image})`"
    @click="emit('click', image)"
  >
    <div class="image-opacity-container" />
  </div>
  <ElEmpty v-else class="image" description="Trenutno nedostupno!" />
</template>

<style lang="css" scoped>
.image {
  position: relative;
  border: 1px solid var(--el-border-color);
  height: 100%;
  border-radius: 4px;
  overflow: hidden;
  box-shadow: var(--el-box-shadow-light);
}
.image::before {
  content: '';
  position: absolute;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
  background-image: var(--image-bg);
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  transition: transform 0.4s ease;
  z-index: 0;
  will-change: transform;
}
.image:hover::before {
  transform: scale(1.03);
}
.image-opacity-container {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background-color: black;
  opacity: 0.1;
  transition: opacity 0.3s ease-in-out;
  z-index: 1;
}
.image:hover .image-opacity-container {
  opacity: 0;
  cursor: pointer;
}
</style>
