<template>
  <div class="min-h-screen bg-background">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-neutral-900 mb-2">Models Hub</h1>
        <p class="text-neutral-600">Configure and manage AI models for your workspace</p>
      </div>

      <!-- Models Settings -->
      <div class="space-y-6">
        <div class="p-6 bg-white rounded-xl border border-neutral-200">
          <div class="flex items-center justify-between mb-6">
            <div>
              <h2 class="text-lg font-semibold">Models</h2>
              <p class="text-sm text-neutral-600">Configure and manage AI models</p>
            </div>
            <div class="flex items-center gap-3">
              <button
                class="btn-secondary"
              >
                <div class="i-mdi-refresh btn-icon"></div>
                Sync Models
              </button>
              <button
                class="btn-primary"
              >
                <div class="i-mdi-plus btn-icon"></div>
                Add Model
              </button>
            </div>
          </div>

          <!-- Filters -->
          <div class="flex items-center gap-4 mb-6">
            <div class="relative flex-1">
              <Icon icon="mdi:magnify" class="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
              <input
                v-model="filters.search"
                type="text"
                placeholder="Search models..."
                class="w-full pl-10 pr-4 py-2 rounded-lg border border-neutral-200"
              />
            </div>
            <select
              v-model="filters.provider"
              class="rounded-lg border border-neutral-200 px-4 py-2"
            >
              <option value="">All Providers</option>
              <option value="anthropic">Anthropic</option>
              <option value="openai">OpenAI</option>
            </select>
            <select
              v-model="filters.type"
              class="rounded-lg border border-neutral-200 px-4 py-2"
            >
              <option value="">All Types</option>
              <option value="text">Text</option>
              <option value="image">Image</option>
              <option value="audio">Audio</option>
            </select>
          </div>

          <!-- Models Table -->
          <div class="overflow-x-auto">
            <table class="w-full">
              <thead>
                <tr class="border-b border-neutral-200">
                  <th class="text-left p-3 text-sm font-medium text-neutral-600">Model</th>
                  <th class="text-left p-3 text-sm font-medium text-neutral-600">Provider</th>
                  <th class="text-left p-3 text-sm font-medium text-neutral-600">Type</th>
                  <th class="text-left p-3 text-sm font-medium text-neutral-600">Status</th>
                  <th class="text-left p-3 text-sm font-medium text-neutral-600">Last Used</th>
                  <th class="text-left p-3 text-sm font-medium text-neutral-600">Usage</th>
                  <th class="text-right p-3 text-sm font-medium text-neutral-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="model in filteredModels" :key="model.id" class="border-b border-neutral-100">
                  <td class="p-3">
                    <div class="flex items-center gap-3">
                      <Icon :icon="model.icon" class="text-xl text-neutral-500" />
                      <div>
                        <div class="font-medium">{{ model.name }}</div>
                        <div class="text-sm text-neutral-500">{{ model.version }}</div>
                      </div>
                    </div>
                  </td>
                  <td class="p-3">
                    <div class="flex items-center gap-2">
                      <img v-if="model.provider === 'anthropic'"
                        src="https://avatars.githubusercontent.com/u/49760167?s=200&v=4"
                        class="w-5 h-5 rounded"
                        alt="Anthropic"
                      />
                      <Icon v-else-if="model.provider === 'openai'"
                        icon="simple-icons:openai"
                        class="w-5 h-5"
                      />
                      <span>{{ model.provider }}</span>
                    </div>
                  </td>
                  <td class="p-3">
                    <span :class="[
                      model.type === 'text' ? 'badge-primary' : 'badge-neutral'
                    ]">
                      {{ model.type }}
                    </span>
                  </td>
                  <td class="p-3">
                    <span :class="[
                      model.status === 'active' ? 'badge-success' : 'badge-error'
                    ]">
                      {{ model.status }}
                    </span>
                  </td>
                  <td class="p-3 text-sm text-neutral-600">{{ model.lastUsed }}</td>
                  <td class="p-3 text-sm text-neutral-600">{{ model.usage }}</td>
                  <td class="p-3">
                    <div class="flex items-center justify-end gap-2">
                      <button class="p-2 hover:bg-neutral-100 rounded-lg transition-colors">
                        <Icon icon="mdi:pencil" class="text-lg text-neutral-600" />
                      </button>
                      <button class="p-2 hover:bg-neutral-100 rounded-lg transition-colors">
                        <Icon icon="mdi:delete" class="text-lg text-neutral-600" />
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { Icon } from '@iconify/vue'

const filters = ref({
  search: '',
  provider: '',
  type: ''
})

const models = ref([
  {
    id: 1,
    name: 'Claude 2',
    version: 'v2.0',
    provider: 'anthropic',
    type: 'text',
    status: 'active',
    lastUsed: '2 hours ago',
    usage: '1.2K tokens',
    icon: 'mdi:robot'
  },
  {
    id: 2,
    name: 'GPT-4',
    version: 'v4.0',
    provider: 'openai',
    type: 'text',
    status: 'active',
    lastUsed: '5 mins ago',
    usage: '3.5K tokens',
    icon: 'mdi:brain'
  },
  {
    id: 3,
    name: 'DALL-E 3',
    version: 'v3.0',
    provider: 'openai',
    type: 'image',
    status: 'active',
    lastUsed: '1 day ago',
    usage: '50 images',
    icon: 'mdi:image'
  },
  {
    id: 4,
    name: 'Whisper',
    version: 'v1.0',
    provider: 'openai',
    type: 'audio',
    status: 'inactive',
    lastUsed: '1 week ago',
    usage: '2.1 hours',
    icon: 'mdi:microphone'
  }
])

const filteredModels = computed(() => {
  return models.value.filter(model => {
    const matchesSearch = 
      model.name.toLowerCase().includes(filters.value.search.toLowerCase()) ||
      model.provider.toLowerCase().includes(filters.value.search.toLowerCase())
    
    const matchesProvider = !filters.value.provider || model.provider === filters.value.provider
    const matchesType = !filters.value.type || model.type === filters.value.type

    return matchesSearch && matchesProvider && matchesType
  })
})
</script>

<style scoped>
.btn-primary {
  @apply bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors flex items-center gap-2;
}

.btn-secondary {
  @apply bg-white border border-neutral-200 text-neutral-700 px-4 py-2 rounded-lg hover:bg-neutral-50 transition-colors flex items-center gap-2;
}

.btn-icon {
  @apply text-lg text-neutral-600;
}

.badge-primary {
  @apply bg-primary-100 text-primary-600 px-2 py-1 rounded-lg;
}

.badge-neutral {
  @apply bg-neutral-100 text-neutral-600 px-2 py-1 rounded-lg;
}

.badge-success {
  @apply bg-success-100 text-success-600 px-2 py-1 rounded-lg;
}

.badge-error {
  @apply bg-error-100 text-error-600 px-2 py-1 rounded-lg;
}
</style>