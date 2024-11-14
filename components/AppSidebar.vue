<template>
  <aside class="fixed left-0 top-0 h-full w-20 bg-white border-r border-gray-200 flex flex-col">
    <!-- Top Navigation Group -->
    <div class="flex-1 overflow-y-auto scrollbar-hide">
      <nav class="py-4 space-y-1">
        <NuxtLink 
          v-for="item in topNavItems" 
          :key="item.path"
          :to="item.path"
          class="block w-full px-2 py-3 text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors"
          :class="{ 'text-blue-600 bg-blue-50': route.path === item.path }"
        >
          <div class="flex flex-col items-center">
            <div :class="['text-2xl', item.icon]" />
            <span class="text-xs mt-1">{{ item.label }}</span>
          </div>
        </NuxtLink>
      </nav>
    </div>

    <!-- Bottom Navigation Group -->
    <div class="border-t border-gray-200">
      <nav class="py-4 space-y-1">
        <NuxtLink 
          v-for="item in bottomNavItems" 
          :key="item.path"
          :to="item.path"
          class="block w-full px-2 py-3 text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors"
          :class="{ 'text-blue-600 bg-blue-50': route.path === item.path }"
        >
          <div class="flex flex-col items-center">
            <div :class="['text-2xl', item.icon]" />
            <span class="text-xs mt-1">{{ item.label }}</span>
          </div>
        </NuxtLink>
      </nav>
    </div>
  </aside>
</template>

<script setup lang="ts">
const route = useRoute()

const topNavItems = [
  { label: 'Home', path: '/', icon: 'i-mdi-home' },
  { label: 'Chat', path: '/chat', icon: 'i-mdi-chat' },
  { label: 'Images', path: '/images', icon: 'i-mdi-image' },
  { label: 'Bots', path: '/bots', icon: 'i-mdi-robot' },
  { label: 'Knowledge', path: '/knowledge', icon: 'i-mdi-brain' },
  { label: 'Bookmark', path: '/bookmarks', icon: 'i-mdi-bookmark' },
]

const bottomNavItems = [
  { label: 'Profile', path: '/profile', icon: 'i-mdi-account' },
  { label: 'Settings', path: '/settings', icon: 'i-mdi-cog' }
]
</script>

<style>
.scrollbar-hide {
  scrollbar-width: none;
  -ms-overflow-style: none;
}
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
</style>