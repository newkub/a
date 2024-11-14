import { ref } from 'vue'
import type { ChatSettings } from '~/types/chat'

export const useChatSettings = () => {
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

  const updateSettings = <K extends keyof ChatSettings>(key: K, value: ChatSettings[K]) => {
    settings.value[key] = value
  }

  return {
    settings,
    updateSettings
  }
}