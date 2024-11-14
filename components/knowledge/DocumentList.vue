<template>
  <div class="space-y-2">
    <button
      v-for="doc in documents"
      :key="doc.id"
      class="w-full p-3 rounded-lg text-left hover:bg-neutral-50 transition-colors"
      :class="selectedId === doc.id ? 'bg-neutral-100' : ''"
      @click="$emit('select', doc.id)"
    >
      <div class="flex items-start gap-3">
        <div class="mt-0.5">
          <Icon
            :icon="
              doc.type === 'pdf' ? 'mdi:file-pdf-box' :
              doc.type === 'webpage' ? 'mdi:web' :
              'mdi:file-document-outline'
            "
            class="text-xl text-neutral-500"
          />
        </div>
        <div class="flex-1 min-w-0">
          <div class="font-medium truncate">{{ doc.title }}</div>
          <div class="flex items-center gap-2 mt-1">
            <Badge
              :variant="doc.training.enabled ? 'success' : 'neutral'"
              class="text-xs"
            >
              {{ doc.training.enabled ? 'Training' : 'Disabled' }}
            </Badge>
            <span class="text-xs text-neutral-500">
              {{ formatDate(doc.metadata.lastModified) }}
            </span>
          </div>
          <div class="flex flex-wrap gap-1 mt-2">
            <Badge
              v-for="tag in doc.metadata.tags"
              :key="tag"
              variant="neutral"
              class="text-xs"
            >
              {{ tag }}
            </Badge>
          </div>
        </div>
      </div>
    </button>
  </div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'

const props = defineProps<{
  documents: Array<{
    id: string
    title: string
    type: string
    metadata: {
      lastModified: Date
      tags: string[]
    }
    training: {
      enabled: boolean
    }
  }>
  selectedId?: string
}>()

defineEmits<{
  select: [id: string]
}>()

const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  }).format(date)
}
</script>