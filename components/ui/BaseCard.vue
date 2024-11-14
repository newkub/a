<template>
  <div 
    class="bg-white rounded-xl shadow-sm overflow-hidden"
    :class="{ 'hover:shadow-md transition-shadow': hover }"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
defineProps<{
  hover?: boolean
}>()
</script>