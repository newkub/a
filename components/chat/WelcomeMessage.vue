<template>
  <div class="text-center max-w-lg mx-auto">
    <div class="flex items-center gap-2 mb-4 justify-center">
      <div class="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
        <Icon icon="mdi:robot" class="text-2xl text-primary-600" />
      </div>
    </div>
    <h1 class="text-2xl font-bold mb-4">Welcome to Wrikka Chat</h1>
    <p class="text-neutral-600 mb-6">
      I'm your AI assistant, ready to help with writing, analysis, coding, and more.
      To get started, please configure your API key in settings.
    </p>
    <div class="space-y-3">
      <NuxtLink
        to="/settings"
        class="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary-500 text-white hover:bg-primary-600 transition-colors"
      >
        <Icon icon="mdi:key" />
        Configure API Key
      </NuxtLink>
      <button
        class="w-full px-6 py-3 rounded-lg border border-neutral-200 hover:bg-neutral-50 transition-colors"
        @click="$emit('start')"
      >
        Continue in Demo Mode
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'

defineEmits<{
  start: []
}>()
</script>