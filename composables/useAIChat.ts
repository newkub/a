import { ref } from 'vue'
import type { ChatMessage, ChatSettings } from '~/types/chat'

export const useAIChat = () => {
  const messages = ref<ChatMessage[]>([])
  const isLoading = ref(false)

  const generateAIResponse = async (
    prompt: string, 
    settings: ChatSettings
  ): Promise<string> => {
    // Simulate AI response based on settings
    const temperature = settings.temperature
    const isCreative = temperature > 0.7
    
    // Example responses based on temperature
    let response = ''
    if (isCreative) {
      response = `Let me think creatively about "${prompt}"...

I find this question fascinating! Here are some innovative thoughts:

1. ${prompt.split(' ').reverse().join(' ')}
2. What if we considered it from this angle: ${prompt.toUpperCase()}
3. Here's a unique perspective: ${prompt.toLowerCase()}

Would you like me to elaborate on any of these points?`
    } else {
      response = `Let me analyze "${prompt}" systematically:

1. First, let's break down the key components
2. Based on the available information
3. Here's a structured response

The most logical approach would be to ${prompt.toLowerCase()}. 
Would you like me to provide more specific details?`
    }

    // Simulate network delay based on message length
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000))
    return response
  }

  const sendMessage = async (content: string, settings: ChatSettings) => {
    if (!content.trim()) return

    // Add user message
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content,
      timestamp: new Date()
    }
    messages.value.push(userMessage)

    // Generate AI response
    isLoading.value = true
    try {
      const aiResponse = await generateAIResponse(content, settings)
      
      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: aiResponse,
        timestamp: new Date()
      }
      messages.value.push(assistantMessage)
    } catch (error) {
      console.error('Failed to generate AI response:', error)
      messages.value.push({
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: "I apologize, but I encountered an error processing your request. Please try again.",
        timestamp: new Date()
      })
    } finally {
      isLoading.value = false
    }
  }

  const clearMessages = () => {
    messages.value = []
  }

  return {
    messages,
    isLoading,
    sendMessage,
    clearMessages
  }
}