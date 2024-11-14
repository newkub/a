<template>
  <div class="bg-white rounded-xl border border-neutral-200 p-6">
    <!-- Script Input -->
    <div class="mb-6">
      <label class="block text-sm font-medium text-neutral-700 mb-2">Script/Prompt</label>
      <textarea
        v-model="script"
        rows="4"
        class="w-full rounded-lg border-neutral-200 resize-none"
        placeholder="Describe the video you want to create..."
      />
    </div>

    <!-- Duration Selector -->
    <div class="mb-6">
      <label class="block text-sm font-medium text-neutral-700 mb-2">Duration</label>
      <BaseSlider
        v-model="duration"
        :min="5"
        :max="60"
        :step="5"
        :showInput="true"
      />
      <p class="text-sm text-neutral-500 mt-1">{{ duration }} seconds</p>
    </div>

    <!-- Resolution Options -->
    <div class="mb-6">
      <label class="block text-sm font-medium text-neutral-700 mb-2">Resolution</label>
      <div class="grid grid-cols-2 gap-2">
        <button
          v-for="res in resolutions"
          :key="res.id"
          class="px-4 py-2 rounded-lg border text-sm"
          :class="selectedResolution === res.id ? 'bg-primary-50 border-primary-200 text-primary-700' : 'border-neutral-200 text-neutral-600 hover:bg-neutral-50'"
          @click="selectedResolution = res.id"
        >
          {{ res.label }}
        </button>
      </div>
    </div>

    <!-- Style Transfer -->
    <div class="mb-6">
      <label class="block text-sm font-medium text-neutral-700 mb-2">Style Transfer</label>
      <div class="grid grid-cols-3 gap-2">
        <button
          v-for="style in styles"
          :key="style.id"
          class="aspect-square rounded-lg border p-2 flex flex-col items-center justify-center"
          :class="selectedStyle === style.id ? 'bg-primary-50 border-primary-200 text-primary-700' : 'border-neutral-200 text-neutral-600 hover:bg-neutral-50'"
          @click="selectedStyle = style.id"
        >
          <Icon :icon="style.icon" class="text-2xl mb-1" />
          <span class="text-xs">{{ style.name }}</span>
        </button>
      </div>
    </div>

    <!-- Format Selector -->
    <div class="mb-6">
      <label class="block text-sm font-medium text-neutral-700 mb-2">Output Format</label>
      <select
        v-model="selectedFormat"
        class="w-full rounded-lg border-neutral-200"
      >
        <option v-for="format in formats" :key="format.id" :value="format.id">
          {{ format.label }}
        </option>
      </select>
    </div>

    <!-- Generate Button -->
    <button class="w-full btn-primary">
      <Icon icon="mdi:video" class="text-lg mr-2" />
      Generate Video
    </button>
  </div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'

const script = ref('')
const duration = ref(15)
const selectedResolution = ref('1080p')
const selectedStyle = ref('cinematic')
const selectedFormat = ref('mp4')

const resolutions = [
  { id: '720p', label: '720p HD' },
  { id: '1080p', label: '1080p Full HD' },
  { id: '4k', label: '4K Ultra HD' }
]

const styles = [
  { id: 'cinematic', name: 'Cinematic', icon: 'mdi:movie' },
  { id: 'anime', name: 'Anime', icon: 'mdi:animation' },
  { id: '3d', name: '3D', icon: 'mdi:cube' }
]

const formats = [
  { id: 'mp4', label: 'MP4 Video' },
  { id: 'gif', label: 'Animated GIF' },
  { id: 'webm', label: 'WebM Video' }
]
</script>