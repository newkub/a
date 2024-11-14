<template>
  <div class="flex flex-col h-full">
    <ChatHeader 
      :model="settings.model"
      @update:model="updateModel"
    />
    
    <div class="flex-1 overflow-y-auto min-h-0">
      <ChatMessageList 
        :messages="messages"
        :selected-model="settings.model"
      />
    </div>

    <div class="flex-shrink-0 p-4 border-t border-neutral-200">
      <ChatInput
        v-model="inputMessage"
        :loading="isLoading"
        :has-content="!!inputMessage.trim()"
        @send="handleSend"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useChatMessages } from './composables/useChatMessages'
import { useChatSettings } from './composables/useChatSettings'

const { messages, isLoading, addMessage } = useChatMessages()
const { settings, updateSettings } = useChatSettings()

const inputMessage = ref('')

const updateModel = (modelId: string) => {
  updateSettings('model', modelId)
}

const handleSend = async (content: string) => {
  if (!content.trim() || isLoading.value) return
  
  inputMessage.value = ''
  
  addMessage({
    id: Date.now().toString(),
    role: 'user',
    content,
    timestamp: new Date()
  })

  isLoading.value = true
  try {
    // Simulate API response
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    addMessage({
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      content: `I understand you said: "${content}". This is a demo response.`,
      timestamp: new Date()
    })
  } finally {
    isLoading.value = false
  }
}
</script>