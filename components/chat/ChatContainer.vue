<template>
  <div class="flex flex-col h-full">
    <div class="flex-1 overflow-y-auto min-h-0">
      <ChatMessageList 
        :messages="messages"
        :selected-model="selectedModel"
      />
    </div>
    <div class="flex-shrink-0 p-4 border-t border-neutral-200">
      <ChatNavBar
        :active-item="activeNavItem"
        :has-image="pastedImage !== null"
        @select="handleNavSelect"
        @remove-image="handleRemoveImage"
        class="mb-4"
      />
      <ChatInput
        v-model="inputMessage"
        :loading="isLoading"
        :has-content="!!inputMessage.trim()"
        @send="handleSend"
        @paste-image="handleImagePaste"
      />
    </div>
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

const emit = defineEmits<{
  'update:messages': [messages: Message[]]
}>()

const inputMessage = ref('')
const isLoading = ref(false)
const activeNavItem = ref('enhance')
const pastedImage = ref<File | null>(null)

const handleNavSelect = (id: string) => {
  activeNavItem.value = id
}

const handleImagePaste = (file: File) => {
  pastedImage.value = file
  activeNavItem.value = 'file'
}

const handleRemoveImage = () => {
  pastedImage.value = null
  activeNavItem.value = 'enhance'
}

const handleSend = async (content: string) => {
  const newMessages = [...props.messages]
  
  newMessages.push({
    id: Date.now().toString(),
    role: 'user',
    content
  })

  emit('update:messages', newMessages)

  isLoading.value = true
  try {
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    newMessages.push({
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      content: `I understand you said: "${content}". This is a demo response.`
    })
    
    emit('update:messages', newMessages)
  } finally {
    isLoading.value = false
  }
}
</script>