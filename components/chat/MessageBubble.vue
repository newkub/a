<template>
  <div class="mb-6 last:mb-0">
    <div class="flex gap-4">
      <div 
        class="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
        :class="message.role === 'assistant' ? 'bg-primary-100 text-primary-600' : 'bg-neutral-100 text-neutral-600'"
      >
        <Icon :icon="message.role === 'assistant' ? 'mdi:robot' : 'mdi:account'" class="text-xl" />
      </div>
      <div class="flex-1 min-w-0">
        <div class="font-medium text-sm mb-1">
          {{ message.role === 'assistant' ? 'Assistant' : 'You' }}
        </div>
        <div 
          :class="[
            'prose prose-sm max-w-none',
            message.role === 'assistant' ? 'prose-primary' : 'prose-neutral'
          ]"
        >
          {{ message.content }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'
import type { ChatMessage } from '~/types/chat'

defineProps<{
  message: ChatMessage
}>()
</script>