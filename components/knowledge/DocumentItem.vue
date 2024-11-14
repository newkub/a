<template>
  <div class="flex items-start space-x-4 p-4 hover:bg-gray-50 rounded-lg">
    <span :class="['text-2xl text-gray-400', getFileIcon(type)]" />
    <div class="flex-grow">
      <div class="flex justify-between">
        <div>
          <h3 class="font-medium">{{ title }}</h3>
          <p class="text-sm text-gray-600">{{ description }}</p>
        </div>
        <span :class="getStatusBadgeClass(status)">{{ status }}</span>
      </div>
      <div class="flex items-center space-x-4 mt-2 text-sm text-gray-500">
        <span>{{ size }}</span>
        <span>{{ date }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  title: string
  description: string
  type: 'pdf' | 'txt' | 'html'
  status: 'trained' | 'pending' | 'failed'
  size: string
  date: string
}

defineProps<Props>()

const getFileIcon = (type: string) => {
  const icons = {
    pdf: 'i-mdi-file-pdf',
    txt: 'i-mdi-file-document',
    html: 'i-mdi-language-html5'
  }
  return icons[type as keyof typeof icons]
}

const getStatusBadgeClass = (status: string) => {
  const classes = {
    trained: 'badge-primary',
    pending: 'badge-neutral',
    failed: 'badge-error'
  }
  return ['badge', classes[status as keyof typeof classes]]
}
</script>