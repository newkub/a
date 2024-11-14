<template>
  <div class="w-80 bg-white text-neutral-900 p-4 overflow-y-auto h-full border-l border-neutral-200">
    <!-- Models Section -->
    <div class="mb-6">
      <BaseButton 
        :expanded="expandedSections.models"
        @click="toggleSection('models')"
      >
        Models
      </BaseButton>
      
      <div v-show="expandedSections.models" class="mt-4">
        <ModelSelector
          v-model="modelValue.model"
          @update:modelValue="updateSettings('model', $event)"
        />
      </div>
    </div>

    <!-- Parameters Section -->
    <div class="mb-4">
      <BaseButton 
        :expanded="expandedSections.parameters"
        @click="toggleSection('parameters')"
      >
        Parameters
      </BaseButton>
      <div v-show="expandedSections.parameters" class="mt-2 space-y-4">
        <div>
          <label class="block text-sm font-medium mb-2">Custom Name</label>
          <input
            :value="modelValue.customName"
            type="text"
            class="w-full rounded-lg border border-neutral-200 p-2 bg-neutral-100"
            placeholder="Set a custom name for the AI"
            @input="updateSettings('customName', ($event.target as HTMLInputElement).value)"
          />
        </div>

        <div>
          <label class="block text-sm font-medium mb-2">Custom Instructions</label>
          <textarea
            :value="modelValue.customInstructions"
            rows="4"
            class="w-full rounded-lg border border-neutral-200 p-2 bg-neutral-100 resize-none"
            placeholder="Set custom instructions to include in System Message. Default: none"
            @input="updateSettings('customInstructions', ($event.target as HTMLTextAreaElement).value)"
          />
        </div>

        <BaseSlider
          label="Temperature"
          v-model="modelValue.temperature"
          :min="0"
          :max="2"
          :step="0.1"
          @update:modelValue="updateSettings('temperature', $event)"
        />

        <BaseSlider
          label="Top P"
          v-model="modelValue.topP"
          :min="0"
          :max="1"
          :step="0.01"
          @update:modelValue="updateSettings('topP', $event)"
        />
      </div>
    </div>

    <!-- Chat Settings Section -->
    <div class="mb-4">
      <BaseButton 
        :expanded="expandedSections.chat"
        @click="toggleSection('chat')"
      >
        Chat Settings
      </BaseButton>
      <div v-show="expandedSections.chat" class="mt-2">
        <BaseToggle
          label="Stream Response"
          v-model="modelValue.stream"
          @update:modelValue="updateSettings('stream', $event)"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'
import type { ChatSettings } from '~/composables/useChat'

const props = defineProps<{
  modelValue: ChatSettings
}>()

const emit = defineEmits<{
  'update:modelValue': [settings: ChatSettings]
}>()

const expandedSections = ref({
  models: true,
  parameters: true,
  chat: true
})

const toggleSection = (section: keyof typeof expandedSections.value) => {
  expandedSections.value[section] = !expandedSections.value[section]
}

const updateSettings = <K extends keyof ChatSettings>(key: K, value: ChatSettings[K]) => {
  emit('update:modelValue', {
    ...props.modelValue,
    [key]: value
  })
}
</script>

<style scoped>
.overflow-y-auto {
  scrollbar-width: thin;
  scrollbar-color: #E5E7EB transparent;
}

.overflow-y-auto::-webkit-scrollbar {
  width: 6px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  background: transparent;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background-color: #E5E7EB;
  border-radius: 3px;
}
</style>