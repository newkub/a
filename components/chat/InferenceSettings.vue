<template>
  <div class="border border-neutral-200 rounded-lg">
    <button
      class="w-full px-4 py-3 flex items-center justify-between"
      @click="isExpanded = !isExpanded"
    >
      <span class="font-medium">Inference Settings</span>
      <Icon
        :icon="isExpanded ? 'mdi:chevron-up' : 'mdi:chevron-down'"
        class="text-lg text-neutral-500"
      />
    </button>

    <div v-show="isExpanded" class="p-4 border-t border-neutral-200 space-y-4">
      <!-- Max Tokens -->
      <BaseSlider
        label="Max Tokens"
        :model-value="modelValue.maxTokens"
        :min="100"
        :max="8192"
        :step="1"
        showInfo
        showInput
        @update:model-value="updateSetting('maxTokens', $event)"
      />

      <!-- Temperature -->
      <BaseSlider
        label="Temperature"
        :model-value="modelValue.temperature"
        :min="0"
        :max="2"
        :step="0.1"
        showInfo
        showInput
        @update:model-value="updateSetting('temperature', $event)"
      />

      <!-- Top P -->
      <BaseSlider
        label="Top P"
        :model-value="modelValue.topP"
        :min="0"
        :max="1"
        :step="0.01"
        showInfo
        showInput
        @update:model-value="updateSetting('topP', $event)"
      />

      <!-- Stream Toggle -->
      <BaseToggle
        label="Stream Response"
        :model-value="modelValue.stream"
        @update:model-value="updateSetting('stream', $event)"
      />

      <!-- Stop Sequences -->
      <div class="space-y-2">
        <label class="block text-sm font-medium text-neutral-700">Stop Sequences</label>
        <textarea
          :value="modelValue.stop"
          rows="3"
          class="w-full rounded-lg border border-neutral-200 p-3 text-sm bg-neutral-50 resize-none"
          placeholder="Enter stop sequences (one per line)..."
          @input="updateSetting('stop', ($event.target as HTMLTextAreaElement).value)"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'
import type { ChatSettings } from '~/types/chat'

const props = defineProps<{
  modelValue: ChatSettings
}>()

const emit = defineEmits<{
  'update:modelValue': [value: ChatSettings]
}>()

const isExpanded = ref(true)

const updateSetting = <K extends keyof ChatSettings>(key: K, value: ChatSettings[K]) => {
  emit('update:modelValue', {
    ...props.modelValue,
    [key]: value
  })
}
</script>