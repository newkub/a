<template>
  <div class="h-full p-4 overflow-y-auto">
    <!-- Model Selection -->
    <div class="mb-6">
      <h3 class="text-sm font-medium text-neutral-700 mb-2">Model</h3>
      <ModelSelector v-model="selectedModelId" />
    </div>

    <!-- Chat Settings -->
    <div class="space-y-4">
      <!-- Temperature -->
      <div>
        <div class="flex items-center justify-between mb-2">
          <label class="text-sm font-medium text-neutral-700">Temperature</label>
          <span class="text-sm text-neutral-600">{{ temperature }}</span>
        </div>
        <input
          type="range"
          v-model="temperature"
          min="0"
          max="2"
          step="0.1"
          class="w-full"
        />
      </div>

      <!-- Max Length -->
      <div>
        <div class="flex items-center justify-between mb-2">
          <label class="text-sm font-medium text-neutral-700">Max Length</label>
          <span class="text-sm text-neutral-600">{{ maxLength }}</span>
        </div>
        <input
          type="range"
          v-model="maxLength"
          min="100"
          max="4000"
          step="100"
          class="w-full"
        />
      </div>

      <!-- Stream Toggle -->
      <div class="flex items-center justify-between">
        <label class="text-sm font-medium text-neutral-700">Stream Response</label>
        <button
          class="relative inline-flex h-6 w-11 items-center rounded-full"
          :class="streamResponse ? 'bg-primary-500' : 'bg-neutral-200'"
          @click="streamResponse = !streamResponse"
        >
          <span
            class="inline-block h-4 w-4 transform rounded-full bg-white transition"
            :class="streamResponse ? 'translate-x-6' : 'translate-x-1'"
          />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { Icon } from '@iconify/vue'
import ModelSelector from './ModelSelector.vue'

// Settings
const temperature = ref(0.7)
const maxLength = ref(2000)
const streamResponse = ref(true)

// Model selection
const selectedModelId = ref('gpt-4')
</script>

<style scoped>
input[type="range"] {
  -webkit-appearance: none;
  width: 100%;
  height: 4px;
  border-radius: 2px;
  background: #E5E7EB;
  outline: none;
}

input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: #4F46E5;
  cursor: pointer;
  border: 2px solid white;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

input[type="range"]::-moz-range-thumb {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: #4F46E5;
  cursor: pointer;
  border: 2px solid white;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}
</style>