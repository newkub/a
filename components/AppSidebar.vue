<template>
  <nav class="fixed left-0 top-0 h-screen flex bg-background">
    <!-- Main Sidebar -->
    <div class="w-20 border-r border-border flex flex-col py-4">
      <!-- Logo Section -->
      <div class="px-3 mb-4">
        <NuxtLink 
          to="/"
          class="w-14 h-14 rounded-xl flex flex-col items-center justify-center gap-1 transition-colors hover:bg-nav"
          :class="{ 'bg-nav-dark': route.path === '/' }"
        >
          <Icon icon="mdi:home" class="text-2xl text-text" />
          <span class="text-xs font-medium text-text">Home</span>
        </NuxtLink>
      </div>

      <!-- Main Menu -->
      <div class="flex-1 px-3 overflow-y-auto scrollbar-hide">
        <div class="space-y-4">
          <NuxtLink 
            v-for="item in menuItems" 
            :key="item.path"
            :to="item.path"
            class="w-14 h-14 rounded-xl flex flex-col items-center justify-center gap-1 transition-colors hover:bg-nav"
            :class="{ 'bg-nav-dark': route.path === item.path }"
            active-class="bg-nav-dark"
          >
            <Icon :icon="item.icon" class="text-2xl text-text" />
            <span class="text-xs font-medium text-text">{{ item.label }}</span>
          </NuxtLink>
        </div>
      </div>
      
      <!-- Bottom Menu with Scroll Indicator -->
      <div class="px-3 relative">
        <!-- Scroll Indicator -->
        <div class="absolute -top-6 left-1/2 -translate-x-1/2 w-1 h-4 flex justify-center">
          <div class="w-0.5 h-full bg-nav-dark rounded-full opacity-50"></div>
        </div>

        <!-- Bottom Menu Items -->
        <div class="space-y-4">
          <NuxtLink 
            v-for="item in bottomMenuItems" 
            :key="item.path"
            :to="item.path"
            class="w-14 h-14 rounded-xl flex flex-col items-center justify-center gap-1 transition-colors hover:bg-nav"
            :class="{ 'bg-nav-dark': route.path === item.path }"
            active-class="bg-nav-dark"
          >
            <Icon :icon="item.icon" class="text-2xl text-text" />
            <span class="text-xs font-medium text-text">{{ item.label }}</span>
          </NuxtLink>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { NuxtLink } from '#components'

const route = useRoute()

const menuItems = [
  { path: '/chat', label: 'Chat', icon: 'mdi:chat' },
  { path: '/images', label: 'Images', icon: 'mdi:image' },
  { path: '/knowledge', label: 'Knowledge', icon: 'mdi:brain' },
  { path: '/bookmark', label: 'Bookmark', icon: 'mdi:bookmark' }
]

const bottomMenuItems = [
  { path: '/models', label: 'Models', icon: 'mdi:cube' },
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