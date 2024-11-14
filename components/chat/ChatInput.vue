<template>
  <div class="relative">
    <div class="border border-neutral-200 rounded-xl bg-white">
      <textarea
        ref="inputRef"
        v-model="inputValue"
        rows="3"
        class="textarea-base w-full rounded-t-xl px-4 py-4 resize-none overflow-y-auto"
        :class="{ 'opacity-50': disabled }"
        placeholder="Type a message... (Enter to send, Shift + Enter for new line)"
        @input="handleInput"
        @keydown="handleKeydown"
        @paste="handlePaste"
        :disabled="disabled"
      />
      
      <!-- Options Bar -->
      <div class="px-4 py-2 border-t border-neutral-200 flex items-center gap-4">
        <button
          v-for="option in options"
          :key="option.id"
          class="flex items-center gap-2 text-sm text-neutral-600 hover:text-primary-600 transition-colors"
        >
          <Icon :icon="option.icon" class="text-lg" />
          <span>{{ option.label }}</span>
        </button>
      </div>
    </div>

    <!-- Slash Commands Menu -->
    <SlashCommandMenu
      :is-visible="slashCommands.isVisible"
      :search-query="slashCommands.searchQuery"
      :filtered-commands="slashCommands.filteredCommands"
      @select="handleCommandSelect"
      @update:search-query="slashCommands.searchQuery = $event"
    />

    <!-- Mention Menu -->
    <MentionMenu
      :is-visible="mentions.isVisible"
      :search-query="mentions.searchQuery"
      :filtered-users="mentions.filteredUsers"
      @select="handleUserSelect"
      @update:search-query="mentions.searchQuery = $event"
    />
    
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

const slashCommands = useSlashCommands()
const mentions = useMentions()

const canSend = computed(() => 
  inputValue.value.trim().length > 0 && !props.loading && !props.disabled
)

const options = [
  {
    id: 'upload',
    label: 'Upload File',
    icon: 'mdi:file-upload'
  },
  {
    id: 'enhance',
    label: 'Prompt Enhance',
    icon: 'mdi:magic-wand'
  },
  {
    id: 'whiteboard',
    label: 'Whiteboard',
    icon: 'mdi:drawing'
  },
  {
    id: 'screenshot',
    label: 'Screenshot',
    icon: 'mdi:camera'
  },
  {
    id: 'screen-recorder',
    label: 'Screen Recorder',
    icon: 'mdi:video'
  }
]

const handleInput = (event: Event) => {
  const target = event.target as HTMLTextAreaElement
  const value = target.value
  const lastChar = value[value.length - 1]
  
  if (lastChar === '/') {
    slashCommands.show()
    mentions.hide()
  } else if (lastChar === '@') {
    mentions.show()
    slashCommands.hide()
  } else {
    slashCommands.hide()
    mentions.hide()
  }
  
  adjustHeight()
}

const handleCommandSelect = (command: any) => {
  const text = inputValue.value
  const lastSlashIndex = text.lastIndexOf('/')
  inputValue.value = text.slice(0, lastSlashIndex) + slashCommands.selectCommand(command)
}

const handleUserSelect = (user: any) => {
  const text = inputValue.value
  const lastMentionIndex = text.lastIndexOf('@')
  inputValue.value = text.slice(0, lastMentionIndex) + mentions.selectUser(user)
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
    slashCommands.hide()
    mentions.hide()
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
  slashCommands.hide()
  mentions.hide()
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