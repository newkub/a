<template>
  <div class="bg-white border-b border-neutral-200 p-4">
    <div class="flex items-center gap-4">
      <ModelSelector 
        :model-value="model"
        @update:model-value="$emit('update:model', $event)"
      />
      
      <div class="flex items-center gap-2">
        <button 
          class="p-2 hover:bg-neutral-50 rounded-lg transition-colors text-neutral-600"
          title="New Chat"
          @click="$emit('new')"
        >
          <Icon icon="mdi:plus" class="text-lg" />
        </button>

        <button 
          class="p-2 hover:bg-neutral-50 rounded-lg transition-colors text-neutral-600"
          title="Share Chat"
          @click="$emit('share')"
        >
          <Icon icon="mdi:share" class="text-lg" />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'

defineProps<{
  model: string
}>()

defineEmits<{
  'update:model': [value: string]
  'new': []
  'share': []
}>()
</script>