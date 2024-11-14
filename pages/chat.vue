<template>
  <div class="min-h-screen bg-background">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 h-[calc(100vh-4rem)] flex flex-col">
      <ChatHeader 
        @select-chat="handleChatSelect" 
        v-model:selected-model="selectedModel"
        :selected-chat="selectedChat"
        class="flex-shrink-0"
      />
      <div class="flex flex-col lg:flex-row gap-4 mt-4 flex-1 min-h-0">
        <div class="flex-1 bg-white rounded-xl shadow-sm overflow-hidden flex flex-col min-h-0">
          <ChatContainer 
            :selected-model="selectedModel"
            :messages="currentMessages"
            @update:messages="updateMessages"
          />
        </div>
        <div class="hidden lg:block w-80 bg-white rounded-xl shadow-sm overflow-hidden">
          <ChatSidebar />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'default'
})

interface ChatHistory {
  id: number
  title: string
  model: {
    id: string
    icon: string
  }
  messages: Array<{
    id: string
    role: 'user' | 'assistant'
    content: string
  }>
}

const selectedModel = ref('claude-3-haiku')
const selectedChat = ref<ChatHistory | null>(null)
const currentMessages = ref<ChatHistory['messages']>([])

const handleChatSelect = (chat: ChatHistory) => {
  selectedChat.value = chat
  selectedModel.value = chat.model.id
}

const updateMessages = (messages: ChatHistory['messages']) => {
  currentMessages.value = messages
  if (selectedChat.value) {
    selectedChat.value.messages = messages
  }
}
</script>