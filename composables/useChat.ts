import { ref } from 'vue'
import MarkdownIt from 'markdown-it'

const md = new MarkdownIt({
  html: true,
  breaks: true,
  linkify: true
})

export interface Message {
  id: string
  content: string
  isBot: boolean
  timestamp: number
}

export interface ChatSettings {
  model: string
  customName: string
  customInstructions: string
  temperature: number
  topP: number
  frequencyPenalty: number
  presencePenalty: number
  stream: boolean
}

export const useChat = () => {
  const messages = ref<Message[]>([])
  const isFirstLoad = ref(true)

  const settings = ref<ChatSettings>({
    model: 'claude-3-haiku',
    customName: '',
    customInstructions: '',
    temperature: 1.00,
    topP: 1.00,
    frequencyPenalty: 0.00,
    presencePenalty: 0.00,
    stream: true
  })

  const showWelcomeMessage = () => {
    if (isFirstLoad.value) {
      messages.value = [{
        id: Date.now().toString(),
        content: `# Welcome to Wrikka OS Chat! 👋

I'm your AI assistant. I'm here to help you with:

- Writing and analysis
- Research and information
- Programming and technical tasks
- Creative projects

Feel free to ask me anything. How can I assist you today?`,
        isBot: true,
        timestamp: Date.now()
      }]
      isFirstLoad.value = false
    }
  }

  const generateResponse = async (userMessage: string) => {
    // Simulate AI response generation
    const responses = [
      "I understand your question. Let me help you with that.",
      "That's an interesting topic. Here's what I know about it:",
      "I can help you with that. Here's my suggestion:",
      "Based on your request, here's what I recommend:",
      "Let me analyze that for you.",
    ]
    
    const randomResponse = responses[Math.floor(Math.random() * responses.length)]
    const detailedResponse = `${randomResponse}\n\nRegarding "${userMessage}", here are some key points to consider:\n\n` +
      "1. First, let's break this down systematically\n" +
      "2. Consider the main aspects of your question\n" +
      "3. Here's a practical approach to address this\n\n" +
      "Would you like me to elaborate on any of these points?"
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000))
    return detailedResponse
  }

  const sendMessage = async (content: string) => {
    if (!content.trim()) return

    // Add user message
    messages.value.push({
      id: Date.now().toString(),
      content,
      isBot: false,
      timestamp: Date.now()
    })

    try {
      // Generate AI response
      const response = await generateResponse(content)
      
      // Add AI response
      messages.value.push({
        id: (Date.now() + 1).toString(),
        content: response,
        isBot: true,
        timestamp: Date.now() + 1
      })
    } catch (error) {
      console.error('Failed to generate response:', error)
      messages.value.push({
        id: (Date.now() + 1).toString(),
        content: "I apologize, but I encountered an error processing your request. Please try again.",
        isBot: true,
        timestamp: Date.now() + 1
      })
    }
  }

  return {
    messages,
    settings,
    sendMessage,
    showWelcomeMessage
  }
}