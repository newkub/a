<template>
  <div class="relative" ref="dropdownRef">
    <button
      @click="toggleDropdown"
      class="w-full p-2 flex items-center justify-between bg-white border border-neutral-200 rounded-lg text-sm"
    >
      <span>{{ getModelName(modelValue) }}</span>
      <Icon :icon="isDropdownOpen ? 'mdi:chevron-up' : 'mdi:chevron-down'" class="text-lg" />
    </button>

    <div
      v-if="isDropdownOpen"
      class="absolute z-50 w-full mt-1 bg-white border border-neutral-200 rounded-lg shadow-lg text-sm"
    >
      <div class="p-2 border-b border-neutral-200">
        <div class="flex rounded-lg bg-neutral-100 p-0.5">
          <button
            v-for="type in ['On-device', 'Cloud']"
            :key="type"
            @click="deploymentType = type"
            class="flex-1 py-1.5 text-center rounded-md text-sm transition-colors"
            :class="deploymentType === type ? 'bg-white shadow-sm' : 'text-neutral-500'"
          >
            {{ type }}
          </button>
        </div>
      </div>

      <div class="p-2 border-b border-neutral-200">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search models..."
          class="w-full p-1.5 bg-neutral-50 rounded-lg text-sm"
        />
      </div>

      <div class="max-h-48 overflow-y-auto">
        <div v-for="provider in filteredProviders" :key="provider.id" class="p-1.5">
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

          <div class="space-y-0.5 ml-6">
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

const props = defineProps<{
  modelValue: string
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const isDropdownOpen = ref(false)
const deploymentType = ref('Cloud')
const searchQuery = ref('')

const providers = [
  {
    id: 'anthropic',
    name: 'Anthropic',
    models: [
      { id: 'claude-3-haiku', name: 'Claude 3 Haiku' },
      { id: 'claude-3-opus', name: 'Claude 3 Opus' },
      { id: 'claude-3-sonnet', name: 'Claude 3 Sonnet' },
      { id: 'claude-3.5-sonnet', name: 'Claude 3.5 Sonnet' }
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
  if (!searchQuery.value) return providers
  
  return providers.map(provider => ({
    ...provider,
    models: provider.models.filter(model =>
      model.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  })).filter(provider => provider.models.length > 0)
})

const getModelName = (modelId: string) => {
  for (const provider of providers) {
    const model = provider.models.find(m => m.id === modelId)
    if (model) return model.name
  }
  return 'Select a model'
}

const selectModel = (modelId: string) => {
  emit('update:modelValue', modelId)
  isDropdownOpen.value = false
}

const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value
}

// Close dropdown when clicking outside
onMounted(() => {
  const handleClickOutside = (event: MouseEvent) => {
    const target = event.target as HTMLElement
    if (!target.closest('.relative')) {
      isDropdownOpen.value = false
    }
  }
  
  document.addEventListener('click', handleClickOutside)
  
  onUnmounted(() => {
    document.removeEventListener('click', handleClickOutside)
  })
})
</script>

<style scoped>
.absolute {
  z-index: 50;
}
</style>