<template>
  <div class="p-8">
    <div class="flex justify-between items-center mb-6">
      <div>
        <h1 class="text-2xl font-bold mb-2">Knowledge Base</h1>
        <p class="text-gray-600">Manage your training data and RAG configurations</p>
      </div>
      <button class="btn-primary">
        <span class="i-mdi-plus mr-2" />
        Add Documents
      </button>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <BaseStats
        title="Total Documents"
        value="156"
        icon="i-mdi-file-document"
      />
      <BaseStats
        title="Trained Documents"
        value="143"
        icon="i-mdi-check-circle"
      />
      <BaseStats
        title="Storage Used"
        value="2.3 GB"
        icon="i-mdi-database"
      />
    </div>

    <div class="flex gap-4 mb-6">
      <div class="flex-grow">
        <BaseSearch
          v-model="searchQuery"
          placeholder="Search documents..."
        />
      </div>
      <select class="input-primary w-40">
        <option>All Status</option>
      </select>
      <select class="input-primary w-40">
        <option>All Types</option>
      </select>
      <button class="btn-ghost">
        <span class="i-mdi-filter-variant" />
      </button>
    </div>

    <BaseCard>
      <div class="p-6 space-y-4">
        <DocumentItem
          v-for="doc in documents"
          :key="doc.title"
          v-bind="doc"
        />
      </div>
    </BaseCard>
  </div>
</template>

<script setup lang="ts">
const searchQuery = ref('')

const documents = [
  {
    title: 'Product Documentation.pdf',
    description: 'Technical documentation for the product API',
    type: 'pdf',
    status: 'trained',
    size: '2.3 MB',
    date: '2024-03-15'
  },
  {
    title: 'User Research.txt',
    description: 'User interview transcripts and findings',
    type: 'txt',
    status: 'pending',
    size: '156 KB',
    date: '2024-03-14'
  },
  {
    title: 'Knowledge Base Export.html',
    description: 'Exported knowledge base articles',
    type: 'html',
    status: 'failed',
    size: '1.1 MB',
    date: '2024-03-13'
  }
] as const
</script>