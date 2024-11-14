<template>
  <div class="relative">
    <textarea
      ref="inputRef"
      v-model="inputValue"
      rows="3"
      class="w-full bg-neutral-50 rounded-xl px-4 py-4 text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-base resize-none overflow-y-auto"
      :class="{ 'opacity-50': disabled }"
      placeholder="Type a message... (Enter to send, Shift + Enter for new line)"
      @keydown="handleKeydown"
      :disabled="disabled"
    />
    
    <div class="absolute right-2 top-4 flex items-center gap-2">
      <button
        class="p-2 rounded-lg transition-colors disabled:opacity-50 disabled:hover:bg-transparent"
        :class="[
          hasContent ? 'text-primary-600 hover:text-primary-700' : 'text-neutral-400 hover:text-primary-base',
          'hover:bg-neutral-100'
        ]"
        :disabled="!canSend"
        @click="sendMessage"
      >
        <Icon 
          :icon="loading ? 'mdi:loading' : 'mdi:send'" 
          class="text-xl"
          :class="{ 'animate-spin': loading }"
        />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'

const props = defineProps<{
  modelValue: string
  loading?: boolean
  disabled?: boolean
  hasContent?: boolean
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
  'send': [message: string]
}>()

const inputRef = ref<HTMLTextAreaElement>()
const inputValue = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})

const canSend = computed(() => 
  inputValue.value.trim().length > 0 && !props.loading && !props.disabled
)

const handleKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Enter' && !event.shiftKey) {
    event.preventDefault()
    sendMessage()
  }
}

const sendMessage = () => {
  if (!canSend.value) return
  emit('send', inputValue.value.trim())
  inputValue.value = ''
}

onMounted(() => {
  if (inputRef.value) {
    inputRef.value.focus()
  }
})
</script>

<style scoped>
textarea {
  min-height: 96px;
  max-height: 400px;
  line-height: 1.5;
}

textarea::-webkit-scrollbar {
  width: 4px;
}

textarea::-webkit-scrollbar-track {
  background: transparent;
}

textarea::-webkit-scrollbar-thumb {
  background-color: #E5E7EB;
  border-radius: 2px;
}

textarea {
  scrollbar-width: thin;
  scrollbar-color: #E5E7EB transparent;
}
</style>