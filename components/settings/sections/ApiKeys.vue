<template>
  <div class="space-y-6">
    <!-- API Key Management -->
    <div class="p-6 bg-neutral-50 rounded-xl border border-neutral-200">
      <div class="flex items-center justify-between mb-6">
        <div>
          <h2 class="text-lg font-semibold">API Keys</h2>
          <p class="text-sm text-neutral-600">Manage API keys for different providers</p>
        </div>
        <button class="btn-primary" @click="showCreateKeyModal = true">
          <Icon icon="mdi:plus" class="text-lg" />
          Create New Key
        </button>
      </div>

      <!-- Provider Keys -->
      <div class="space-y-4">
        <div v-for="provider in providers" :key="provider.id" 
          class="p-4 bg-white rounded-lg border border-neutral-200">
          <div class="flex items-center gap-3 mb-3">
            <img v-if="provider.id === 'anthropic'" 
              src="https://avatars.githubusercontent.com/u/49760167?s=200&v=4"
              class="w-8 h-8 rounded"
              alt="Anthropic"
            />
            <Icon v-else-if="provider.id === 'openai'"
              icon="simple-icons:openai"
              class="w-8 h-8"
            />
            <div>
              <h3 class="font-medium">{{ provider.name }}</h3>
              <p class="text-sm text-neutral-500">{{ provider.description }}</p>
            </div>
          </div>
          
          <div class="space-y-3">
            <div v-for="key in provider.keys" :key="key.id"
              class="flex items-center justify-between p-3 bg-neutral-50 rounded-lg">
              <div class="flex-1 min-w-0">
                <div class="flex items-center gap-2 mb-1">
                  <span class="font-medium">{{ key.name }}</span>
                  <Badge :variant="key.status === 'active' ? 'success' : 'error'">
                    {{ key.status }}
                  </Badge>
                </div>
                <div class="flex items-center gap-2">
                  <input
                    :type="key.visible ? 'text' : 'password'"
                    :value="key.value"
                    class="flex-1 bg-transparent border-none p-0 text-sm font-mono"
                    readonly
                  />
                  <button
                    class="p-1.5 text-neutral-500 hover:text-neutral-700"
                    @click="key.visible = !key.visible"
                  >
                    <Icon :icon="key.visible ? 'mdi:eye-off' : 'mdi:eye'" class="text-lg" />
                  </button>
                  <button
                    class="p-1.5 text-neutral-500 hover:text-neutral-700"
                    @click="copyKey(key.value)"
                  >
                    <Icon icon="mdi:content-copy" class="text-lg" />
                  </button>
                </div>
              </div>
              <div class="flex items-center gap-2 ml-4">
                <button class="p-2 text-neutral-600 hover:text-primary-600 rounded-lg">
                  <Icon icon="mdi:pencil" class="text-lg" />
                </button>
                <button class="p-2 text-neutral-600 hover:text-error-600 rounded-lg">
                  <Icon icon="mdi:trash" class="text-lg" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Create Key Modal -->
    <div v-if="showCreateKeyModal"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div class="bg-white rounded-xl p-6 w-full max-w-md">
        <h3 class="text-lg font-semibold mb-4">Create New API Key</h3>
        
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium mb-1">Key Name</label>
            <input
              v-model="newKey.name"
              type="text"
              class="w-full rounded-lg border border-neutral-200 p-2"
              placeholder="Enter key name"
            />
          </div>

          <div>
            <label class="block text-sm font-medium mb-1">Provider</label>
            <select
              v-model="newKey.provider"
              class="w-full rounded-lg border border-neutral-200 p-2"
            >
              <option value="anthropic">Anthropic</option>
              <option value="openai">OpenAI</option>
            </select>
          </div>

          <div>
            <label class="block text-sm font-medium mb-1">Permissions</label>
            <div class="space-y-2">
              <label class="flex items-center">
                <input
                  type="checkbox"
                  v-model="newKey.permissions.read"
                  class="rounded border-neutral-300 text-primary-600 focus:ring-primary-500"
                />
                <span class="ml-2 text-sm">Read</span>
              </label>
              <label class="flex items-center">
                <input
                  type="checkbox"
                  v-model="newKey.permissions.write"
                  class="rounded border-neutral-300 text-primary-600 focus:ring-primary-500"
                />
                <span class="ml-2 text-sm">Write</span>
              </label>
              <label class="flex items-center">
                <input
                  type="checkbox"
                  v-model="newKey.permissions.delete"
                  class="rounded border-neutral-300 text-primary-600 focus:ring-primary-500"
                />
                <span class="ml-2 text-sm">Delete</span>
              </label>
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium mb-1">Expiration</label>
            <select
              v-model="newKey.expiration"
              class="w-full rounded-lg border border-neutral-200 p-2"
            >
              <option value="never">Never</option>
              <option value="30d">30 days</option>
              <option value="90d">90 days</option>
              <option value="1y">1 year</option>
            </select>
          </div>
        </div>

        <div class="flex justify-end gap-3 mt-6">
          <button
            class="px-4 py-2 text-neutral-600 hover:bg-neutral-100 rounded-lg"
            @click="showCreateKeyModal = false"
          >
            Cancel
          </button>
          <button
            class="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600"
            @click="createKey"
          >
            Create Key
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'

const showCreateKeyModal = ref(false)

const providers = reactive([
  {
    id: 'anthropic',
    name: 'Anthropic',
    description: 'Required for Claude models',
    keys: [
      {
        id: 1,
        name: 'Production',
        value: 'sk-ant-prod-...abc123',
        status: 'active',
        visible: false
      },
      {
        id: 2,
        name: 'Development',
        value: 'sk-ant-dev-...xyz789',
        status: 'active',
        visible: false
      }
    ]
  },
  {
    id: 'openai',
    name: 'OpenAI',
    description: 'Required for GPT models',
    keys: [
      {
        id: 3,
        name: 'Production',
        value: 'sk-openai-prod-...def456',
        status: 'active',
        visible: false
      }
    ]
  }
])

const newKey = reactive({
  name: '',
  provider: 'anthropic',
  permissions: {
    read: true,
    write: false,
    delete: false
  },
  expiration: 'never'
})

const copyKey = (key: string) => {
  navigator.clipboard.writeText(key)
    .then(() => {
      // Show success toast
      console.log('Key copied')
    })
    .catch(err => {
      console.error('Failed to copy key:', err)
    })
}

const createKey = () => {
  // Implementation for creating new key
  showCreateKeyModal.value = false
}
</script>