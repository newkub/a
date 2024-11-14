export interface ChatMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
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

export interface Provider {
  id: string
  name: string
  avatar: string
  models: Model[]
}

export interface Model {
  id: string
  name: string
}