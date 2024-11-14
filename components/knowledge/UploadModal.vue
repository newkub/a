<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
    <div class="bg-white rounded-xl p-6 w-full max-w-lg">
      <div class="flex items-center justify-between mb-6">
        <h2 class="text-lg font-semibold">Upload Document</h2>
        <button class="text-neutral-500 hover:text-neutral-700" @click="$emit('close')">
          <Icon icon="mdi:close" class="text-xl" />
        </button>
      </div>

      <div class="space-y-4">
        <!-- File Upload -->
        <div
          class="border-2 border-dashed border-neutral-200 rounded-lg p-8 text-center hover:border-primary-500 transition-colors"
          @dragover.prevent
          @drop.prevent="handleDrop"
        >
          <div class="mb-4">
            <Icon icon="mdi:cloud-upload" class="text-4xl text-neutral-400" />
          </div>
          <p class="text-neutral-600 mb-2">
            Drag and drop files here or
            <button class="text-primary-500 hover:text-primary-600" @click="triggerFileInput">
              browse
            </button>
          </p>
          <p class="text-sm text-neutral-500">
            Supported formats: PDF, TXT, DOCX, HTML
          </p>
          <input
            ref="fileInput"
            type="file"
            class="hidden"
            accept=".pdf,.txt,.docx,.html"
            @change="handleFileSelect"
          />
        </div>

        <!-- URL Input -->
        <div>
          <label class="block text-sm font-medium mb-2">Or import from URL</label>
          <div class="flex gap-2">
            <input
              v-model="url"
              type="url"
              placeholder="https://"
              class="flex-1 rounded-lg border border-neutral-200 p-2"
            />
            <button class="btn-secondary" :disabled="!url" @click="handleUrlImport">
              Import
            </button>
          </div>
        </div>

        <!-- Upload Progress -->
        <div v-if="uploading" class="bg-neutral-50 rounded-lg p-4">
          <div class="flex items-center justify-between mb-2">
            <span class="text-sm font-medium">Uploading...</span>
            <span class="text-sm text-neutral-500">{{ progress }}%</span>
          </div>
          <div class="w-full h-2 bg-neutral-200 rounded-full overflow-hidden">
            <div
              class="h-full bg-primary-500 rounded-full transition-all duration-300"
              :style="{ width: `${progress}%` }"
            />
          </div>
        </div>
      </div>

      <div class="flex justify-end gap-3 mt-6">
        <button class="btn-ghost" @click="$emit('close')">
          Cancel
        </button>
        <button
          class="btn-primary"
          :disabled="!canUpload"
          @click="handleUpload"
        >
          Upload
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'

const emit = defineEmits<{
  close: []
  upload: [document: any]
}>()

const fileInput = ref<HTMLInputElement>()
const url = ref('')
const uploading = ref(false)
const progress = ref(0)

const canUpload = computed(() => {
  return url.value || (fileInput.value?.files && fileInput.value.files.length > 0)
})

const triggerFileInput = () => {
  fileInput.value?.click()
}

const handleFileSelect = (event: Event) => {
  const input = event.target as HTMLInputElement
  if (input.files?.length) {
    // Handle file selection
  }
}

const handleDrop = (event: DragEvent) => {
  const files = event.dataTransfer?.files
  if (files?.length) {
    // Handle dropped files
  }
}

const handleUrlImport = () => {
  // Handle URL import
}

const handleUpload = () => {
  uploading.value = true
  
  // Simulate upload progress
  const interval = setInterval(() => {
    progress.value += 10
    if (progress.value >= 100) {
      clearInterval(interval)
      uploading.value = false
      
      // Simulate successful upload
      emit('upload', {
        id: Date.now().toString(),
        title: 'New Document',
        type: 'text',
        content: '',
        metadata: {
          source: url.value,
          dateAdded: new Date(),
          lastModified: new Date(),
          tags: [],
          chunks: 0,
          embedding: 'ada-002'
        },
        training: {
          enabled: true,
          priority: 2,
          chunkSize: 512,
          overlap: 50,
          quality: 'medium'
        }
      })
    }
  }, 300)
}
</script>