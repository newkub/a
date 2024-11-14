<template>
  <div 
    class="rounded-lg overflow-hidden flex-shrink-0"
    :class="[
      size === 'sm' ? 'w-8 h-8' : 'w-10 h-10'
    ]"
  >
    <img 
      v-if="src"
      :src="src"
      :alt="alt"
      class="w-full h-full object-cover"
    />
    <div 
      v-else
      class="w-full h-full flex items-center justify-center"
      :class="[
        variant === 'primary' ? 'bg-primary-100 text-primary-600' : 'bg-neutral-100 text-neutral-600'
      ]"
    >
      <Icon :icon="icon" :class="size === 'sm' ? 'text-lg' : 'text-xl'" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'

defineProps<{
  src?: string
  alt?: string
  icon?: string
  size?: 'sm' | 'md'
  variant?: 'primary' | 'neutral'
}>()
</script>