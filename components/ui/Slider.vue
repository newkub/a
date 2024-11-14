<template>
  <div class="space-y-2">
    <div class="flex items-center justify-between">
      <label class="text-sm font-medium text-neutral-700">{{ label }}</label>
      <span class="text-sm text-neutral-600">{{ modelValue }}</span>
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
defineProps<{
  label: string
  modelValue: number
  min: number
  max: number
  step: number
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