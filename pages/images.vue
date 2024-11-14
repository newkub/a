<template>
  <div class="min-h-screen bg-background">
    

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Product Navigation -->
      <ImageNavigation
        v-model="activeTab"
        :tabs="tabs"
      />

      <!-- Image Creation -->
      <ImageCreation v-if="activeTab === 'creation'" />

      <!-- AI Image Generation -->
      <ImageGeneration v-if="activeTab === 'generation'" />

      <!-- Image Apps -->
      <div v-if="activeTab === 'apps'" class="space-y-6">
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            v-for="app in imageApps"
            :key="app.id"
            class="bg-white rounded-xl border border-neutral-200 p-6 hover:shadow-md transition-shadow cursor-pointer"
          >
            <div class="flex items-center gap-4 mb-4">
              <div class="w-12 h-12 rounded-xl bg-primary-100 flex items-center justify-center">
                <Icon :icon="app.icon" class="text-2xl text-primary-600" />
              </div>
              <div>
                <h3 class="font-semibold">{{ app.name }}</h3>
                <p class="text-sm text-neutral-600">{{ app.provider }}</p>
              </div>
            </div>
            <p class="text-sm text-neutral-600 mb-4">{{ app.description }}</p>
            <div class="flex items-center justify-between text-sm">
              <span class="text-neutral-500">{{ app.category }}</span>
              <div class="flex items-center gap-2">
                <Icon icon="mdi:star" class="text-yellow-400" />
                <span class="text-neutral-700">{{ app.rating }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Image Editor -->
      <ImageEditor v-if="activeTab === 'editor'" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Icon } from '@iconify/vue'
import ImageCreation from '~/components/images/ImageCreation.vue'
import ImageGeneration from '~/components/images/ImageGeneration.vue'
import ImageEditor from '~/components/images/ImageEditor.vue'
import ImageNavigation from '~/components/images/ImageNavigation.vue'

const activeTab = ref('creation')

const tabs = [
  { id: 'creation', name: 'Image Creation', icon: 'mdi:image-plus' },
  { id: 'generation', name: 'AI Generation', icon: 'mdi:robot' },
  { id: 'apps', name: 'Image Apps', icon: 'mdi:apps' },
  { id: 'editor', name: 'Image Editor', icon: 'mdi:image-edit' }
]

const aiModels = [
  {
    id: 1,
    name: 'Stable Diffusion',
    description: 'High-quality image generation',
    avatar: 'https://picsum.photos/100/100?1'
  },
  {
    id: 2,
    name: 'DALL-E 2',
    description: 'Creative and artistic generation',
    avatar: 'https://picsum.photos/100/100?2'
  },
  {
    id: 3,
    name: 'Midjourney',
    description: 'Professional quality artwork',
    avatar: 'https://picsum.photos/100/100?3'
  }
]

const imageApps = [
  {
    id: 1,
    name: 'Style Transfer',
    provider: 'AI Labs',
    description: 'Transform your photos into various artistic styles',
    icon: 'mdi:palette',
    category: 'Artistic',
    rating: 4.8
  },
  {
    id: 2,
    name: 'Background Remover',
    provider: 'Clean AI',
    description: 'Automatically remove image backgrounds',
    icon: 'mdi:image-filter-center-focus',
    category: 'Utility',
    rating: 4.9
  },
  {
    id: 3,
    name: 'Image Upscaler',
    provider: 'Super Resolution',
    description: 'Enhance image quality and resolution',
    icon: 'mdi:image-size-select-large',
    category: 'Enhancement',
    rating: 4.7
  },
  {
    id: 4,
    name: 'Photo Restoration',
    provider: 'Restore AI',
    description: 'Restore and colorize old photos',
    icon: 'mdi:image-refresh',
    category: 'Restoration',
    rating: 4.6
  },
  {
    id: 5,
    name: 'Face Retouching',
    provider: 'Beauty AI',
    description: 'Professional portrait enhancement',
    icon: 'mdi:face-recognition',
    category: 'Portrait',
    rating: 4.5
  },
  {
    id: 6,
    name: 'Object Detection',
    provider: 'Vision AI',
    description: 'Detect and analyze objects in images',
    icon: 'mdi:target',
    category: 'Analysis',
    rating: 4.7
  }
]

const editorTools = [
  { id: 'brush', name: 'Brush', icon: 'mdi:brush' },
  { id: 'eraser', name: 'Eraser', icon: 'mdi:eraser' },
  { id: 'text', name: 'Text', icon: 'mdi:text' },
  { id: 'shape', name: 'Shape', icon: 'mdi:shape' },
  { id: 'crop', name: 'Crop', icon: 'mdi:crop' },
  { id: 'filter', name: 'Filter', icon: 'mdi:filter' }
]
</script>

<style scoped>
.scrollbar-hide {
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
</style>