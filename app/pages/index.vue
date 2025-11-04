<script setup lang="ts">
import IntroductionText from '~/components/layout/shared/IntroductionText.vue'
import CountdownTimer from '~/components/layout/shared/CountdownTimer.vue'
import config from '@/config.json'

const invitationRef = ref<HTMLElement | null>(null)

function scrollToInvitation() {
  invitationRef.value?.scrollIntoView({
    behavior: 'smooth',
    block: 'start',
  })
}
</script>

<template>
  <main>
    <IntroductionText
      :title="config.title"
      :text="config.introductionText"
      :text2="config.textDate"
      button-text="POZIVNICA"
      @button-click="scrollToInvitation"
    />
    <div class="page-container">
      <CountdownTimer v-if="config.settings.showCountdownTimer" />
      <div v-html="config.invitation" ref="invitationRef" class="invitation" />
      <ElTimeline style="max-width: 600px">
        <ElTimelineItem
          v-for="(activity, index) in config.activities"
          :key="index"
          :timestamp="activity.timestamp"
          placement="top"
          size="large"
        >
          {{ activity.content }}
          <br />
          {{ activity.address }}
        </ElTimelineItem>
      </ElTimeline>
    </div>
  </main>
</template>

<style lang="css" scoped>
.invitation {
  font-family: 'GreatVibesRegular';
  font-weight: 500;
  letter-spacing: 2px;
}
</style>
