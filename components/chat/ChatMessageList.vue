<template>
  <div class="p-6 h-full overflow-y-auto" ref="messagesRef">
    <div v-if="messages.length === 0" class="h-full flex items-center justify-center">
      <EmptyState />
    </div>
    
    <template v-else>
      <div v-for="msg in messages" :key="msg.id" class="mb-6 last:mb-0">
        <ChatMessage :message="msg" :selected-model="selectedModel" />
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
}

const props = defineProps<{
  selectedModel: string
  messages: Message[]
}>()

const messagesRef = ref<HTMLElement>()

const scrollToBottom = () => {
  nextTick(() => {
    if (messagesRef.value) {
      messagesRef.value.scrollTop = messagesRef.value.scrollHeight
    }
  })
}

watch(() => props.messages.length, scrollToBottom)

onMounted(scrollToBottom)
</script>

<style scoped>
.overflow-y-auto {
  scrollbar-width: thin;
  scrollbar-color: #E5E7EB transparent;
}

.overflow-y-auto::-webkit-scrollbar {
  width: 6px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  background: transparent;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background-color: #E5E7EB;
  border-radius: 3px;
}
</style>