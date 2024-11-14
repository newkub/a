<template>
  <div class="relative">
    <span class="absolute inset-y-0 left-3 flex items-center text-gray-400">
      <div class="i-mdi-magnify text-xl" />
    </span>
    <input
      type="text"
      :placeholder="placeholder"
      class="input-primary pl-10 w-full"
      :value="modelValue"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    >
  </div>
</template>

<script setup lang="ts">
defineProps<{
  modelValue: string
  placeholder?: string
}>()

defineEmits<{
  'update:modelValue': [value: string]
}>()
</script>