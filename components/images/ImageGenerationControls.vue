<template>
  <div class="bg-white rounded-xl border border-neutral-200 p-6">
    <!-- Prompt Input -->
    <div class="mb-6">
      <label class="block text-sm font-medium text-neutral-700 mb-2">Prompt</label>
      <textarea
        v-model="prompt"
        rows="3"
        class="textarea-base resize-none"
        placeholder="Describe the image you want to create..."
      />
    </div>

    <!-- Style Presets -->
    <div class="mb-6">
      <label class="block text-sm font-medium text-neutral-700 mb-2">Style Preset</label>
      <div class="grid grid-cols-3 gap-2">
        <button
          v-for="preset in stylePresets"
          :key="preset.id"
          class="px-4 py-2 rounded-lg border text-sm"
          :class="selectedPreset === preset.id ? 'bg-primary-50 border-primary-200 text-primary-700' : 'border-neutral-200 text-neutral-600 hover:bg-neutral-50'"
          @click="selectedPreset = preset.id"
        >
          {{ preset.name }}
        </button>
      </div>
    </div>

    <!-- Advanced Parameters -->
    <div class="mb-6">
      <div class="flex items-center justify-between mb-2">
        <label class="text-sm font-medium text-neutral-700">Advanced Parameters</label>
        <button
          class="text-sm text-primary-600 hover:text-primary-700"
          @click="showAdvanced = !showAdvanced"
        >
          {{ showAdvanced ? 'Hide' : 'Show' }}
        </button>
      </div>

      <div v-if="showAdvanced" class="space-y-4">
        <BaseSlider
          label="Steps"
          v-model="parameters.steps"
          :min="20"
          :max="150"
          :step="1"
        />
        <BaseSlider
          label="Guidance Scale"
          v-model="parameters.guidance"
          :min="1"
          :max="20"
          :step="0.1"
        />
      </div>
    </div>

    <!-- Negative Prompt -->
    <div class="mb-6">
      <label class="block text-sm font-medium text-neutral-700 mb-2">Negative Prompt</label>
      <textarea
        v-model="negativePrompt"
        rows="2"
        class="textarea-base resize-none"
        placeholder="Describe what you don't want in the image..."
      ></textarea>
    </div>

    <!-- Generate Button -->
    <button class="w-full btn-primary">
      <Icon icon="mdi:magic" class="text-lg mr-2" />
      Generate Image
    </button>
  </div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'

const prompt = ref('')
const negativePrompt = ref('')
const selectedPreset = ref('photorealistic')
const showAdvanced = ref(false)

const stylePresets = [
  { id: 'photorealistic', name: 'Photorealistic' },
  { id: 'artistic', name: 'Artistic' },
  { id: 'abstract', name: 'Abstract' }
]

const parameters = reactive({
  steps: 50,
  guidance: 7.5
})
</script>