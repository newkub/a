<template>
  <div class="space-y-4">
    <div v-for="user in users" :key="user.id" 
      class="bg-white p-4 rounded-lg border border-neutral-200 hover:border-neutral-300 transition-colors">
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-4">
          <div class="w-10 h-10 rounded-lg bg-primary-100 flex items-center justify-center">
            <Icon :icon="user.avatar || 'mdi:account'" class="text-xl text-primary-600" />
          </div>
          <div>
            <h3 class="font-medium">{{ user.name }}</h3>
            <p class="text-sm text-neutral-600">{{ user.email }}</p>
          </div>
        </div>
        <div class="flex items-center gap-3">
          <Badge :variant="user.status === 'active' ? 'success' : 'neutral'">
            {{ user.status }}
          </Badge>
          <div class="flex items-center">
            <button 
              class="p-2 text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 rounded-lg"
              @click="$emit('edit', user)"
            >
              <Icon icon="mdi:pencil" class="text-lg" />
            </button>
            <button 
              class="p-2 text-neutral-600 hover:text-error-600 hover:bg-neutral-100 rounded-lg"
              @click="$emit('delete', user)"
            >
              <Icon icon="mdi:trash" class="text-lg" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'

interface User {
  id: string
  name: string
  email: string
  status: 'active' | 'inactive'
  role: string
  avatar?: string
}

defineProps<{
  users: User[]
}>()

defineEmits<{
  edit: [user: User]
  delete: [user: User]
}>()
</script>