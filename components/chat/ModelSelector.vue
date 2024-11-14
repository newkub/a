<template>
  <div class="relative flex-1">
    <button
      @click="isOpen = !isOpen"
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
        :icon="isOpen ? 'mdi:chevron-up' : 'mdi:chevron-down'" 
        class="text-lg text-neutral-500 flex-shrink-0"
      />
    </button>

    <div
      v-if="isOpen"
      class="absolute z-50 w-full mt-1 bg-white border border-neutral-200 rounded-lg shadow-lg"
    >
      <div class="p-2 border-b border-neutral-200">
        <input
          v-model="searchQuery"
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
              @click="selectModel(model.id)"
              class="w-full text-left px-3 py-1.5 rounded-lg hover:bg-neutral-50 transition-colors text-sm"
              :class="modelValue === model.id ? 'bg-neutral-100' : ''"
            >
              {{ model.name }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'
import type { Provider, Model } from '~/types/chat'

const props = defineProps<{
  modelValue: string
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const isOpen = ref(false)
const searchQuery = ref('')

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
  return providers.find(p => p.models.some(m => m.id === modelId)) || providers[0]
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
  if (!searchQuery.value) return providers
  
  return providers.map(provider => ({
    ...provider,
    models: provider.models.filter(model =>
      model.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  })).filter(provider => provider.models.length > 0)
})

const selectModel = (modelId: string) => {
  emit('update:modelValue', modelId)
  isOpen.value = false
}

onClickOutside(ref(null), () => {
  isOpen.value = false
})
</script>