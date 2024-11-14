<template>
  <div class="bg-white border-b border-neutral-200 p-4 rounded-t-xl">
    <div class="flex items-center gap-4">
      <!-- Model Selector Dropdown -->
      <div class="relative flex-1">
        <button
          @click="isModelDropdownOpen = !isModelDropdownOpen"
          class="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-neutral-200 hover:border-neutral-300 transition-colors w-full"
        >
          <div class="flex items-center gap-2 flex-1 min-w-0">
            <img 
              :src="selectedProvider.avatar"
              class="w-5 h-5 rounded flex-shrink-0"
              :alt="selectedProvider.name"
            />
            <span class="font-medium truncate">{{ selectedProvider.name }}</span>
            <span class="text-neutral-500 flex-shrink-0">/</span>
            <span class="truncate">{{ selectedModel.name }}</span>
          </div>
          <Icon 
            :icon="isModelDropdownOpen ? 'mdi:chevron-up' : 'mdi:chevron-down'" 
            class="text-lg text-neutral-500 flex-shrink-0"
          />
        </button>

        <div
          v-if="isModelDropdownOpen"
          class="absolute z-50 w-full mt-1 bg-white border border-neutral-200 rounded-lg shadow-lg"
        >
          <div class="p-2 border-b border-neutral-200">
            <input
              v-model="modelSearch"
              type="text"
              placeholder="Search models..."
              class="w-full p-2 bg-neutral-50 rounded-lg text-sm"
            />
          </div>
          <div class="max-h-64 overflow-y-auto p-2">
            <div v-for="provider in filteredProviders" :key="provider.id" class="mb-2">
              <div class="flex items-center gap-2 p-1">
                <img
                  :src="provider.avatar"
                  class="w-5 h-5 rounded"
                  :alt="provider.name"
                />
                <span class="text-sm font-medium">{{ provider.name }}</span>
              </div>
              <div class="space-y-1 ml-6">
                <button
                  v-for="model in provider.models"
                  :key="model.id"
                  @click="selectModel(provider, model)"
                  class="w-full text-left px-3 py-1.5 rounded-lg hover:bg-neutral-50 transition-colors text-sm flex items-center justify-between"
                  :class="modelValue === model.id ? 'bg-neutral-100' : ''"
                >
                  <span>{{ model.name }}</span>
                  <Icon 
                    v-if="modelValue === model.id"
                    icon="mdi:check"
                    class="text-lg text-primary-500"
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- History Dropdown -->
      <div class="relative">
        <button
          @click="isHistoryDropdownOpen = !isHistoryDropdownOpen"
          class="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-neutral-200 hover:border-neutral-300 transition-colors"
        >
          <Icon icon="mdi:history" class="text-lg" />
          <span class="font-medium">{{ selectedChat?.title || 'History' }}</span>
          <Icon 
            :icon="isHistoryDropdownOpen ? 'mdi:chevron-up' : 'mdi:chevron-down'" 
            class="text-lg text-neutral-500"
          />
        </button>

        <div
          v-if="isHistoryDropdownOpen"
          class="absolute z-50 w-64 mt-1 bg-white border border-neutral-200 rounded-lg shadow-lg"
        >
          <div class="p-2 border-b border-neutral-200">
            <input
              v-model="historySearch"
              type="text"
              placeholder="Search conversations..."
              class="w-full p-2 bg-neutral-50 rounded-lg text-sm"
            />
          </div>
          <div class="max-h-64 overflow-y-auto p-2">
            <div v-for="chat in filteredHistory" :key="chat.id" class="mb-2">
              <button
                class="w-full text-left p-2 rounded-lg hover:bg-neutral-50 transition-colors"
                @click="selectChat(chat)"
                :class="selectedChat?.id === chat.id ? 'bg-neutral-100' : ''"
              >
                <div class="flex items-center gap-2 mb-1">
                  <Icon :icon="chat.model.icon" class="text-lg" />
                  <span class="text-sm font-medium">{{ chat.title }}</span>
                </div>
                <p class="text-xs text-neutral-500 truncate">
                  {{ chat.messages[chat.messages.length - 1]?.content }}
                </p>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Presets Dropdown -->
      <div class="relative">
        <button
          @click="isPresetsDropdownOpen = !isPresetsDropdownOpen"
          class="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-neutral-200 hover:border-neutral-300 transition-colors"
        >
          <Icon icon="mdi:bookmark" class="text-lg" />
          <span class="font-medium">{{ selectedPreset?.name || 'Presets' }}</span>
          <Icon 
            :icon="isPresetsDropdownOpen ? 'mdi:chevron-up' : 'mdi:chevron-down'" 
            class="text-lg text-neutral-500"
          />
        </button>

        <div
          v-if="isPresetsDropdownOpen"
          class="absolute z-50 w-64 mt-1 bg-white border border-neutral-200 rounded-lg shadow-lg"
        >
          <div class="p-2">
            <div v-for="preset in presets" :key="preset.id" class="mb-2">
              <button
                class="w-full text-left p-2 rounded-lg hover:bg-neutral-50 transition-colors"
                @click="selectPreset(preset)"
                :class="selectedPreset?.id === preset.id ? 'bg-neutral-100' : ''"
              >
                <div class="flex items-center gap-2">
                  <Icon :icon="preset.icon" class="text-lg" />
                  <span class="font-medium">{{ preset.name }}</span>
                </div>
                <p class="text-xs text-neutral-500 mt-1">{{ preset.description }}</p>
              </button>
            </div>
          </div>
        </div>
      </div>

      <button 
        class="p-2 hover:bg-neutral-50 rounded-lg transition-colors text-neutral-600"
        title="New Chat"
        @click="createNewChat"
      >
        <Icon icon="mdi:plus" class="text-lg" />
      </button>

      <button 
        class="p-2 hover:bg-neutral-50 rounded-lg transition-colors text-neutral-600"
        title="Copy chat link"
        @click="handleShare"
      >
        <Icon icon="mdi:share" class="text-lg" />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { onClickOutside } from '@vueuse/core'

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

interface Preset {
  id: string
  name: string
  icon: string
  description: string
}

interface Model {
  id: string
  name: string
}

interface Provider {
  id: string
  name: string
  avatar: string
  models: Model[]
}

const props = defineProps<{
  modelValue: string
  selectedChat: ChatHistory | null
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
  'select-chat': [chat: ChatHistory]
}>()

const isModelDropdownOpen = ref(false)
const isHistoryDropdownOpen = ref(false)
const isPresetsDropdownOpen = ref(false)
const modelSearch = ref('')
const historySearch = ref('')
const selectedPreset = ref<Preset | null>(null)

const providers: Provider[] = [
  {
    id: 'anthropic',
    name: 'Anthropic',
    avatar: 'https://avatars.githubusercontent.com/u/49760167?s=200&v=4',
    models: [
      { id: 'claude-3-haiku', name: 'Claude 3 Haiku' },
      { id: 'claude-3-opus', name: 'Claude 3 Opus' },
      { id: 'claude-3-sonnet', name: 'Claude 3 Sonnet' }
    ]
  },
  {
    id: 'openai',
    name: 'OpenAI',
    avatar: 'https://avatars.githubusercontent.com/u/14957082?s=200&v=4',
    models: [
      { id: 'gpt-4', name: 'GPT-4' },
      { id: 'gpt-4-turbo', name: 'GPT-4 Turbo' },
      { id: 'gpt-3.5-turbo', name: 'GPT-3.5 Turbo' }
    ]
  }
]

const selectedProvider = computed(() => {
  const modelId = props.modelValue
  const provider = providers.find(p => p.models.some(m => m.id === modelId))
  return provider || providers[0]
})

const selectedModel = computed(() => {
  const modelId = props.modelValue
  for (const provider of providers) {
    const model = provider.models.find(m => m.id === modelId)
    if (model) return model
  }
  return providers[0].models[0]
})

const filteredProviders = computed(() => {
  if (!modelSearch.value) return providers
  
  return providers.map(provider => ({
    ...provider,
    models: provider.models.filter(model =>
      model.name.toLowerCase().includes(modelSearch.value.toLowerCase())
    )
  })).filter(provider => provider.models.length > 0)
})

const presets = [
  {
    id: 'writing',
    name: 'Writing Assistant',
    icon: 'mdi:pencil',
    description: 'Help with writing and editing'
  },
  {
    id: 'coding',
    name: 'Code Assistant',
    icon: 'mdi:code-braces',
    description: 'Programming help and code review'
  },
  {
    id: 'research',
    name: 'Research Assistant',
    icon: 'mdi:book-search',
    description: 'Help with research and analysis'
  }
]

const chatHistory = ref<ChatHistory[]>([
  {
    id: 1,
    title: 'Project Planning',
    model: { 
      id: 'claude-3-haiku',
      icon: 'mdi:robot'
    },
    messages: [
      {
        id: '1',
        role: 'assistant',
        content: "Let's plan your project. What's the main goal?"
      },
      {
        id: '2',
        role: 'user',
        content: 'I want to build a web application'
      }
    ]
  },
  {
    id: 2,
    title: 'Code Review',
    model: {
      id: 'gpt-4',
      icon: 'mdi:code-braces'
    },
    messages: [
      {
        id: '1',
        role: 'user',
        content: 'Can you review my React component?'
      }
    ]
  }
])

const filteredHistory = computed(() => {
  if (!historySearch.value) return chatHistory.value
  return chatHistory.value.filter(chat =>
    chat.title.toLowerCase().includes(historySearch.value.toLowerCase()) ||
    chat.messages.some(msg => 
      msg.content.toLowerCase().includes(historySearch.value.toLowerCase())
    )
  )
})

const selectModel = (provider: Provider, model: Model) => {
  emit('update:modelValue', model.id)
  isModelDropdownOpen.value = false
}

const selectChat = (chat: ChatHistory) => {
  emit('select-chat', chat)
  isHistoryDropdownOpen.value = false
}

const selectPreset = (preset: Preset) => {
  selectedPreset.value = preset
  isPresetsDropdownOpen.value = false
}

const createNewChat = () => {
  const newChat: ChatHistory = {
    id: Date.now(),
    title: 'New Chat',
    model: {
      id: props.modelValue,
      icon: 'mdi:robot'
    },
    messages: []
  }
  chatHistory.value.unshift(newChat)
  selectChat(newChat)
}

const handleShare = () => {
  const chatLink = window.location.href
  navigator.clipboard.writeText(chatLink)
    .then(() => {
      console.log('Chat link copied to clipboard')
    })
    .catch(err => {
      console.error('Failed to copy chat link:', err)
    })
}

// Close dropdowns when clicking outside
const headerRef = ref(null)
onClickOutside(headerRef, () => {
  isModelDropdownOpen.value = false
  isHistoryDropdownOpen.value = false
  isPresetsDropdownOpen.value = false
})
</script>

<style scoped>
.max-h-64 {
  scrollbar-width: thin;
  scrollbar-color: #E5E7EB transparent;
}

.max-h-64::-webkit-scrollbar {
  width: 4px;
}

.max-h-64::-webkit-scrollbar-track {
  background: transparent;
}

.max-h-64::-webkit-scrollbar-thumb {
  background-color: #E5E7EB;
  border-radius: 2px;
}
</style>