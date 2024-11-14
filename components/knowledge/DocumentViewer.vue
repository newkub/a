<template>
  <div class="h-full flex flex-col">
    <!-- Header -->
    <div class="p-4 border-b border-neutral-200">
      <div class="flex items-center justify-between mb-4">
        <div class="flex items-center gap-3">
          <Icon
            :icon="
              document.type === 'pdf' ? 'mdi:file-pdf-box' :
              document.type === 'webpage' ? 'mdi:web' :
              'mdi:file-document-outline'
            "
            class="text-2xl text-neutral-500"
          />
          <input
            v-model="localDoc.title"
            type="text"
            class="text-lg font-semibold bg-transparent border-b border-transparent hover:border-neutral-200 focus:border-primary-500 focus:outline-none px-1"
          />
        </div>
        <div class="flex items-center gap-2">
          <button class="btn-secondary" @click="handleSave">
            <Icon icon="mdi:content-save" class="text-lg" />
            Save
          </button>
          <button class="btn-primary">
            <Icon icon="mdi:play" class="text-lg" />
            Process
          </button>
        </div>
      </div>

      <!-- Metadata -->
      <div class="flex items-center gap-4 text-sm">
        <div class="flex items-center gap-2">
          <Icon icon="mdi:link" class="text-neutral-500" />
          <input
            v-model="localDoc.metadata.source"
            type="text"
            class="bg-transparent border-b border-transparent hover:border-neutral-200 focus:border-primary-500 focus:outline-none"
            placeholder="Source URL or path"
          />
        </div>
        <div class="flex items-center gap-2">
          <Icon icon="mdi:tag-multiple" class="text-neutral-500" />
          <input
            v-model="tagInput"
            type="text"
            class="bg-transparent border-b border-transparent hover:border-neutral-200 focus:border-primary-500 focus:outline-none"
            placeholder="Add tags..."
            @keydown.enter="addTag"
          />
        </div>
        <div class="flex items-center gap-2">
          <Icon icon="mdi:cube-outline" class="text-neutral-500" />
          <span>{{ document.metadata.chunks }} chunks</span>
        </div>
      </div>
    </div>

    <!-- Content -->
    <div class="flex-1 p-4 overflow-y-auto">
      <textarea
        v-model="localDoc.content"
        class="w-full h-full resize-none bg-transparent focus:outline-none"
        placeholder="Enter or paste content here..."
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'

const props = defineProps<{
  document: {
    id: string
    title: string
    type: string
    content: string
    metadata: {
      source: string
      chunks: number
      tags: string[]
    }
  }
}>()

const emit = defineEmits<{
  update: [document: typeof props.document]
}>()

const localDoc = ref({ ...props.document })
const tagInput = ref('')

const addTag = () => {
  const tag = tagInput.value.trim()
  if (tag && !localDoc.value.metadata.tags.includes(tag)) {
    localDoc.value.metadata.tags.push(tag)
    tagInput.value = ''
  }
}

const handleSave = () => {
  emit('update', localDoc.value)
}

// Reset local doc when props change
watch(() => props.document, (newDoc) => {
  localDoc.value = { ...newDoc }
}, { deep: true })
</script>