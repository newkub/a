<template>
  <nav class="fixed left-0 top-0 h-screen w-20 bg-surface border-r border-border flex flex-col py-4">
    <!-- Logo Section -->
    <div class="px-3 mb-4">
      <NuxtLink 
        to="/"
        class="w-14 h-14 rounded-xl flex flex-col items-center justify-center gap-1 transition-colors hover:bg-neutral-100"
        :class="{ 'bg-neutral-200': route.path === '/' }"
      >
        <Icon icon="mdi:home" class="text-2xl text-primary-600" />
        <span class="text-xs font-medium text-neutral-700">Home</span>
      </NuxtLink>
    </div>

    <!-- Main Menu -->
    <div class="flex-1 px-3 overflow-y-auto scrollbar-hide">
      <div class="space-y-4">
        <NuxtLink 
          v-for="item in menuItems" 
          :key="item.path"
          :to="item.path"
          class="w-14 h-14 rounded-xl flex flex-col items-center justify-center gap-1 transition-colors hover:bg-neutral-100"
          :class="{ 'bg-neutral-200': route.path === item.path }"
          active-class="bg-neutral-200"
        >
          <Icon :icon="item.icon" class="text-2xl text-neutral-700" />
          <span class="text-xs font-medium text-neutral-700">{{ item.label }}</span>
        </NuxtLink>
      </div>
    </div>
    
    <!-- Bottom Menu with Scroll Indicator -->
    <div class="px-3 relative">
      <!-- Scroll Indicator -->
      <div class="absolute -top-6 left-1/2 -translate-x-1/2 w-1 h-4 flex justify-center">
        <div class="w-0.5 h-full bg-neutral-200 rounded-full opacity-50"></div>
      </div>

      <!-- Bottom Menu Items -->
      <div class="space-y-4">
        <NuxtLink 
          v-for="item in bottomMenuItems" 
          :key="item.path"
          :to="item.path"
          class="w-14 h-14 rounded-xl flex flex-col items-center justify-center gap-1 transition-colors hover:bg-neutral-100"
          :class="{ 'bg-neutral-200': route.path === item.path }"
          active-class="bg-neutral-200"
        >
          <Icon :icon="item.icon" class="text-2xl text-neutral-700" />
          <span class="text-xs font-medium text-neutral-700">{{ item.label }}</span>
        </NuxtLink>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'

const route = useRoute()

const menuItems = [
  { path: '/chat', label: 'Chat', icon: 'mdi:chat' },
  { path: '/images', label: 'Images', icon: 'mdi:image' },
  { path: '/videos', label: 'Videos', icon: 'mdi:video' },
  { path: '/bots', label: 'Bots', icon: 'mdi:robot-industrial' },
  { path: '/canvas', label: 'Canvas', icon: 'mdi:brush' },
  { path: '/bookmark', label: 'Bookmark', icon: 'mdi:bookmark' }
]

const bottomMenuItems = [
  { path: '/profile', label: 'Profile', icon: 'mdi:account' },
  { path: '/settings', label: 'Settings', icon: 'mdi:cog' }
]
</script>

<style scoped>
.scrollbar-hide {
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.scrollbar-hide::-webkit-scrollbar {
  display: none;
}

/* Hover effect for scroll indicator */
.scrollbar-hide:hover + .scroll-indicator {
  opacity: 1;
}
</style>