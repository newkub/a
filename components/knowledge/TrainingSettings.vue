<template>
  <div class="p-4">
    <h2 class="text-lg font-semibold mb-4">Training Settings</h2>
    
    <div class="space-y-6">
      <!-- Training Status -->
      <div>
        <BaseToggle
          label="Enable Training"
          v-model="localSettings.enabled"
          @update:modelValue="updateSettings"
        />
      </div>

      <template v-if="localSettings.enabled">
        <!-- Priority -->
        <div>
          <label class="block text-sm font-medium mb-2">Priority</label>
          <select
            v-model="localSettings.priority"
            class="w-full rounded-lg border border-neutral-200 p-2"
            @change="updateSettings"
          >
            <option :value="1">High Priority</option>
            <option :value="2">Medium Priority</option>
            <option :value="3">Low Priority</option>
          </select>
        </div>

        <!-- Chunk Size -->
        <div>
          <div class="flex items-center justify-between mb-2">
            <label class="text-sm font-medium">Chunk Size</label>
            <span class="text-sm text-neutral-500">{{ localSettings.chunkSize }} tokens</span>
          </div>
          <input
            type="range"
            v-model="localSettings.chunkSize"
            min="256"
            max="2048"
            step="128"
            class="w-full"
            @change="updateSettings"
          />
        </div>

        <!-- Overlap -->
        <div>
          <div class="flex items-center justify-between mb-2">
            <label class="text-sm font-medium">Chunk Overlap</label>
            <span class="text-sm text-neutral-500">{{ localSettings.overlap }}%</span>
          </div>
          <input
            type="range"
            v-model="localSettings.overlap"
            min="0"
            max="50"
            step="5"
            class="w-full"
            @change="updateSettings"
          />
        </div>

        <!-- Quality -->
        <div>
          <label class="block text-sm font-medium mb-2">Processing Quality</label>
          <div class="grid grid-cols-3 gap-2">
            <button
              v-for="quality in ['low', 'medium', 'high']"
              :key="quality"
              class="p-2 rounded-lg text-center text-sm border"
              :class="localSettings.quality === quality ? 'bg-primary-50 border-primary-200 text-primary-700' : 'border-neutral-200 text-neutral-600 hover:bg-neutral-50'"
              @click="setQuality(quality)"
            >
              {{ quality.charAt(0).toUpperCase() + quality.slice(1) }}
            </button>
          </div>
        </div>

        <!-- Processing Stats -->
        <div class="bg-neutral-50 rounded-lg p-4">
          <h3 class="text-sm font-medium mb-3">Processing Stats</h3>
          <div class="space-y-2 text-sm">
            <div class="flex justify-between">
              <span class="text-neutral-600">Estimated Chunks</span>
              <span class="font-medium">{{ document.metadata.chunks }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-neutral-600">Embedding Model</span>
              <span class="font-medium">{{ document.metadata.embedding }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-neutral-600">Last Updated</span>
              <span class="font-medium">{{ formatDate(document.metadata.lastModified) }}</span>
            </div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  document: {
    id: string
    metadata: {
      chunks: number
      embedding: string
      lastModified: Date
    }
    training: {
      enabled: boolean
      priority: number
      chunkSize: number
      overlap: number
      quality: 'high' | 'medium' | 'low'
    }
  }
}>()

const emit = defineEmits<{
  update: [id: string, settings: typeof props.document.training]
}>()

const localSettings = ref({ ...props.document.training })

const updateSettings = () => {
  emit('update', props.document.id, localSettings.value)
}

const setQuality = (quality: 'high' | 'medium' | 'low') => {
  localSettings.value.quality = quality
  updateSettings()
}

const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat('en-US', {
    dateStyle: 'medium',
    timeStyle: 'short'
  }).format(date)
}

// Reset local settings when props change
watch(() => props.document.training, (newSettings) => {
  localSettings.value = { ...newSettings }
}, { deep: true })
</script>