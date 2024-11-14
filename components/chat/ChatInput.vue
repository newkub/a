<template>
  <div class="relative">
    <textarea
      ref="inputRef"
      v-model="inputValue"
      rows="3"
      class="w-full bg-neutral-50 rounded-xl px-4 py-4 text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-base resize-none overflow-y-auto"
      :class="{ 'opacity-50': disabled }"
      placeholder="Type a message... (Enter to send, Shift + Enter for new line)"
      @input="handleInput"
      @keydown="handleKeydown"
      @paste="handlePaste"
      :disabled="disabled"
    />
    
    <!-- Slash Commands Menu -->
    <div v-if="showSlashCommands && inputValue.endsWith('/')" 
      class="absolute bottom-full left-0 mb-2 w-64 bg-white rounded-lg shadow-lg border border-neutral-200 max-h-64 overflow-y-auto">
      <div class="p-2">
        <div v-for="command in filteredCommands" 
          :key="command.id"
          class="flex items-center gap-2 p-2 hover:bg-neutral-50 rounded-lg cursor-pointer"
          @click="selectCommand(command)"
        >
          <Icon :icon="command.icon" class="text-lg text-neutral-600" />
          <div>
            <div class="font-medium">{{ command.label }}</div>
            <div class="text-xs text-neutral-500">{{ command.description }}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Mention Menu -->
    <div v-if="showMentions && inputValue.endsWith('@')"
      class="absolute bottom-full left-0 mb-2 w-64 bg-white rounded-lg shadow-lg border border-neutral-200 max-h-64 overflow-y-auto">
      <div class="p-2">
        <div v-for="user in filteredUsers" 
          :key="user.id"
          class="flex items-center gap-2 p-2 hover:bg-neutral-50 rounded-lg cursor-pointer"
          @click="selectUser(user)"
        >
          <div class="w-8 h-8 rounded-full bg-neutral-100 flex items-center justify-center">
            <Icon icon="mdi:account" class="text-lg text-neutral-600" />
          </div>
          <div>
            <div class="font-medium">{{ user.name }}</div>
            <div class="text-xs text-neutral-500">{{ user.role }}</div>
          </div>
        </div>
      </div>
    </div>
    
    <div class="absolute right-2 top-4 flex items-center gap-2">
      <button
        class="p-2 rounded-lg text-neutral-400 hover:text-primary-base hover:bg-neutral-100 transition-colors"
        title="Voice input"
        @click="handleVoiceInput"
      >
        <Icon icon="mdi:microphone" class="text-xl" />
      </button>
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
import { ref, computed } from 'vue'
import { onClickOutside } from '@vueuse/core'

const props = withDefaults(defineProps<{
  modelValue: string
  loading?: boolean
  disabled?: boolean
  hasContent?: boolean
}>(), {
  loading: false,
  disabled: false,
  hasContent: false
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
  'send': [message: string]
  'paste-image': [file: File]
}>()

const inputRef = ref<HTMLTextAreaElement>()
const inputValue = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})

const showSlashCommands = ref(false)
const showMentions = ref(false)
const commandSearch = ref('')
const mentionSearch = ref('')

const commands = [
  { id: 'translate', label: 'Translate', icon: 'mdi:translate', description: 'Translate text to another language' },
  { id: 'enhance', label: 'Enhance', icon: 'mdi:lightbulb', description: 'Enhance your writing' },
  { id: 'summarize', label: 'Summarize', icon: 'mdi:text', description: 'Create a summary' }
]

const users = [
  { id: '1', name: 'John Doe', role: 'Developer' },
  { id: '2', name: 'Jane Smith', role: 'Designer' },
  { id: '3', name: 'Bob Johnson', role: 'Manager' }
]

const filteredCommands = computed(() => {
  if (!commandSearch.value) return commands
  return commands.filter(cmd => 
    cmd.label.toLowerCase().includes(commandSearch.value.toLowerCase()) ||
    cmd.description.toLowerCase().includes(commandSearch.value.toLowerCase())
  )
})

const filteredUsers = computed(() => {
  if (!mentionSearch.value) return users
  return users.filter(user => 
    user.name.toLowerCase().includes(mentionSearch.value.toLowerCase()) ||
    user.role.toLowerCase().includes(mentionSearch.value.toLowerCase())
  )
})

const canSend = computed(() => 
  inputValue.value.trim().length > 0 && !props.loading && !props.disabled
)

const handleInput = (event: Event) => {
  const target = event.target as HTMLTextAreaElement
  const value = target.value
  const lastChar = value[value.length - 1]
  
  if (lastChar === '/') {
    showSlashCommands.value = true
    showMentions.value = false
    commandSearch.value = ''
  } else if (lastChar === '@') {
    showMentions.value = true
    showSlashCommands.value = false
    mentionSearch.value = ''
  } else {
    showSlashCommands.value = false
    showMentions.value = false
  }
  
  adjustHeight()
}

const selectCommand = (command: typeof commands[0]) => {
  const text = inputValue.value
  const lastSlashIndex = text.lastIndexOf('/')
  inputValue.value = text.slice(0, lastSlashIndex) + `/${command.label} `
  showSlashCommands.value = false
}

const selectUser = (user: typeof users[0]) => {
  const text = inputValue.value
  const lastMentionIndex = text.lastIndexOf('@')
  inputValue.value = text.slice(0, lastMentionIndex) + `@${user.name} `
  showMentions.value = false
}

const adjustHeight = () => {
  if (!inputRef.value) return
  
  inputRef.value.style.height = 'auto'
  const minHeight = 96
  const newHeight = Math.max(minHeight, inputRef.value.scrollHeight)
  inputRef.value.style.height = `${newHeight}px`
}

const handleKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Enter' && !event.shiftKey) {
    event.preventDefault()
    sendMessage()
  } else if (event.key === 'Enter' && event.shiftKey) {
    nextTick(() => {
      adjustHeight()
    })
  } else if (event.key === 'Escape') {
    showSlashCommands.value = false
    showMentions.value = false
  }
}

const handlePaste = (event: ClipboardEvent) => {
  const items = event.clipboardData?.items
  if (!items) return

  for (const item of items) {
    if (item.type.startsWith('image/')) {
      const file = item.getAsFile()
      if (file) {
        event.preventDefault()
        emit('paste-image', file)
      }
    }
  }
}

const handleVoiceInput = () => {
  // Voice input logic will be implemented here
}

const sendMessage = () => {
  if (!canSend.value) return
  
  emit('send', inputValue.value.trim())
  inputValue.value = ''
  
  nextTick(() => {
    if (inputRef.value) {
      inputRef.value.style.height = '96px'
    }
  })
}

onMounted(() => {
  if (inputRef.value) {
    inputRef.value.focus()
    adjustHeight()
  }
})

// Close menus when clicking outside
onClickOutside(inputRef, () => {
  showSlashCommands.value = false
  showMentions.value = false
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