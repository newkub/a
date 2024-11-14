<template>
  <div ref="headerRef" class="bg-white border-b border-neutral-200 p-4 rounded-t-xl">
    <div class="flex items-center gap-4">
      <!-- History Dropdown -->
      <Selector
        v-model="historySearch"
        :title="selectedChat?.title || 'History'"
        icon="mdi:history"
        :with-search="true"
        search-placeholder="Search conversations..."
        :selected-item="selectedChat ? { id: selectedChat.id, label: selectedChat.title, icon: selectedChat.model.icon } : null"
        @update:is-open="isHistoryDropdownOpen = $event"
      >
        <template #default="{ select }">
          <div v-for="chat in filteredHistory" :key="chat.id" class="mb-2">
            <button
              class="w-full text-left p-2 rounded-lg hover:bg-neutral-50 transition-colors"
              @click="select({ id: chat.id, label: chat.title, icon: chat.model.icon }); emit('update:selectedChat', chat)"
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
        </template>
      </Selector>

      <!-- Model Selector Dropdown -->
      <Selector
        v-model="modelSearchQuery"
        :title="getModelName(selectedChat?.model?.id)"
        :icon="selectedChat?.model?.icon || 'mdi:robot'"
        :with-search="true"
        search-placeholder="Search models..."
        :selected-item="selectedChat?.model ? { id: selectedChat.model.id, label: getModelName(selectedChat.model.id), icon: selectedChat.model.icon } : null"
        @update:is-open="isModelDropdownOpen = $event"
      >
        <template #default="{ select }">
          <div v-for="provider in filteredProviders" :key="provider.id" class="p-2">
            <div class="flex items-center gap-2 mb-2">
              <img :src="provider.avatar" class="w-5 h-5 rounded-full" />
              <span class="text-sm font-medium">{{ provider.name }}</span>
            </div>
            <div class="space-y-1">
              <button
                v-for="model in provider.models"
                :key="model.id"
                class="w-full text-left p-2 rounded-lg hover:bg-neutral-50 transition-colors"
                @click="select({ id: model.id, label: model.name, icon: selectedChat?.model?.icon || 'mdi:robot' }); selectModel(model)"
                :class="selectedChat?.model?.id === model.id ? 'bg-neutral-100' : ''"
              >
                <span class="text-sm">{{ model.name }}</span>
              </button>
            </div>
          </div>
        </template>
      </Selector>

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
import type { ChatHistory } from '~/types/chat'
import type { Model } from '~/types/models'
import Selector from '~/components/ui/Selector.vue'

const props = defineProps<{
  selectedChat: ChatHistory | null
}>()

const emit = defineEmits<{
  'update:selectedChat': [value: ChatHistory | null]
}>()

// Model selector
const {
  isDropdownOpen: isModelDropdownOpen,
  searchQuery: modelSearchQuery,
  filteredProviders,
  getModelName
} = useModelSelector()

const selectModel = (model: Model) => {
  if (props.selectedChat) {
    props.selectedChat.model = model
  }
  isModelDropdownOpen.value = false
}

// Chat history
const isHistoryDropdownOpen = ref(false)
const historySearch = ref('')

const chatHistory: ChatHistory[] = [
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
]

const filteredHistory = computed(() => {
  if (!historySearch.value) return chatHistory
  return chatHistory.filter(chat =>
    chat.title.toLowerCase().includes(historySearch.value.toLowerCase()) ||
    chat.messages.some(msg => 
      msg.content.toLowerCase().includes(historySearch.value.toLowerCase())
    )
  )
})

const createNewChat = () => {
  const newChat: ChatHistory = {
    id: Date.now(),
    title: 'New Chat',
    model: {
      id: 'claude-3-haiku',
      icon: 'mdi:robot'
    },
    messages: []
  }
  chatHistory.unshift(newChat)
  emit('update:selectedChat', newChat)
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