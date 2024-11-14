import { ref, computed } from 'vue'
import type { ChatMessage } from '~/types/chat'

export const useChatMessages = () => {
  const messages = ref<ChatMessage[]>([])
  const isLoading = ref(false)

  const hasMessages = computed(() => messages.value.length > 0)

  const addMessage = (message: ChatMessage) => {
    messages.value.push(message)
  }

  const clearMessages = () => {
    messages.value = []
  }

  return {
    messages,
    isLoading,
    hasMessages,
    addMessage,
    clearMessages
  }
}