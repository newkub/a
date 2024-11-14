<template>
  <div v-if="isVisible"
    class="absolute bottom-full left-0 mb-2 w-64 bg-white rounded-lg shadow-lg border border-neutral-200 max-h-64 overflow-y-auto">
    <div class="p-2">
      <input
        v-model="searchQuery"
        type="text"
        class="w-full p-2 bg-neutral-50 rounded-lg text-sm mb-2"
        placeholder="Search users..."
        @keydown.stop
      />
      
      <div v-for="user in filteredUsers" 
        :key="user.id"
        class="flex items-center gap-2 p-2 hover:bg-neutral-50 rounded-lg cursor-pointer"
        @click="$emit('select', user)"
      >
        <div class="w-8 h-8 rounded-full bg-neutral-100 flex items-center justify-center overflow-hidden">
          <img 
            v-if="user.avatar"
            :src="user.avatar"
            :alt="user.name"
            class="img-circle"
          />
          <Icon v-else icon="mdi:account" class="text-lg text-neutral-600" />
        </div>
        <div>
          <div class="font-medium">{{ user.name }}</div>
          <div class="text-xs text-neutral-500">{{ user.role }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'
import type { User } from '~/composables/useMentions'

defineProps<{
  isVisible: boolean
  searchQuery: string
  filteredUsers: User[]
}>()

defineEmits<{
  'select': [user: User]
  'update:searchQuery': [value: string]
}>()
</script>