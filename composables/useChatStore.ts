import { ref } from 'vue'
import type { ChatMessage } from '~/types/chat'

export const useChatStore = () => {
  const messages = ref<ChatMessage[]>([])
  const isLoading = ref(false)
  const hasApiKey = ref(false)

  const addMessage = (content: string, isBot: boolean) => {
    messages.value.push({
      id: Date.now().toString(),
      content,
      role: isBot ? 'assistant' : 'user',
      timestamp: new Date()
    })
  }

  const generateResponse = async (userMessage: string): Promise<string> => {
    const responses = [
      "I understand your question. Let me help you with that.",
      "That's an interesting topic. Here's what I know about it:",
      "I can help you with that. Here's my suggestion:",
      "Based on your request, here's what I recommend:",
      "Let me analyze that for you."
    ]
    
    const randomResponse = responses[Math.floor(Math.random() * responses.length)]
    return `${randomResponse}\n\nRegarding "${userMessage}", here are some key points:\n\n` +
      "1. First, let's break this down systematically\n" +
      "2. Consider the main aspects of your question\n" +
      "3. Here's a practical approach to address this\n\n" +
      "Would you like me to elaborate on any of these points?"
  }

  const sendMessage = async (content: string) => {
    if (!content.trim()) return

    addMessage(content, false)
    isLoading.value = true

    try {
      const response = await generateResponse(content)
      addMessage(response, true)
    } catch (error) {
      console.error('Failed to generate response:', error)
      addMessage(
        "I apologize, but I encountered an error processing your request. Please try again.",
        true
      )
    } finally {
      isLoading.value = false
    }
  }

  const clearMessages = () => {
    messages.value = []
  }

  const addWelcomeMessage = () => {
    addMessage("👋 Hello! I'm your AI assistant. I'm here to help you with any questions or tasks you have. Feel free to ask me anything!", true)
  }

  return {
    messages,
    isLoading,
    hasApiKey,
    sendMessage,
    clearMessages,
    addWelcomeMessage
  }
}