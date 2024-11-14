<template>
  <div class="prose prose-sm max-w-none" :class="variant === 'primary' ? 'prose-primary' : 'prose-neutral'">
    <slot />
  </div>
</template>

<script setup lang="ts">
defineProps<{
  variant?: 'primary' | 'neutral'
}>()
</script>

<style scoped>
.prose {
  line-height: 1.6;
}

.prose :deep(p) {
  margin-top: 0.5em;
  margin-bottom: 0.5em;
}

.prose :deep(p:first-child) {
  margin-top: 0;
}

.prose :deep(p:last-child) {
  margin-bottom: 0;
}
</style>