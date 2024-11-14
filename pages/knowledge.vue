<template>
  <div class="min-h-screen bg-background p-6">
    <!-- Header -->
    <div class="flex items-center justify-between mb-8">
      <div>
        <h1 class="text-2xl font-bold">Knowledge Base</h1>
        <p class="text-neutral-600">Manage your training data and RAG configurations</p>
      </div>
      <button class="btn-primary" @click="showUploadModal = true">
        <Icon icon="mdi:plus" class="btn-icon" />
        Add Documents
      </button>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-4 gap-6">
      <!-- Main Content Area -->
      <div class="lg:col-span-3 space-y-6">
        <!-- Stats -->
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div class="bg-white p-4 rounded-xl border border-neutral-200">
            <div class="flex items-center justify-between mb-2">
              <h3 class="text-neutral-600">Total Documents</h3>
              <Icon icon="mdi:file-document" class="text-2xl text-primary-500" />
            </div>
            <p class="text-2xl font-semibold">{{ stats.totalDocuments }}</p>
          </div>
          
          <div class="bg-white p-4 rounded-xl border border-neutral-200">
            <div class="flex items-center justify-between mb-2">
              <h3 class="text-neutral-600">Trained Documents</h3>
              <Icon icon="mdi:check-circle" class="text-2xl text-success-500" />
            </div>
            <p class="text-2xl font-semibold">{{ stats.trainedDocuments }}</p>
          </div>
          
          <div class="bg-white p-4 rounded-xl border border-neutral-200">
            <div class="flex items-center justify-between mb-2">
              <h3 class="text-neutral-600">Storage Used</h3>
              <Icon icon="mdi:database" class="text-2xl text-warning-500" />
            </div>
            <p class="text-2xl font-semibold">{{ stats.storageUsed }}</p>
          </div>
        </div>

        <!-- Document List -->
        <div class="bg-white rounded-xl border border-neutral-200">
          <!-- Filters -->
          <div class="p-4 border-b border-neutral-200">
            <div class="flex items-center gap-4">
              <div class="relative flex-1">
                <Icon icon="mdi:magnify" class="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
                <input
                  v-model="filters.search"
                  type="text"
                  placeholder="Search documents..."
                  class="w-full pl-10 pr-4 py-2 rounded-lg border border-neutral-200"
                />
              </div>
              <select
                v-model="filters.status"
                class="rounded-lg border border-neutral-200 px-4 py-2"
              >
                <option value="">All Status</option>
                <option value="trained">Trained</option>
                <option value="pending">Pending</option>
                <option value="failed">Failed</option>
              </select>
              <select
                v-model="filters.type"
                class="rounded-lg border border-neutral-200 px-4 py-2"
              >
                <option value="">All Types</option>
                <option value="pdf">PDF</option>
                <option value="text">Text</option>
                <option value="webpage">Webpage</option>
              </select>
              <button class="p-2 text-neutral-600 hover:text-primary-600 rounded-lg border border-neutral-200">
                <Icon icon="mdi:filter-variant" class="text-lg" />
              </button>
            </div>
          </div>

          <!-- Document Grid -->
          <div class="p-4">
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div v-for="doc in filteredDocuments" :key="doc.id"
                class="p-4 rounded-lg border border-neutral-200 hover:border-neutral-300 transition-colors">
                <div class="flex items-start gap-3">
                  <div class="w-10 h-10 rounded-lg bg-neutral-100 flex items-center justify-center flex-shrink-0">
                    <Icon :icon="getDocumentIcon(doc.type)" class="text-xl text-neutral-600" />
                  </div>
                  <div class="flex-1 min-w-0">
                    <div class="flex items-center justify-between gap-2 mb-1">
                      <h3 class="font-medium truncate">{{ doc.name }}</h3>
                      <Badge :variant="getStatusVariant(doc.status)">
                        {{ doc.status }}
                      </Badge>
                    </div>
                    <p class="text-sm text-neutral-600 mb-2">{{ doc.description }}</p>
                    <div class="flex items-center gap-4 text-sm text-neutral-500">
                      <span>{{ doc.size }}</span>
                      <span>{{ doc.date }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Configuration Sidebar -->
      <div class="bg-white rounded-xl border border-neutral-200 h-fit p-4">
        <h2 class="text-lg font-semibold mb-4">RAG Configuration</h2>
        
        <div class="space-y-4">
          <!-- Embedding Model -->
          <div>
            <label class="block text-sm font-medium mb-2">Embedding Model</label>
            <select v-model="config.embeddingModel" class="w-full rounded-lg border border-neutral-200 p-2">
              <option value="openai">OpenAI Ada 002</option>
              <option value="cohere">Cohere Embed</option>
              <option value="local">Local FastEmbed</option>
            </select>
          </div>

          <!-- Chunk Size -->
          <div>
            <label class="block text-sm font-medium mb-2">Chunk Size</label>
            <input
              v-model="config.chunkSize"
              type="number"
              class="w-full rounded-lg border border-neutral-200 p-2"
            />
          </div>

          <!-- Chunk Overlap -->
          <div>
            <label class="block text-sm font-medium mb-2">Chunk Overlap</label>
            <input
              v-model="config.chunkOverlap"
              type="number"
              class="w-full rounded-lg border border-neutral-200 p-2"
            />
          </div>

          <!-- Vector Store -->
          <div>
            <label class="block text-sm font-medium mb-2">Vector Store</label>
            <select v-model="config.vectorStore" class="w-full rounded-lg border border-neutral-200 p-2">
              <option value="pinecone">Pinecone</option>
              <option value="qdrant">Qdrant</option>
              <option value="local">Local FAISS</option>
            </select>
          </div>

          <!-- Similarity Search -->
          <div>
            <label class="block text-sm font-medium mb-2">Similarity Search</label>
            <select v-model="config.similaritySearch" class="w-full rounded-lg border border-neutral-200 p-2">
              <option value="cosine">Cosine Similarity</option>
              <option value="euclidean">Euclidean Distance</option>
              <option value="dot">Dot Product</option>
            </select>
          </div>

          <button class="w-full btn-primary">
            Save Configuration
          </button>
        </div>
      </div>
    </div>

    <!-- Upload Modal -->
    <div v-if="showUploadModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div class="bg-white rounded-xl p-6 w-full max-w-lg">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-semibold">Upload Documents</h3>
          <button class="text-neutral-600 hover:text-neutral-900" @click="showUploadModal = false">
            <Icon icon="mdi:close" class="text-xl" />
          </button>
        </div>

        <div class="space-y-4">
          <div class="border-2 border-dashed border-neutral-200 rounded-lg p-8 text-center">
            <Icon icon="mdi:cloud-upload" class="text-4xl text-neutral-400 mb-2" />
            <p class="text-neutral-600 mb-2">Drag and drop files here or click to browse</p>
            <p class="text-sm text-neutral-500">Supported formats: PDF, TXT, DOCX, HTML</p>
          </div>

          <div v-if="uploadQueue.length > 0" class="space-y-2">
            <div v-for="file in uploadQueue" :key="file.id"
              class="flex items-center gap-3 p-3 bg-neutral-50 rounded-lg">
              <Icon :icon="getDocumentIcon(file.type)" class="text-lg text-neutral-600" />
              <div class="flex-1 min-w-0">
                <div class="flex items-center justify-between gap-2">
                  <span class="font-medium truncate">{{ file.name }}</span>
                  <span class="text-sm text-neutral-500">{{ file.size }}</span>
                </div>
                <div class="w-full h-1 bg-neutral-200 rounded-full mt-2">
                  <div
                    class="h-full bg-primary-500 rounded-full"
                    :style="{ width: `${file.progress}%` }"
                  />
                </div>
              </div>
              <button class="text-neutral-400 hover:text-error-600">
                <Icon icon="mdi:close" class="text-lg" />
              </button>
            </div>
          </div>

          <div class="flex justify-end gap-3">
            <button
              class="btn-ghost"
              @click="showUploadModal = false"
            >
              Cancel
            </button>
            <button class="btn-primary">
              Upload Files
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'

const showUploadModal = ref(false)

const stats = reactive({
  totalDocuments: 156,
  trainedDocuments: 143,
  storageUsed: '2.3 GB'
})

const filters = reactive({
  search: '',
  status: '',
  type: ''
})

const config = reactive({
  embeddingModel: 'openai',
  chunkSize: 512,
  chunkOverlap: 50,
  vectorStore: 'pinecone',
  similaritySearch: 'cosine'
})

const documents = ref([
  {
    id: 1,
    name: 'Product Documentation.pdf',
    description: 'Technical documentation for the product API',
    type: 'pdf',
    size: '2.3 MB',
    date: '2024-03-15',
    status: 'trained'
  },
  {
    id: 2,
    name: 'User Research.txt',
    description: 'User interview transcripts and findings',
    type: 'text',
    size: '156 KB',
    date: '2024-03-14',
    status: 'pending'
  },
  {
    id: 3,
    name: 'Knowledge Base Export.html',
    description: 'Exported knowledge base articles',
    type: 'webpage',
    size: '1.1 MB',
    date: '2024-03-13',
    status: 'failed'
  }
])

const uploadQueue = ref([
  {
    id: 1,
    name: 'Design System.pdf',
    type: 'pdf',
    size: '3.2 MB',
    progress: 65
  },
  {
    id: 2,
    name: 'API Reference.txt',
    type: 'text',
    size: '256 KB',
    progress: 30
  }
])

const filteredDocuments = computed(() => {
  return documents.value.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(filters.search.toLowerCase()) ||
      doc.description.toLowerCase().includes(filters.search.toLowerCase())
    const matchesStatus = !filters.status || doc.status === filters.status
    const matchesType = !filters.type || doc.type === filters.type
    return matchesSearch && matchesStatus && matchesType
  })
})

const getDocumentIcon = (type: string) => {
  switch (type) {
    case 'pdf':
      return 'mdi:file-pdf-box'
    case 'text':
      return 'mdi:file-document'
    case 'webpage':
      return 'mdi:web'
    default:
      return 'mdi:file'
  }
}

const getStatusVariant = (status: string) => {
  switch (status) {
    case 'trained':
      return 'success'
    case 'pending':
      return 'warning'
    case 'failed':
      return 'error'
    default:
      return 'neutral'
  }
}
</script>