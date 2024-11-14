<template>
  <div>
    <div class="flex items-center justify-between mb-2">
      <div class="flex items-center gap-2">
        <div class="w-8 h-8 rounded-lg flex items-center justify-center">
          <template v-if="provider === 'anthropic'">
            <img src="https://avatars.githubusercontent.com/u/49760167?s=200&v=4" class="w-6 h-6 rounded" />
          </template>
          <template v-else>
            <Icon icon="simple-icons:openai" class="text-xl" />
          </template>
        </div>
        <span class="text-lg">{{ providerName }}</span>
      </div>
      <div class="flex items-center gap-1">
        <button class="p-1.5 hover:bg-neutral-100 rounded-lg">
          <Icon icon="mdi:cog" class="text-lg text-neutral-500" />
        </button>
        <button class="p-1.5 hover:bg-neutral-100 rounded-lg">
          <Icon icon="mdi:chevron-up" class="text-lg text-neutral-500" />
        </button>
      </div>
    </div>
    <div class="space-y-1 pl-10">
      <button 
        v-for="model in models" 
        :key="model.id"
        class="w-full text-left py-2 px-3 rounded-lg hover:bg-neutral-100 transition-colors"
        :class="selectedModel === model.id ? 'bg-neutral-100' : ''"
        @click="$emit('select', model.id)"
      >
        {{ model.name }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'

const props = defineProps<{
  provider: 'anthropic' | 'openai'
  models: Array<{ id: string; name: string }>
  selectedModel: string
}>()

const providerName = computed(() => 
  props.provider === 'anthropic' ? 'Anthropic' : 'OpenAI'
)

defineEmits<{
  select: [modelId: string]
}>()
</script>