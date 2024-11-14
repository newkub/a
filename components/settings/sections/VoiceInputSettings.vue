<template>
  <div class="space-y-6">
    <!-- Voice Recognition -->
    <div class="p-6 bg-neutral-50 rounded-xl border border-neutral-200">
      <div class="flex items-center justify-between mb-4">
        <div>
          <h2 class="text-lg font-semibold">Voice Recognition</h2>
          <p class="text-sm text-neutral-600">Configure voice input settings and language preferences</p>
        </div>
        <BaseToggle
          label="Enable Voice Input"
          v-model="settings.enabled"
        />
      </div>

      <div v-if="settings.enabled" class="space-y-6">
        <!-- Language Settings -->
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium mb-2">Primary Language</label>
            <select v-model="settings.primaryLanguage" class="w-full rounded-lg border border-neutral-200 p-2">
              <option v-for="lang in languages" :key="lang.code" :value="lang.code">
                {{ lang.name }}
              </option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium mb-2">Secondary Language</label>
            <select v-model="settings.secondaryLanguage" class="w-full rounded-lg border border-neutral-200 p-2">
              <option value="">None</option>
              <option v-for="lang in languages" :key="lang.code" :value="lang.code">
                {{ lang.name }}
              </option>
            </select>
          </div>
        </div>

        <!-- Voice Model Settings -->
        <div>
          <label class="block text-sm font-medium mb-2">Voice Recognition Model</label>
          <select v-model="settings.model" class="w-full rounded-lg border border-neutral-200 p-2">
            <option v-for="model in voiceModels" :key="model.id" :value="model.id">
              {{ model.name }} - {{ model.description }}
            </option>
          </select>
        </div>

        <!-- Voice Parameters -->
        <div class="space-y-4">
          <BaseSlider
            label="Speech Recognition Speed"
            v-model="settings.speed"
            :min="0.5"
            :max="2"
            :step="0.1"
            showInfo
          />
          <BaseSlider
            label="Recognition Sensitivity"
            v-model="settings.sensitivity"
            :min="0"
            :max="100"
            :step="1"
            showInfo
          />
        </div>

        <!-- Microphone Settings -->
        <div>
          <label class="block text-sm font-medium mb-2">Input Device</label>
          <select v-model="settings.inputDevice" class="w-full rounded-lg border border-neutral-200 p-2">
            <option v-for="device in audioDevices" :key="device.id" :value="device.id">
              {{ device.name }}
            </option>
          </select>
        </div>

        <!-- Advanced Settings -->
        <div class="space-y-3">
          <BaseToggle
            label="Background Noise Reduction"
            v-model="settings.noiseReduction"
          />
          <BaseToggle
            label="Auto-Punctuation"
            v-model="settings.autoPunctuation"
          />
          <BaseToggle
            label="Profanity Filter"
            v-model="settings.profanityFilter"
          />
        </div>

        <!-- Wake Word Settings -->
        <div>
          <label class="block text-sm font-medium mb-2">Wake Word / Phrase</label>
          <div class="flex gap-2">
            <input
              v-model="settings.wakeWord"
              type="text"
              class="flex-1 rounded-lg border border-neutral-200 p-2"
              placeholder="Hey Assistant"
            />
            <button class="btn-primary">
              Train Wake Word
            </button>
          </div>
          <p class="text-sm text-neutral-600 mt-1">
            Speak this phrase to activate voice input
          </p>
        </div>
      </div>
    </div>

    <!-- Voice Commands -->
    <div class="p-6 bg-neutral-50 rounded-xl border border-neutral-200">
      <h2 class="text-lg font-semibold mb-4">Voice Commands</h2>
      <div class="space-y-3">
        <div v-for="command in voiceCommands" :key="command.id"
          class="flex items-center justify-between p-3 bg-white rounded-lg border border-neutral-200">
          <div>
            <div class="font-medium">{{ command.name }}</div>
            <div class="text-sm text-neutral-600">{{ command.description }}</div>
            <div class="text-xs text-neutral-500 mt-1">
              Trigger: "{{ command.phrase }}"
            </div>
          </div>
          <div class="flex items-center gap-2">
            <button class="btn-ghost p-2 hover:text-primary-600">
              <Icon icon="mdi:pencil" class="text-lg" />
            </button>
            <BaseToggle
              v-model="command.enabled"
              :label="''"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'

const settings = reactive({
  enabled: false,
  primaryLanguage: 'en-US',
  secondaryLanguage: '',
  model: 'enhanced',
  speed: 1,
  sensitivity: 75,
  inputDevice: 'default',
  noiseReduction: true,
  autoPunctuation: true,
  profanityFilter: false,
  wakeWord: 'Hey Assistant'
})

const languages = [
  { code: 'en-US', name: 'English (US)' },
  { code: 'en-GB', name: 'English (UK)' },
  { code: 'es-ES', name: 'Spanish' },
  { code: 'fr-FR', name: 'French' },
  { code: 'de-DE', name: 'German' },
  { code: 'it-IT', name: 'Italian' },
  { code: 'pt-BR', name: 'Portuguese (Brazil)' },
  { code: 'ru-RU', name: 'Russian' },
  { code: 'ja-JP', name: 'Japanese' },
  { code: 'ko-KR', name: 'Korean' },
  { code: 'zh-CN', name: 'Chinese (Simplified)' },
  { code: 'zh-TW', name: 'Chinese (Traditional)' }
]

const voiceModels = [
  { id: 'basic', name: 'Basic', description: 'Fast, lightweight model' },
  { id: 'enhanced', name: 'Enhanced', description: 'Better accuracy, more resources' },
  { id: 'premium', name: 'Premium', description: 'Highest accuracy, all features' }
]

const audioDevices = [
  { id: 'default', name: 'System Default' },
  { id: 'built-in', name: 'Built-in Microphone' },
  { id: 'headset', name: 'Headset Microphone' }
]

const voiceCommands = reactive([
  {
    id: 1,
    name: 'New Chat',
    description: 'Start a new chat session',
    phrase: 'Start new chat',
    enabled: true
  },
  {
    id: 2,
    name: 'Clear Chat',
    description: 'Clear current chat history',
    phrase: 'Clear chat history',
    enabled: true
  },
  {
    id: 3,
    name: 'Switch Model',
    description: 'Change AI model',
    phrase: 'Switch to [model name]',
    enabled: true
  },
  {
    id: 4,
    name: 'Save Chat',
    description: 'Save current chat',
    phrase: 'Save this chat',
    enabled: true
  }
])
</script>