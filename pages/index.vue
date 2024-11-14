<template>
  <div class="min-h-screen bg-background">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <!-- Hero Section -->
      <div class="text-center mb-16">
        <h1 class="text-4xl font-bold mb-4">Welcome to Wrikka OS</h1>
        <p class="text-xl text-neutral-600 max-w-2xl mx-auto">
          Your intelligent workspace powered by AI. Create, collaborate, and innovate with advanced tools and features.
        </p>
      </div>

      <!-- Features Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        <NuxtLink 
          v-for="feature in features" 
          :key="feature.title" 
          :to="feature.path"
          class="bg-white p-6 rounded-xl border border-neutral-200 hover:shadow-md transition-all hover:border-primary-200 cursor-pointer"
        >
          <div class="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
            <Icon :icon="feature.icon" class="text-2xl text-primary-600" />
          </div>
          <h3 class="text-xl font-semibold mb-2">{{ feature.title }}</h3>
          <p class="text-neutral-600">{{ feature.description }}</p>
        </NuxtLink>
      </div>

      <!-- Quick Actions -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div class="bg-white p-6 rounded-xl border border-neutral-200">
          <h2 class="text-2xl font-semibold mb-4">Quick Start</h2>
          <div class="space-y-3">
            <NuxtLink 
              v-for="action in quickActions" 
              :key="action.path"
              :to="action.path"
              class="flex items-center gap-3 p-3 rounded-lg hover:bg-neutral-50 transition-colors"
            >
              <div class="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                <Icon :icon="action.icon" class="text-xl text-primary-600" />
              </div>
              <div>
                <div class="font-medium">{{ action.title }}</div>
                <div class="text-sm text-neutral-600">{{ action.description }}</div>
              </div>
            </NuxtLink>
          </div>
        </div>

        <div class="bg-white p-6 rounded-xl border border-neutral-200">
          <h2 class="text-2xl font-semibold mb-4">Recent Activity</h2>
          <div class="space-y-3">
            <div v-for="activity in recentActivity" :key="activity.id"
              class="flex items-center gap-3 p-3 rounded-lg hover:bg-neutral-50 transition-colors">
              <div class="w-10 h-10 bg-neutral-100 rounded-lg flex items-center justify-center">
                <Icon :icon="activity.icon" class="text-xl text-neutral-600" />
              </div>
              <div>
                <div class="font-medium">{{ activity.title }}</div>
                <div class="text-sm text-neutral-600">{{ activity.timestamp }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'

const features = [
  {
    title: 'AI Chat',
    icon: 'mdi:chat',
    path: '/chat',
    description: 'Engage with advanced AI models for intelligent conversations and assistance.'
  },
  {
    title: 'Smart Canvas',
    icon: 'mdi:brush',
    path: '/canvas',
    description: 'Create and organize your ideas visually with our interactive canvas.'
  },
  {
    title: 'Bot Integration',
    icon: 'mdi:robot',
    path: '/bots',
    description: 'Access and manage various AI bots for specialized tasks.'
  }
]

const quickActions = [
  {
    path: '/chat',
    title: 'Start a Chat',
    icon: 'mdi:chat',
    description: 'Begin a conversation with AI'
  },
  {
    path: '/canvas',
    title: 'Create Canvas',
    icon: 'mdi:brush',
    description: 'Start a new visual workspace'
  },
  {
    path: '/bots',
    title: 'Explore Bots',
    icon: 'mdi:robot',
    description: 'Discover AI bots and tools'
  }
]

const recentActivity = [
  {
    id: 1,
    title: 'Chat Session: Project Planning',
    icon: 'mdi:chat',
    timestamp: '2 hours ago'
  },
  {
    id: 2,
    title: 'New Canvas Created',
    icon: 'mdi:brush',
    timestamp: '5 hours ago'
  },
  {
    id: 3,
    title: 'Bot Configuration Updated',
    icon: 'mdi:robot',
    timestamp: 'Yesterday'
  }
]
</script>