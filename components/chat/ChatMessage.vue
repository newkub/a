<template>
  <div class="flex gap-4" :class="message.role === 'user' ? 'flex-row-reverse' : ''">
    <ChatAvatar
      :role="message.role"
      :model="selectedModel"
    />
    <div class="flex-1 min-w-0">
      <div class="mb-2">
        <span class="font-medium text-sm">
          {{ message.role === 'assistant' ? 'Assistant' : 'You' }}
        </span>
      </div>
      <MessageBubble
        :variant="message.role === 'assistant' ? 'primary' : 'neutral'"
        :content="message.content"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  message: {
    role: 'user' | 'assistant'
    content: string
  }
  selectedModel?: string
}>()
</script>