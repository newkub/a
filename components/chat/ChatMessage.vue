<template>
  <div class="flex items-start space-x-3">
    <div class="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
      <span :class="[isBot ? 'i-mdi-robot' : 'i-mdi-account', 'text-blue-600']" />
    </div>
    <div class="flex-1">
      <div class="bg-white rounded-lg p-4 shadow-sm">
        <p class="text-gray-800">{{ content }}</p>
      </div>
      <span class="text-xs text-gray-500 mt-1 block">{{ time }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  content: string
  time: string
  isBot?: boolean
}>()
</script>