<template>
  <div class="space-y-2">
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-2">
        <label class="text-sm font-medium text-neutral-700">{{ label }}</label>
        <button v-if="showInfo" class="text-neutral-400 hover:text-neutral-600">
          <Icon icon="mdi:information-outline" class="text-lg" />
        </button>
      </div>
      <div class="flex items-center gap-2">
        <span class="text-sm text-neutral-600">{{ modelValue }}</span>
        <input
          v-if="showInput"
          type="number"
          :value="modelValue"
          @input="$emit('update:modelValue', Number(($event.target as HTMLInputElement).value))"
          class="w-16 px-2 py-1 text-sm border rounded bg-neutral-50"
          :min="min"
          :max="max"
          :step="step"
        />
      </div>
    </div>
    <div class="relative">
      <input
        type="range"
        :value="modelValue"
        :min="min"
        :max="max"
        :step="step"
        class="w-full h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer"
        @input="$emit('update:modelValue', Number(($event.target as HTMLInputElement).value))"
      />
      <div
        class="absolute top-0 left-0 h-2 bg-primary-500 rounded-lg"
        :style="{ width: `${((modelValue - min) / (max - min)) * 100}%` }"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'

defineProps<{
  label: string
  modelValue: number
  min: number
  max: number
  step: number
  showInfo?: boolean
  showInput?: boolean
}>()

defineEmits<{
  'update:modelValue': [value: number]
}>()
</script>

<style scoped>
input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 16px;
  height: 16px;
  background: #fff;
  border: 2px solid #4F46E5;
  border-radius: 50%;
  cursor: pointer;
}

input[type="range"]::-moz-range-thumb {
  width: 16px;
  height: 16px;
  background: #fff;
  border: 2px solid #4F46E5;
  border-radius: 50%;
  cursor: pointer;
}
</style>