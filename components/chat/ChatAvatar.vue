<template>
  <div 
    class="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
    :class="role === 'assistant' ? 'bg-primary-100' : 'bg-neutral-100'"
  >
    <img 
      v-if="role === 'assistant'"
      :src="getProviderAvatar"
      class="img-round-sm w-6 h-6"
      alt="Assistant"
    />
    <Icon 
      v-else
      icon="mdi:account" 
      class="text-xl text-neutral-600"
    />
  </div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'

const props = defineProps<{
  role: 'user' | 'assistant'
  model?: string
}>()

const getProviderAvatar = computed(() => {
  if (props.model?.includes('claude')) {
    return 'https://avatars.githubusercontent.com/u/49760167?s=200&v=4'
  }
  return 'https://avatars.githubusercontent.com/u/142387426?s=200&v=4'
})
</script>