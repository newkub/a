<template>
  <div class="flex items-center justify-between">
    <span class="text-sm font-medium">{{ label }}</span>
    <button
      class="w-12 h-6 rounded-full relative"
      :class="modelValue ? 'bg-primary-500' : 'bg-neutral-300'"
      @click="$emit('update:modelValue', !modelValue)"
    >
      <span
        class="absolute w-5 h-5 rounded-full bg-white top-0.5 transition-all"
        :class="modelValue ? 'right-0.5' : 'left-0.5'"
      />
    </button>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  label: string
  modelValue: boolean
}>()

defineEmits<{
  'update:modelValue': [value: boolean]
}>()
</script>