<script setup>
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import HamburgerIcon from '@/assets/icons/HamburgerIcon.vue'
import config from '@/config.json'

const route = useRoute()
const isMobileDrawerMenuOpen = ref(false)

const uploadState = computed(() => getUploadState(config.dateTime))

watch(
  () => route.path,
  () => (isMobileDrawerMenuOpen.value = false)
)
</script>

<template>
  <!-- DESKTOP VERSION -->
  <header class="hidden-sm-and-down" v-motion-slide-top :duration="2000">
    <ElRow class="menu" justify="center">
      <ElCol :span="8" class="menu-wrapper" v-motion-slide-left :duration="1500" :delay="1000">
        <span class="deskop-title">{{ config.title }}</span>
      </ElCol>
      <ElCol :span="8" align="center" class="menu-wrapper">
        <RouterLink
          to="/"
          class="big-link"
          :class="{ 'active-big-link': route.path === '/' }"
          v-motion-slide-left
          :duration="1500"
          :delay="1000"
          >NASLOVNICA</RouterLink
        >
        <RouterLink
          to="/gallery"
          class="big-link"
          :class="{ 'active-big-link': route.path === '/gallery' }"
          v-motion-slide-right
          :duration="1500"
          :delay="1500"
          >GALERIJA</RouterLink
        >
        <RouterLink
          v-if="uploadState !== 'after'"
          to="/upload"
          class="big-link"
          :class="{ 'active-big-link': route.path === '/upload' }"
          v-motion-slide-right
          :duration="1500"
          :delay="2000"
          >UPLOAD</RouterLink
        >
      </ElCol>
      <ElCol :span="8" />
    </ElRow>
  </header>

  <!-- MOBILE VERSION -->
  <header class="hidden-md-and-up" v-motion-slide-top :duration="2000">
    <ElRow class="mobile-header" justify="space-between" align="middle">
      <ElCol :span="4" v-motion-slide-top :duration="1500" :delay="1000">
        <ElIcon size="28" class="hamburger-icon" @click="isMobileDrawerMenuOpen = true">
          <HamburgerIcon />
        </ElIcon>
      </ElCol>
      <ElCol align="middle" :span="16" v-motion-slide-top :duration="1500" :delay="1500">
        <RouterLink to="/" class="mobile-title">
          <h2>{{ config.title }}</h2>
        </RouterLink>
      </ElCol>
      <ElCol :span="4" align="end" />
    </ElRow>
  </header>

  <!-- MOBILE DRAWER -->
  <ElDrawer v-model="isMobileDrawerMenuOpen" direction="ltr" size="100%" :show-close="false">
    <template #header>
      <ElRow>
        <h3>{{ config.title }}</h3>
      </ElRow>
    </template>

    <template #default>
      <div class="drawer-container">
        <RouterLink to="/" class="el-button drawer-button pt-16">
          <ElRow class="drawer-button-text-wrapper" align="middle" justify="center">
            NASLOVNICA
          </ElRow>
        </RouterLink>
        <RouterLink to="/gallery" class="el-button drawer-button pt-16">
          <ElRow class="drawer-button-text-wrapper" align="middle" justify="center">
            GALERIJA
          </ElRow>
        </RouterLink>
        <RouterLink
          v-if="uploadState !== 'after'"
          to="/upload"
          class="el-button drawer-button pt-16"
        >
          <ElRow class="drawer-button-text-wrapper" align="middle" justify="center"> UPLOAD </ElRow>
        </RouterLink>
      </div>
    </template>

    <template #footer>
      <ElRow justify="center" align="middle" class="">
        <ElButton class="drawer-button w-100" plain @click="isMobileDrawerMenuOpen = false">
          <ElRow class="drawer-button-text-wrapper" align="middle" justify="center">
            ZATVORI
          </ElRow>
        </ElButton>
      </ElRow>
    </template>
  </ElDrawer>
</template>

<style scoped>
header {
  opacity: 0.95;
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
}

/* DESKTOP VERSION */
.menu {
  padding: 12px 0 24px 0;
  background-color: rgba(0, 0, 0, 0.5);
}
.menu-wrapper {
  margin: auto 0;
}
.deskop-title {
  margin-left: 24px;
  color: var(--el-color-primary);
  text-decoration: underline;
  text-underline-offset: 16px;
}
.big-link {
  position: relative;
  margin-right: 16px;
  font-weight: 600;
  font-size: 16px;
  text-decoration: none;
  color: var(--el-color-primary);
  letter-spacing: 1.2px;
}
.big-link::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: -8px;
  width: 0;
  height: 2px;
  background-color: var(--el-color-primary);
  transition: width 200ms ease-in-out;
}
.big-link:hover::after {
  width: 100%;
}
.active-big-link::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: -8px;
  width: 100%;
  height: 2px;
  background-color: var(--el-color-primary);
}

@media (max-width: 1350px) {
  .menu {
    height: 70px;
  }
  .big-link {
    font-size: 14px;
  }
}

/* MOBILE VERSION */

.mobile-header {
  height: 80px;
  padding-inline: 16px;
  background-color: rgba(0, 0, 0, 0.5);
}
.hamburger-icon {
  margin-top: 13px;
  cursor: pointer;
  color: white;
}
.mobile-title {
  color: var(--el-color-primary);
  text-decoration: none;
  font-size: 16px;
  font-family: Kugile;
}
.drawer-container {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.drawer-button {
  font-family: 'Kugile', 'GreatVibesRegular', Arial, Helvetica, sans-serif;
  border: 1px solid black;
  color: black;
  --el-button-hover-border-color: var(--el-color-primary);
  background-color: var(--el-color-primary);
  height: 45px;
  font-weight: 700;
  text-decoration: none;
  margin: 0 !important;
  border-radius: 8px;
}
.drawer-button:hover {
  color: gray;
  border-color: gray;
}
.drawer-button-text-wrapper {
  width: 100%;
  gap: 12px;
  font-weight: 600;
  letter-spacing: 1px;
}
</style>
