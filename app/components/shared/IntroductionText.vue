<script setup lang="ts">
defineProps<{
  title: string
  text?: string
  text2?: string
  buttonText?: string
  buttonSrc?: string
}>()
const emit = defineEmits(['buttonClick'])
</script>

<template>
  <ElRow align="middle" class="introduction-text-container">
    <ElRow style="row-gap: 16px">
      <ElCol v-motion-slide-left :duration="1500" :delay="300" :xs="24" :lg="14">
        <h1 style="width: max-content">{{ title }}</h1>
      </ElCol>
      <ElCol :xs="0" :lg="10" />
      <ElCol v-if="text || text2" :xs="24" :lg="14">
        <p v-if="text" v-motion-slide-right :duration="1500" :delay="600">
          {{ text }}
        </p>
        <p v-if="text2" v-motion-slide-left :duration="1500" :delay="900" style="margin-top: 16px">
          {{ text2 }}
        </p>
      </ElCol>
      <ElCol :xs="0" :lg="10" />
      <ElCol
        v-if="buttonText"
        v-motion-slide-bottom
        :xs="24"
        :lg="14"
        :duration="1500"
        :delay="1200"
      >
        <RouterLink v-if="buttonSrc" :to="`${buttonSrc}`">
          <ElButton size="large" type="primary">{{ buttonText }}</ElButton>
        </RouterLink>
        <ElButton v-else size="large" type="primary" @click="emit('buttonClick')">{{
          buttonText
        }}</ElButton>
      </ElCol>
      <ElCol :xs="0" :lg="10" />
    </ElRow>
  </ElRow>
</template>

<style scoped>
.introduction-text-container {
  padding: 120px;
  height: calc(100dvh - 60px);
}
h1,
p {
  margin: 0;
  font-family: 'ItaliannoRegular';
  letter-spacing: 2px;
}
p {
  font-size: xx-large;
}
button {
  font-size: large;
}

@media (max-width: 992px) {
  h1 {
    font-size: xxx-large;
  }
  .introduction-text-container {
    padding: 16px;
  }
}
</style>
