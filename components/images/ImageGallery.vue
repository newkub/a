<template>
  <div>
    <!-- Grid Layout -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <div
        v-for="image in images"
        :key="image.id"
        class="relative group aspect-square bg-neutral-100 rounded-xl overflow-hidden"
      >
        <img
          :src="image.url"
          :alt="image.prompt"
          class="img-round img-hover"
        />
        
        <!-- Overlay -->
        <div class="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
          <div class="w-full">
            <p class="text-white text-sm line-clamp-2 mb-2">{{ image.prompt }}</p>
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-2">
                <button class="p-2 text-white hover:text-primary-200 rounded-lg">
                  <Icon icon="mdi:download" class="text-lg" />
                </button>
                <button class="p-2 text-white hover:text-primary-200 rounded-lg">
                  <Icon icon="mdi:share" class="text-lg" />
                </button>
              </div>
              <button class="p-2 text-white hover:text-primary-200 rounded-lg">
                <Icon icon="mdi:dots-horizontal" class="text-lg" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="flex justify-center py-8">
      <Icon icon="mdi:loading" class="text-2xl text-primary-600 animate-spin" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'

// Sample data
const images = ref([
  {
    id: 1,
    url: 'https://picsum.photos/400',
    prompt: 'A serene landscape with mountains and a lake at sunset'
  },
  {
    id: 2,
    url: 'https://picsum.photos/401',
    prompt: 'Abstract geometric patterns in vibrant colors'
  },
  {
    id: 3,
    url: 'https://picsum.photos/402',
    prompt: 'Futuristic cityscape at night with neon lights'
  }
])

const loading = ref(false)

// Implement infinite scroll logic here
</script>