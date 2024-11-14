<template>
  <div v-if="isVisible" 
    class="absolute bottom-full left-0 mb-2 w-64 bg-white rounded-lg shadow-lg border border-neutral-200 max-h-64 overflow-y-auto">
    <div class="p-2">
      <input
        v-model="searchQuery"
        type="text"
        class="w-full p-2 bg-neutral-50 rounded-lg text-sm mb-2"
        placeholder="Search commands..."
        @keydown.stop
      />
      
      <div v-for="command in filteredCommands" 
        :key="command.id"
        class="flex items-center gap-2 p-2 hover:bg-neutral-50 rounded-lg cursor-pointer"
        @click="$emit('select', command)"
      >
        <Icon :icon="command.icon" class="text-lg text-neutral-600" />
        <div>
          <div class="font-medium">{{ command.label }}</div>
          <div class="text-xs text-neutral-500">{{ command.description }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'
import type { SlashCommand } from '~/composables/useSlashCommands'

defineProps<{
  isVisible: boolean
  searchQuery: string
  filteredCommands: SlashCommand[]
}>()

defineEmits<{
  'select': [command: SlashCommand]
  'update:searchQuery': [value: string]
}>()
</script>