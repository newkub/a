<template>
  <button
    class="w-full flex items-center justify-between p-2 hover:bg-neutral-100 rounded-lg"
    @click="$emit('click')"
  >
    <h3 class="text-lg font-semibold"><slot /></h3>
    <Icon 
      :icon="expanded ? 'mdi:chevron-up' : 'mdi:chevron-down'" 
      class="text-xl"
    />
  </button>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'

defineProps<{
  expanded: boolean
}>()

defineEmits<{
  click: []
}>()
</script>