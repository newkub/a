<template>
  <div class="bg-white rounded-lg shadow-sm border border-neutral-200 overflow-hidden hover:shadow-md transition-shadow">
    <div class="aspect-video bg-neutral-100 relative">
      <img 
        v-if="thumbnail"
        :src="thumbnail"
        :alt="title"
        class="w-full h-full object-cover"
      />
      <div v-else class="w-full h-full flex items-center justify-center text-neutral-400">
        <Icon icon="mdi:image-outline" class="text-3xl" />
      </div>
    </div>
    <div class="p-4">
      <h3 class="font-medium text-lg mb-2 line-clamp-2">{{ title }}</h3>
      <p class="text-sm text-neutral-600 line-clamp-2 mb-3">{{ description }}</p>
      <div class="flex items-center gap-2">
        <Badge 
          v-for="tag in tags" 
          :key="tag"
          variant="neutral"
        >
          {{ tag }}
        </Badge>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'

defineProps<{
  title: string
  description: string
  thumbnail?: string
  tags: string[]
}>()
</script>