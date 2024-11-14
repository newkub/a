<template>
  <span 
    class="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium"
    :class="[
      variant === 'primary' ? 'bg-primary-100 text-primary-800' :
      variant === 'success' ? 'bg-success-100 text-success-800' :
      variant === 'warning' ? 'bg-warning-100 text-warning-800' :
      variant === 'error' ? 'bg-error-100 text-error-800' :
      'bg-neutral-100 text-neutral-800'
    ]"
  >
    <slot />
  </span>
</template>

<script setup lang="ts">
defineProps<{
  variant?: 'primary' | 'success' | 'warning' | 'error' | 'neutral'
}>()
</script>