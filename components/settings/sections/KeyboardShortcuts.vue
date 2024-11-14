<template>
  <div class="space-y-6">
    <div class="p-6 bg-neutral-50 rounded-xl border border-neutral-200">
      <h2 class="text-lg font-semibold mb-4">Global Shortcuts</h2>
      <div class="space-y-3">
        <div v-for="shortcut in globalShortcuts" :key="shortcut.action" 
          class="flex items-center justify-between p-3 bg-white rounded-lg">
          <span class="text-neutral-700">{{ shortcut.action }}</span>
          <div class="flex gap-2">
            <kbd v-for="key in shortcut.keys" :key="key"
              class="px-2 py-1 bg-neutral-100 rounded text-sm">
              {{ key }}
            </kbd>
          </div>
        </div>
      </div>
    </div>

    <div class="p-6 bg-neutral-50 rounded-xl border border-neutral-200">
      <h2 class="text-lg font-semibold mb-4">Chat Shortcuts</h2>
      <div class="space-y-3">
        <div v-for="shortcut in chatShortcuts" :key="shortcut.action" 
          class="flex items-center justify-between p-3 bg-white rounded-lg">
          <span class="text-neutral-700">{{ shortcut.action }}</span>
          <div class="flex gap-2">
            <kbd v-for="key in shortcut.keys" :key="key"
              class="px-2 py-1 bg-neutral-100 rounded text-sm">
              {{ key }}
            </kbd>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const globalShortcuts = [
  { action: 'Open Command Palette', keys: ['⌘', 'K'] },
  { action: 'Toggle Sidebar', keys: ['⌘', 'B'] },
  { action: 'Quick Settings', keys: ['⌘', ','] }
]

const chatShortcuts = [
  { action: 'Send Message', keys: ['Enter'] },
  { action: 'New Line', keys: ['Shift', 'Enter'] },
  { action: 'Clear Chat', keys: ['⌘', 'L'] }
]
</script>