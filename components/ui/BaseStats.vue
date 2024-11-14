<template>
  <div class="bg-white rounded-xl p-6 shadow-sm">
    <div class="flex justify-between items-center">
      <h3 class="text-gray-600">{{ title }}</h3>
      <span :class="['text-xl text-gray-400', icon]" />
    </div>
    <p class="text-3xl font-semibold mt-2">{{ value }}</p>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string
  value: string | number
  icon: string
}>()
</script>