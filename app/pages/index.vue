<script setup lang="ts">
import IntroductionText from '~/components/shared/IntroductionText.vue'
import CountdownTimer from '~/components/shared/CountdownTimer.vue'
import config from '@/config.json'

const invitationRef = ref<HTMLElement | null>(null)

function scrollToInvitation() {
  invitationRef.value?.scrollIntoView({
    behavior: 'smooth',
    block: 'start',
  })
}

function getDate(dateTime: string) {
  const date = new Date(dateTime)
  const day = String(date.getDate()).padStart(2, '0')
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const year = date.getFullYear()
  return `${day}. ${month}. ${year}.`
}
</script>

<template>
  <main>
    <IntroductionText
      :title="config.title"
      :text="config.introductionText"
      :text2="getDate(config.dateTime)"
      button-text="POZIVNICA"
      @button-click="scrollToInvitation"
    />
    <div class="page-container">
      <CountdownTimer v-if="config.settings.showCountdownTimer" />
      <div v-html="config.invitation" ref="invitationRef" class="invitation" />
      <ElTimeline>
        <ElTimelineItem
          v-for="(activity, index) in config.activities"
          :key="index"
          :timestamp="activity.timestamp"
          placement="top"
          size="large"
        >
          <span class="timeline-text">
            {{ activity.content }}
          </span>
          <br />
          <span class="timeline-text">
            {{ activity.address }}
          </span>
        </ElTimelineItem>
      </ElTimeline>
    </div>
  </main>
</template>

<style lang="css" scoped>
.invitation {
  font-family: 'ItaliannoRegular';
  font-weight: 500;
  letter-spacing: 1.25px;
  font-size: 32px;
}
.timeline-text {
  font-weight: 500;
}
@media screen and (max-width: 767px) {
  .invitation {
    font-size: 28px;
  }
}
</style>
