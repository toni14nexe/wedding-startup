<script setup lang="ts">
import { ref } from 'vue'
import { ArrowLeftBold, ArrowRightBold, CloseBold, Plus } from '@element-plus/icons-vue'
import type { UploadProps, UploadUserFile } from 'element-plus'

const viewport = useViewport()
const fileList = ref<UploadUserFile[]>([])
const dialogImageUrl = ref<any>('')
const dialogVisible = ref(false)
const uploading = ref(false)
const currentIndex = ref()
const cloudName = useRuntimeConfig().public.cloudinaryCloudName
const uploadPreset = useRuntimeConfig().public.cloudinaryUploadPreset
const folder = useRuntimeConfig().public.cloudinaryFolder

function openPreview(url: string) {
  const list = fileList.value.map((f) => f.url || URL.createObjectURL(f.raw!))
  const index = list.indexOf(url)
  if (index !== -1) currentIndex.value = index
  else currentIndex.value = 0
  dialogImageUrl.value = url
  dialogVisible.value = true
}

const handlePictureCardPreview: UploadProps['onPreview'] = (uploadFile) => {
  let url = uploadFile.url
  if (!url && uploadFile.raw) {
    url = URL.createObjectURL(uploadFile.raw)
  }
  openPreview(url!)
}

function switchToPrevImage() {
  const list = fileList.value.map((f) => f.url || URL.createObjectURL(f.raw!))
  if (!list.length) return
  currentIndex.value = (currentIndex.value - 1 + list.length) % list.length
  dialogImageUrl.value = list[currentIndex.value]
}

function switchToNextImage() {
  const list = fileList.value.map((f) => f.url || URL.createObjectURL(f.raw!))
  if (!list.length) return
  currentIndex.value = (currentIndex.value + 1 + list.length) % list.length
  dialogImageUrl.value = list[currentIndex.value]
}

const beforeUpload: UploadProps['beforeUpload'] = (file) => {
  const isImage =
    file.type === 'image/jpeg' ||
    file.type === 'image/jpg' ||
    file.type === 'image/png' ||
    file.type === 'image/webp' ||
    file.type === 'image/gif'

  if (!isImage) {
    ElMessage.error('Možete uploadati samo slike (jpg, jpeg, png, webp, gif).')
    return false
  }

  const isLt4mb = file.size / 1024 / 1024 <= 4
  if (!isLt4mb) {
    ElMessage.error('Slika ne smije biti veća od 4 MB.')
    return false
  }

  return true
}

async function uploadImage() {
  if (!fileList.value.length) return

  uploading.value = true

  for (const fileObj of fileList.value) {
    const file = fileObj.raw
    if (!file) continue

    const formData = new FormData()
    formData.append('file', file)
    formData.append('upload_preset', uploadPreset)
    formData.append('folder', folder)

    const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
      method: 'POST',
      body: formData,
    })
  }

  fileList.value = []
  uploading.value = false
  ElMessage({
    message: 'Slike su uspješno uploadane 🎉',
    type: 'success',
  })
}
</script>

<template>
  <ElRow
    v-motion-slide-right
    :duration="1500"
    :delay="600"
    :justify="viewport.isLessThan('tablet') ? 'center' : 'start'"
  >
    <ElUpload
      v-model:file-list="fileList"
      list-type="picture-card"
      :before-upload="beforeUpload"
      :on-preview="handlePictureCardPreview"
      accept=".jpg,.jpeg,.png,.webp,.gif"
      multiple
    >
      <ElIcon><Plus /></ElIcon>
    </ElUpload>
  </ElRow>

  <ElRow v-motion-slide-left :duration="1500" :delay="900" class="mt-24" justify="center">
    <ElButton
      size="large"
      type="primary"
      :disabled="!fileList.length || uploading"
      :loading="uploading"
      @click="uploadImage"
    >
      Upload
    </ElButton>
  </ElRow>

  <ElDialog
    v-model="dialogVisible"
    fullscreen
    :close-icon="CloseBold"
    @keyup.left="switchToPrevImage"
    @keyup.right="switchToNextImage"
  >
    <ElRow class="preview-img-wrapper">
      <ElIcon
        v-if="fileList.length > 1"
        class="gallery-arrow-wrapper-left"
        @click="switchToPrevImage"
      >
        <ArrowLeftBold />
      </ElIcon>
      <img :src="dialogImageUrl" class="preview-img" alt="Preview" />
      <ElIcon
        v-if="fileList.length > 1"
        class="gallery-arrow-wrapper-right"
        @click="switchToNextImage"
      >
        <ArrowRightBold />
      </ElIcon>
    </ElRow>
  </ElDialog>
</template>

<style lang="css" scoped>
.preview-img-wrapper {
  max-width: 100%;
  height: calc(100dvh - 48px);
}
img {
  width: 100%;
  max-height: calc(100dvh - 48px);
  object-fit: contain;
}
</style>
