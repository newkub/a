<template>
  <nav class="w-64 bg-white border-r border-neutral-light h-[calc(100vh-2rem)] overflow-y-auto sticky top-0">
    <div class="p-4">
      <!-- General Settings -->
      <div class="mb-6">
        <h3 class="text-neutral-base text-sm font-medium mb-2">General</h3>
        <div class="space-y-1">
          <button
            v-for="item in generalSettings"
            :key="item.id"
            @click="$emit('select', item.id)"
            class="w-full text-left px-3 py-2 rounded-lg text-sm transition-colors flex items-center gap-2"
            :class="selectedSection === item.id ? 'bg-neutral-light text-neutral-base' : 'text-neutral-base hover:bg-neutral-light hover:text-neutral-base'"
          >
            <Icon :icon="item.icon" class="text-lg" />
            {{ item.label }}
          </button>
        </div>
      </div>

      <!-- AI Settings -->
      <div class="mb-6">
        <h3 class="text-neutral-base text-sm font-medium mb-2">AI</h3>
        <div class="space-y-1">
          <button
            v-for="item in aiSettings"
            :key="item.id"
            @click="$emit('select', item.id)"
            class="w-full text-left px-3 py-2 rounded-lg text-sm transition-colors flex items-center gap-2"
            :class="selectedSection === item.id ? 'bg-neutral-light text-neutral-base' : 'text-neutral-base hover:bg-neutral-light hover:text-neutral-base'"
          >
            <Icon :icon="item.icon" class="text-lg" />
            {{ item.label }}
          </button>
        </div>
      </div>

      <!-- Account Settings -->
      <div>
        <h3 class="text-neutral-base text-sm font-medium mb-2">Account</h3>
        <div class="space-y-1">
          <button
            v-for="item in accountSettings"
            :key="item.id"
            @click="$emit('select', item.id)"
            class="w-full text-left px-3 py-2 rounded-lg text-sm transition-colors flex items-center gap-2"
            :class="selectedSection === item.id ? 'bg-neutral-light text-neutral-base' : 'text-neutral-base hover:bg-neutral-light hover:text-neutral-base'"
          >
            <Icon :icon="item.icon" class="text-lg" />
            {{ item.label }}
          </button>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'

defineProps<{
  selectedSection: string
}>()

defineEmits<{
  select: [section: string]
}>()

const generalSettings = [
  { id: 'appearance', label: 'Appearance', icon: 'mdi:palette' },
  { id: 'keyboard-shortcuts', label: 'Keyboard Shortcuts', icon: 'mdi:keyboard' },
  { id: 'voice-input', label: 'Voice Input', icon: 'mdi:microphone' },
  { id: 'notifications', label: 'Notifications', icon: 'mdi:bell' }
]

const aiSettings = [
  { id: 'models', label: 'Models', icon: 'mdi:robot' },
  { id: 'extensions', label: 'Extensions', icon: 'mdi:puzzle' },
  { id: 'api-keys', label: 'API Keys', icon: 'mdi:key' }
]

const accountSettings = [
  { id: 'profile', label: 'Profile', icon: 'mdi:account' },
  { id: 'billing', label: 'Billing', icon: 'mdi:credit-card' }
]
</script>

<style scoped>
.overflow-y-auto {
  scrollbar-width: thin;
  scrollbar-color: #E5E7EB #F9FAFB;
}

.overflow-y-auto::-webkit-scrollbar {
  width: 6px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  background: #F9FAFB;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background-color: #E5E7EB;
  border-radius: 3px;
}
</style>