<template>
  <nav class="flex gap-2 mb-8 overflow-x-auto scrollbar-hide">
    <button
      v-for="tab in tabs"
      :key="tab.id"
      @click="emit('update:modelValue', tab.id)"
      class="px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 whitespace-nowrap"
      :class="[
        modelValue === tab.id 
          ? 'bg-nav-dark text-text-default shadow-sm' 
          : 'text-text-default hover:bg-nav-default'
      ]"
    >
      <div class="flex items-center gap-2.5">
        <Icon :icon="tab.icon" class="text-xl" />
        {{ tab.name }}
      </div>
    </button>
  </nav>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'

interface Tab {
  id: string
  name: string
  icon: string
}

const props = defineProps<{
  modelValue: string
  tabs: Tab[]
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()
</script>
