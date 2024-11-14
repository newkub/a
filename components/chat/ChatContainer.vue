<template>
  <div class="flex flex-col h-full">
    <div class="flex-1 overflow-y-auto min-h-0" ref="messagesRef">
      <div v-if="!hasMessages" class="h-full flex items-center justify-center">
        <EmptyState />
      </div>
      
      <template v-else>
        <div v-for="msg in messages" :key="msg.id" class="mb-6 last:mb-0 px-6 py-4">
          <ChatMessage :message="msg" :selected-model="selectedModel" />
        </div>
      </template>
    </div>

    <div class="flex-shrink-0 p-4 border-t border-neutral-200">
      <ChatInput
        v-model="inputMessage"
        :loading="isLoading"
        :disabled="disabled"
        @send="handleSend"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  selectedModel: string
  disabled?: boolean
}>()

const {
  messages,
  isLoading,
  sendMessage,
  addWelcomeMessage
} = useChatStore()

const hasMessages = computed(() => messages.value.length > 0)
const inputMessage = ref('')
const messagesRef = ref<HTMLElement>()

const handleSend = async (content: string) => {
  await sendMessage(content)
  inputMessage.value = ''
  scrollToBottom()
}

const scrollToBottom = () => {
  nextTick(() => {
    if (messagesRef.value) {
      messagesRef.value.scrollTop = messagesRef.value.scrollHeight
    }
  })
}

watch(() => messages.value.length, scrollToBottom)

onMounted(() => {
  if (messages.value.length === 0) {
    addWelcomeMessage()
  }
  scrollToBottom()
})
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