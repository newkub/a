<template>
  <button
    class="inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50"
    :class="[
      variant === 'primary' ? 'bg-primary-500 text-white hover:bg-primary-600 focus:ring-primary-500' :
      variant === 'secondary' ? 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200 focus:ring-neutral-500' :
      variant === 'outline' ? 'border-2 border-primary-500 text-primary-500 hover:bg-primary-50 focus:ring-primary-500' :
      'text-neutral-600 hover:bg-neutral-100 focus:ring-neutral-500'
    ]"
    v-bind="$attrs"
  >
    <Icon v-if="icon" :icon="icon" class="mr-2" />
    <slot />
  </button>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'

defineProps<{
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  icon?: string
}>()
</script>