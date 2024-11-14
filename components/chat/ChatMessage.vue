<template>
  <div class="flex gap-4" :class="message.role === 'user' ? 'flex-row-reverse' : ''">
    <div 
      class="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
      :class="message.role === 'assistant' ? 'bg-primary-100' : 'bg-neutral-100'"
    >
      <img 
        v-if="message.role === 'assistant'"
        :src="providerAvatar"
        class="w-6 h-6 rounded"
        alt="Assistant"
      />
      <Icon 
        v-else
        icon="mdi:account" 
        class="text-xl text-neutral-600"
      />
    </div>

    <div class="flex-1 min-w-0">
      <div class="mb-2">
        <span class="font-medium text-sm">
          {{ message.role === 'assistant' ? 'Assistant' : 'You' }}
        </span>
      </div>
      <div 
        class="p-4 rounded-xl"
        :class="message.role === 'assistant' ? 'bg-primary-50 text-primary-900' : 'bg-neutral-100 text-neutral-900'"
      >
        <div class="prose prose-sm max-w-none">
          {{ message.content }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'
import type { ChatMessage } from '~/types/chat'

const props = defineProps<{
  message: ChatMessage
  selectedModel?: string
}>()

const providerAvatar = computed(() => {
  if (props.selectedModel?.includes('claude')) {
    return 'https://avatars.githubusercontent.com/u/49760167?s=200&v=4'
  }
  return 'https://avatars.githubusercontent.com/u/142387426?s=200&v=4'
})
</script>