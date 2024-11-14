<template>
  <div class="flex h-[calc(100vh-2rem)]">
    <!-- Main Chat Area -->
    <div class="flex-1 flex flex-col">
      <!-- Chat Messages -->
      <div class="bg-white rounded-xl shadow-sm overflow-hidden mb-4 flex-1">
        <div class="flex-1 overflow-y-auto p-6" ref="chatContainer">
          <div v-if="messages.length === 0" class="h-full flex items-center justify-center">
            <WelcomeMessage @start="startChat" />
          </div>
          <template v-else>
            <div v-for="msg in messages" :key="msg.id" class="mb-6 last:mb-0">
              <ChatMessage :message="msg" />
            </div>
          </template>
        </div>
      </div>

      <!-- Chat Input -->
      <div class="bg-white rounded-xl shadow-sm p-4">
        <div class="relative">
          <input
            v-model="inputMessage"
            type="text"
            class="w-full bg-neutral-50 rounded-xl pl-4 pr-12 py-3 text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-500"
            :class="{ 'opacity-50': isLoading }"
            placeholder="Type your message..."
            @keydown.enter="sendMessage"
            :disabled="isLoading || !hasApiKey"
          />
          <button
            type="button"
            class="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-lg text-neutral-400 hover:text-primary-500 hover:bg-neutral-100 transition-colors disabled:opacity-50"
            :disabled="!canSend"
            @click="sendMessage"
          >
            <Icon 
              :icon="isLoading ? 'mdi:loading' : 'mdi:send'" 
              class="text-xl"
              :class="{ 'animate-spin': isLoading }"
            />
          </button>
        </div>
        
        <!-- API Key Notice -->
        <div v-if="!hasApiKey" class="mt-3 text-sm text-neutral-600 bg-neutral-50 p-3 rounded-lg">
          <div class="flex items-center gap-2">
            <Icon icon="mdi:information" class="text-lg text-neutral-500" />
            <span>API key required. Please add your API key in settings to start chatting.</span>
          </div>
          <NuxtLink 
            to="/settings"
            class="inline-flex items-center gap-1 text-primary-500 hover:text-primary-600 mt-2"
          >
            <Icon icon="mdi:cog" class="text-lg" />
            <span>Go to Settings</span>
          </NuxtLink>
        </div>
      </div>
    </div>

    <!-- Settings Sidebar -->
    <ChatSidebar 
      v-model:settings="settings"
      class="w-72 border-l border-neutral-100 ml-4"
    />
  </div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'
import type { ChatMessage } from '~/types/chat'

const inputMessage = ref('')
const messages = ref<ChatMessage[]>([])
const isLoading = ref(false)
const chatContainer = ref<HTMLElement>()
const hasApiKey = ref(false) // This would be connected to your API key storage

const settings = ref({
  model: 'gpt-4',
  maxTokens: 8192,
  temperature: 0.7,
  topP: 0.95,
  frequencyPenalty: 0,
  presencePenalty: 0,
  stream: true,
  stop: '',
  customInstructions: ''
})

const canSend = computed(() => 
  inputMessage.value.trim().length > 0 && !isLoading.value && hasApiKey.value
)

const startChat = () => {
  if (!hasApiKey.value) return
  
  messages.value.push({
    id: Date.now().toString(),
    role: 'assistant',
    content: 'Hello! How can I help you today?',
    timestamp: new Date()
  })
}

const sendMessage = async () => {
  if (!canSend.value) return
  
  const content = inputMessage.value.trim()
  inputMessage.value = ''

  // Add user message
  messages.value.push({
    id: Date.now().toString(),
    role: 'user',
    content,
    timestamp: new Date()
  })

  // Simulate API call
  isLoading.value = true
  try {
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    if (!hasApiKey.value) {
      messages.value.push({
        id: Date.now().toString(),
        role: 'assistant',
        content: 'Please add your API key in settings to enable AI responses.',
        timestamp: new Date()
      })
      return
    }

    messages.value.push({
      id: Date.now().toString(),
      role: 'assistant',
      content: `I understand you said: "${content}". However, I'm currently in demo mode. Please add your API key to enable full AI responses.`,
      timestamp: new Date()
    })
  } finally {
    isLoading.value = false
  }
}

// Auto-scroll to bottom when new messages arrive
watch(() => messages.value.length, () => {
  nextTick(() => {
    if (chatContainer.value) {
      chatContainer.value.scrollTop = chatContainer.value.scrollHeight
    }
  })
})
</script>