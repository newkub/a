<template>
  <div class="border border-neutral-200 rounded-lg overflow-hidden mb-4 last:mb-0">
    <button
      class="w-full px-4 py-3 flex items-center justify-between bg-white hover:bg-neutral-50"
      @click="isOpen = !isOpen"
    >
      <slot name="title">
        <span class="text-xl font-semibold">{{ title }}</span>
      </slot>
      <Icon
        :icon="isOpen ? 'mdi:chevron-up' : 'mdi:chevron-down'"
        class="text-xl text-neutral-500"
      />
    </button>
    <div
      v-show="isOpen"
      class="p-4 bg-white border-t border-neutral-200"
    >
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'

defineProps<{
  title?: string
}>()

const isOpen = ref(true)
</script>