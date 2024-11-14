<template>
  <nav class="flex items-center justify-between bg-white rounded-lg border border-neutral-200 p-1">
    <button
      v-for="item in navItems"
      :key="item.id"
      class="flex-1 flex items-center justify-center gap-1.5 px-3 py-1.5 text-neutral-600 hover:text-primary-600 hover:bg-neutral-50 rounded-md transition-colors text-sm"
      :class="{ 'text-primary-600': item.id === activeItem }"
      @click="$emit('select', item.id)"
    >
      <template v-if="item.id === 'file' && hasImage">
        <div class="relative">
          <Icon icon="mdi:image" class="text-lg" />
          <button 
            class="absolute -top-1 -right-1 w-4 h-4 bg-neutral-200 rounded-full flex items-center justify-center hover:bg-neutral-300"
            @click.stop="$emit('remove-image')"
          >
            <Icon icon="mdi:close" class="text-xs" />
          </button>
        </div>
      </template>
      <template v-else>
        <Icon :icon="item.icon" class="text-lg" />
      </template>
      <span>{{ item.label }}</span>
    </button>
  </nav>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'

defineProps<{
  activeItem: string
  hasImage?: boolean
}>()

defineEmits<{
  select: [id: string]
  'remove-image': []
}>()

const navItems = [
  { id: 'file', label: 'File', icon: 'mdi:file-outline' },
  { id: 'screenshot', label: 'Screenshot', icon: 'mdi:camera' },
  { id: 'enhance', label: 'Enhance', icon: 'mdi:lightbulb' },
  { id: 'translate', label: 'Translate', icon: 'mdi:translate' }
]
</script>