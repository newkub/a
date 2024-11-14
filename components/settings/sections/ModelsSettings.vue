<template>
  <div class="space-y-6">
    <div class="p-6 bg-neutral-50 rounded-xl border border-neutral-200">
      <div class="flex items-center justify-between mb-6">
        <div>
          <h2 class="text-lg font-semibold">Models</h2>
          <p class="text-sm text-neutral-600">Configure and manage AI models</p>
        </div>
        <div class="flex items-center gap-3">
          <button class="btn-secondary">
            <Icon icon="mdi:refresh" class="btn-icon" />
            Sync Models
          </button>
          <button class="btn-primary">
            <Icon icon="mdi:plus" class="btn-icon" />
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
                <Badge :variant="model.type === 'text' ? 'primary' : 'neutral'">
                  {{ model.type }}
                </Badge>
              </td>
              <td class="p-3">
                <Badge
                  :variant="model.status === 'active' ? 'success' : 'error'"
                >
                  {{ model.status }}
                </Badge>
              </td>
              <td class="p-3 text-sm text-neutral-600">
                {{ model.lastUsed || 'Never' }}
              </td>
              <td class="p-3">
                <div class="flex items-center gap-2">
                  <div class="w-24 h-2 bg-neutral-100 rounded-full overflow-hidden">
                    <div
                      class="h-full bg-primary-500 rounded-full"
                      :style="{ width: `${model.usage}%` }"
                    />
                  </div>
                  <span class="text-sm text-neutral-600">{{ model.usage }}%</span>
                </div>
              </td>
              <td class="p-3">
                <div class="flex items-center justify-end gap-2">
                  <button class="p-2 text-neutral-600 hover:text-primary-600 rounded-lg">
                    <Icon icon="mdi:pencil" class="text-lg" />
                  </button>
                  <button class="p-2 text-neutral-600 hover:text-error-600 rounded-lg">
                    <Icon icon="mdi:trash" class="text-lg" />
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'

const filters = reactive({
  search: '',
  provider: '',
  type: ''
})

const models = ref([
  {
    id: 1,
    name: 'Claude 3 Opus',
    version: 'Latest',
    provider: 'anthropic',
    type: 'text',
    status: 'active',
    lastUsed: '2024-03-15',
    usage: 85,
    icon: 'mdi:robot'
  },
  {
    id: 2,
    name: 'GPT-4 Turbo',
    version: 'Latest',
    provider: 'openai',
    type: 'text',
    status: 'active',
    lastUsed: '2024-03-14',
    usage: 65,
    icon: 'mdi:robot'
  },
  {
    id: 3,
    name: 'DALL·E 3',
    version: 'Latest',
    provider: 'openai',
    type: 'image',
    status: 'active',
    lastUsed: '2024-03-13',
    usage: 45,
    icon: 'mdi:image'
  }
])

const filteredModels = computed(() => {
  return models.value.filter(model => {
    const matchesSearch = model.name.toLowerCase().includes(filters.search.toLowerCase())
    const matchesProvider = !filters.provider || model.provider === filters.provider
    const matchesType = !filters.type || model.type === filters.type
    return matchesSearch && matchesProvider && matchesType
  })
})
</script>