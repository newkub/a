<template>
  <div class="h-full p-4 overflow-y-auto">
    <!-- Model Selection -->
    <div class="mb-6">
      <h3 class="text-sm font-medium text-neutral-700 mb-2">Model</h3>
      <div class="relative">
        <button
          @click="isModelDropdownOpen = !isModelDropdownOpen"
          class="w-full p-3 flex items-center justify-between bg-white border border-neutral-200 rounded-lg text-sm hover:border-neutral-300"
        >
          <span>{{ selectedModel.name }}</span>
          <Icon 
            :icon="isModelDropdownOpen ? 'mdi:chevron-up' : 'mdi:chevron-down'" 
            class="text-lg text-neutral-500"
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
                  v-if="provider.id === 'anthropic'"
                  src="https://avatars.githubusercontent.com/u/49760167?s=200&v=4"
                  class="w-5 h-5 rounded"
                  alt="Anthropic"
                />
                <Icon
                  v-else-if="provider.id === 'openai'"
                  icon="simple-icons:openai"
                  class="w-5 h-5"
                />
                <span class="text-sm font-medium">{{ provider.name }}</span>
              </div>
              <div class="space-y-1 ml-6">
                <button
                  v-for="model in provider.models"
                  :key="model.id"
                  @click="selectModel(model)"
                  class="w-full text-left px-3 py-1.5 rounded-lg hover:bg-neutral-50 transition-colors text-sm"
                  :class="selectedModel.id === model.id ? 'bg-neutral-100' : ''"
                >
                  {{ model.name }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Chat Settings -->
    <div class="space-y-4">
      <!-- Temperature -->
      <div>
        <div class="flex items-center justify-between mb-2">
          <label class="text-sm font-medium text-neutral-700">Temperature</label>
          <span class="text-sm text-neutral-600">{{ temperature }}</span>
        </div>
        <input
          type="range"
          v-model="temperature"
          min="0"
          max="2"
          step="0.1"
          class="w-full"
        />
      </div>

      <!-- Max Length -->
      <div>
        <div class="flex items-center justify-between mb-2">
          <label class="text-sm font-medium text-neutral-700">Max Length</label>
          <span class="text-sm text-neutral-600">{{ maxLength }}</span>
        </div>
        <input
          type="range"
          v-model="maxLength"
          min="100"
          max="4000"
          step="100"
          class="w-full"
        />
      </div>

      <!-- Stream Toggle -->
      <div class="flex items-center justify-between">
        <label class="text-sm font-medium text-neutral-700">Stream Response</label>
        <button
          class="relative inline-flex h-6 w-11 items-center rounded-full"
          :class="streamResponse ? 'bg-primary-500' : 'bg-neutral-200'"
          @click="streamResponse = !streamResponse"
        >
          <span
            class="inline-block h-4 w-4 transform rounded-full bg-white transition"
            :class="streamResponse ? 'translate-x-6' : 'translate-x-1'"
          />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { ref, computed } from 'vue'

interface Model {
  id: string
  name: string
}

interface Provider {
  id: string
  name: string
  models: Model[]
}

// Model selection
const isModelDropdownOpen = ref(false)
const modelSearch = ref('')
const selectedModel = ref<Model>({
  id: 'claude-3-haiku',
  name: 'Claude 3 Haiku'
})

// Chat settings
const temperature = ref(0.7)
const maxLength = ref(2000)
const streamResponse = ref(true)

// Available models
const providers: Provider[] = [
  {
    id: 'anthropic',
    name: 'Anthropic',
    models: [
      { id: 'claude-3-haiku', name: 'Claude 3 Haiku' },
      { id: 'claude-3-opus', name: 'Claude 3 Opus' },
      { id: 'claude-3-sonnet', name: 'Claude 3 Sonnet' }
    ]
  },
  {
    id: 'openai',
    name: 'OpenAI',
    models: [
      { id: 'gpt-4', name: 'GPT-4' },
      { id: 'gpt-4-turbo', name: 'GPT-4 Turbo' },
      { id: 'gpt-3.5-turbo', name: 'GPT-3.5 Turbo' }
    ]
  }
]

const filteredProviders = computed(() => {
  if (!modelSearch.value) return providers
  
  return providers.map(provider => ({
    ...provider,
    models: provider.models.filter(model =>
      model.name.toLowerCase().includes(modelSearch.value.toLowerCase())
    )
  })).filter(provider => provider.models.length > 0)
})

const selectModel = (model: Model) => {
  selectedModel.value = model
  isModelDropdownOpen.value = false
}

// Close dropdown when clicking outside
onMounted(() => {
  const handleClickOutside = (event: MouseEvent) => {
    const target = event.target as HTMLElement
    if (!target.closest('.relative')) {
      isModelDropdownOpen.value = false
    }
  }
  
  document.addEventListener('click', handleClickOutside)
  
  onUnmounted(() => {
    document.removeEventListener('click', handleClickOutside)
  })
})
</script>

<style scoped>
input[type="range"] {
  -webkit-appearance: none;
  width: 100%;
  height: 4px;
  border-radius: 2px;
  background: #E5E7EB;
  outline: none;
}

input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: #4F46E5;
  cursor: pointer;
  border: 2px solid white;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

input[type="range"]::-moz-range-thumb {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: #4F46E5;
  cursor: pointer;
  border: 2px solid white;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}
</style>