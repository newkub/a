<template>
  <div class="space-y-6">
    <!-- API Key Management -->
    <div class="p-6 bg-white rounded-xl border border-neutral-200">
      <div class="flex items-center justify-between mb-6">
        <div>
          <h2 class="text-lg font-semibold">API Keys</h2>
          <p class="text-sm text-neutral-600">Create and manage your API keys</p>
        </div>
        <button class="btn-primary" @click="showCreateKeyModal = true">
          <Icon icon="mdi:plus" class="btn-icon" />
          Create new secret key
        </button>
      </div>

      <!-- Keys List -->
      <div class="mb-4">
        <div class="flex items-center gap-4 mb-4">
          <div class="relative flex-1">
            <Icon icon="mdi:magnify" class="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
            <input
              v-model="search"
              type="text"
              placeholder="Search API keys"
              class="w-full pl-10 pr-4 py-2 rounded-lg border border-neutral-200"
            />
          </div>
        </div>

        <!-- Table Header -->
        <div class="border border-neutral-200 rounded-lg overflow-hidden">
          <div class="grid grid-cols-12 gap-4 p-4 bg-neutral-50 border-b border-neutral-200">
            <div class="col-span-3 text-sm font-medium text-neutral-600">Name</div>
            <div class="col-span-5 text-sm font-medium text-neutral-600">Key</div>
            <div class="col-span-2 text-sm font-medium text-neutral-600">Created</div>
            <div class="col-span-2 text-sm font-medium text-neutral-600">Last used</div>
          </div>

          <!-- Keys List -->
          <div class="divide-y divide-neutral-200">
            <div v-for="key in filteredKeys" :key="key.id" class="grid grid-cols-12 gap-4 p-4 hover:bg-neutral-50">
              <div class="col-span-3">
                <div class="font-medium text-sm">{{ key.name }}</div>
                <div class="text-xs text-neutral-500">{{ key.type }}</div>
              </div>
              <div class="col-span-5">
                <div class="flex items-center gap-2">
                  <div class="font-mono text-sm truncate" :class="key.revealed ? '' : 'text-neutral-400'">
                    {{ key.revealed ? key.value : '•'.repeat(35) }}
                  </div>
                  <button
                    v-if="!key.revealed"
                    @click="revealKey(key.id)"
                    class="p-1 text-neutral-500 hover:text-neutral-700"
                  >
                    <Icon icon="mdi:eye" class="text-lg" />
                  </button>
                  <button
                    v-if="key.revealed"
                    @click="copyKey(key.value)"
                    class="p-1 text-neutral-500 hover:text-neutral-700"
                  >
                    <Icon icon="mdi:content-copy" class="text-lg" />
                  </button>
                </div>
              </div>
              <div class="col-span-2">
                <div class="text-sm text-neutral-600">{{ key.created }}</div>
              </div>
              <div class="col-span-2 flex items-center justify-between">
                <div class="text-sm text-neutral-600">{{ key.lastUsed }}</div>
                <button 
                  @click="deleteKey(key.id)"
                  class="p-1.5 text-neutral-500 hover:text-error-600"
                >
                  <Icon icon="mdi:trash" class="text-lg" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Help Text -->
      <div class="text-sm text-neutral-600">
        <p class="mb-2">Your secret API keys are listed below. Please note:</p>
        <ul class="list-disc list-inside space-y-1 text-sm">
          <li>Keys can be used to make API requests on your behalf</li>
          <li>Keep your keys safe and reset them if you suspect they've been compromised</li>
          <li>Keys have access to all your organization's resources</li>
        </ul>
      </div>
    </div>

    <!-- Create Key Modal -->
    <div v-if="showCreateKeyModal"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-xl p-6 w-full max-w-md">
        <div class="flex items-center justify-between mb-6">
          <h3 class="text-lg font-semibold">Create new secret key</h3>
          <button @click="showCreateKeyModal = false" class="text-neutral-400 hover:text-neutral-600">
            <Icon icon="mdi:close" class="text-xl" />
          </button>
        </div>
        
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium mb-1">Name</label>
            <input
              v-model="newKey.name"
              type="text"
              class="w-full rounded-lg border border-neutral-200 p-2"
              placeholder="My API Key"
            />
            <p class="mt-1 text-xs text-neutral-500">Something that will help you remember what this key is for</p>
          </div>

          <div>
            <label class="block text-sm font-medium mb-1">Key type</label>
            <select
              v-model="newKey.type"
              class="w-full rounded-lg border border-neutral-200 p-2"
            >
              <option value="full">Full access</option>
              <option value="read">Read-only</option>
              <option value="write">Write-only</option>
            </select>
            <p class="mt-1 text-xs text-neutral-500">Different types have different levels of access</p>
          </div>

          <div>
            <label class="block text-sm font-medium mb-1">Expiration</label>
            <select
              v-model="newKey.expiration"
              class="w-full rounded-lg border border-neutral-200 p-2"
            >
              <option value="never">No expiration</option>
              <option value="7d">7 days</option>
              <option value="30d">30 days</option>
              <option value="90d">90 days</option>
              <option value="180d">180 days</option>
              <option value="1y">1 year</option>
            </select>
          </div>
        </div>

        <div class="flex justify-end gap-3 mt-6">
          <button 
            @click="showCreateKeyModal = false"
            class="btn-ghost"
          >
            Cancel
          </button>
          <button 
            @click="createKey"
            class="btn-primary"
          >
            Create secret key
          </button>
        </div>
      </div>
    </div>

    <!-- New Key Created Modal -->
    <div v-if="showNewKeyModal"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-xl p-6 w-full max-w-md">
        <div class="flex items-center justify-between mb-6">
          <h3 class="text-lg font-semibold">Save your secret key</h3>
          <button @click="closeNewKeyModal" class="text-neutral-400 hover:text-neutral-600">
            <Icon icon="mdi:close" class="text-xl" />
          </button>
        </div>

        <p class="text-sm text-neutral-600 mb-4">
          Make sure to copy your secret key now. You won't be able to see it again!
        </p>
        
        <div class="bg-neutral-50 p-4 rounded-lg font-mono text-sm mb-4">
          {{ newKeyValue }}
        </div>

        <div class="flex justify-end gap-3">
          <button 
            @click="copyKey(newKeyValue)"
            class="btn-secondary"
          >
            <Icon icon="mdi:content-copy" class="text-lg" />
            Copy
          </button>
          <button 
            @click="closeNewKeyModal"
            class="btn-primary"
          >
            I saved my key
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { Icon } from '@iconify/vue'

const search = ref('')
const showCreateKeyModal = ref(false)
const showNewKeyModal = ref(false)
const newKeyValue = ref('')

const newKey = ref({
  name: '',
  type: 'full',
  expiration: 'never'
})

const keys = ref([
  {
    id: 1,
    name: 'Development',
    type: 'Full access',
    value: 'wk-dev-123456789abcdef123456789abcdef12',
    created: '2 days ago',
    lastUsed: '1 hour ago',
    revealed: false
  },
  {
    id: 2,
    name: 'Production',
    type: 'Full access',
    value: 'wk-prod-987654321abcdef123456789abcdef12',
    created: '5 days ago',
    lastUsed: '10 mins ago',
    revealed: false
  },
  {
    id: 3,
    name: 'Testing',
    type: 'Read-only',
    value: 'wk-test-abcdef123456789abcdef123456789ab',
    created: '1 week ago',
    lastUsed: 'Never',
    revealed: false
  }
])

const filteredKeys = computed(() => {
  return keys.value.filter(key => 
    key.name.toLowerCase().includes(search.value.toLowerCase()) ||
    key.type.toLowerCase().includes(search.value.toLowerCase())
  )
})

const copyKey = (key: string) => {
  navigator.clipboard.writeText(key)
  // Show toast notification
}

const revealKey = (id: number) => {
  const key = keys.value.find(k => k.id === id)
  if (key) {
    key.revealed = true
  }
}

const deleteKey = (id: number) => {
  // Show confirmation dialog
  keys.value = keys.value.filter(key => key.id !== id)
}

const createKey = () => {
  // Generate new key
  newKeyValue.value = `wk-${Math.random().toString(36).substring(2, 15)}`
  showCreateKeyModal.value = false
  showNewKeyModal.value = true
}

const closeNewKeyModal = () => {
  showNewKeyModal.value = false
  newKey.value = {
    name: '',
    type: 'full',
    expiration: 'never'
  }
}
</script>

<style scoped>
.btn-primary {
  @apply bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors flex items-center gap-2;
}

.btn-secondary {
  @apply bg-white border border-neutral-200 text-neutral-700 px-4 py-2 rounded-lg hover:bg-neutral-50 transition-colors flex items-center gap-2;
}

.btn-ghost {
  @apply text-neutral-600 hover:text-neutral-800 px-4 py-2 rounded-lg transition-colors;
}
</style>