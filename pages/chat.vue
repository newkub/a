<template>
  <div class="flex h-screen">
    <!-- Chat List Sidebar -->
    <div class="w-80 border-r border-gray-200 bg-white">
      <div class="p-4 border-b border-gray-200">
        <button class="btn-primary w-full">
          <span class="i-mdi-plus mr-2" />
          New Chat
        </button>
      </div>
      <div class="overflow-y-auto h-[calc(100vh-73px)]">
        <div 
          v-for="chat in chats" 
          :key="chat.id"
          class="p-4 hover:bg-gray-50 cursor-pointer border-b border-gray-200"
          :class="{ 'bg-gray-50': chat.id === activeChat }"
          @click="activeChat = chat.id"
        >
          <h3 class="font-medium text-sm mb-1">{{ chat.title }}</h3>
          <p class="text-xs text-gray-500">{{ chat.preview }}</p>
        </div>
      </div>
    </div>

    <!-- Chat Area -->
    <div class="flex-1 flex flex-col bg-gray-50">
      <!-- Chat Messages -->
      <div class="flex-1 overflow-y-auto p-6">
        <div class="space-y-6">
          <ChatMessage
            v-for="message in messages"
            :key="message.id"
            v-bind="message"
          />
        </div>
      </div>

      <!-- Input Area -->
      <div class="border-t border-gray-200 bg-white p-4">
        <div class="flex space-x-4">
          <div class="flex-1 relative">
            <textarea 
              v-model="newMessage"
              rows="1"
              placeholder="Type your message..."
              class="w-full rounded-lg pl-4 pr-12 py-3 bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              @keydown.enter.prevent="sendMessage"
            />
            <button 
              class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              @click="sendMessage"
            >
              <span class="i-mdi-send text-xl" />
            </button>
          </div>
          <button class="btn-ghost">
            <span class="i-mdi-microphone text-xl" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const activeChat = ref(1)
const newMessage = ref('')

const chats = [
  { id: 1, title: 'Chat Session 1', preview: 'Last message preview...' },
  { id: 2, title: 'Chat Session 2', preview: 'Another message preview...' },
  { id: 3, title: 'Chat Session 3', preview: 'More message previews...' }
]

const messages = [
  { id: 1, content: 'Hello! How can I assist you today?', time: '11:30 AM', isBot: true }
]

const sendMessage = () => {
  if (!newMessage.value.trim()) return
  
  messages.push({
    id: messages.length + 1,
    content: newMessage.value,
    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    isBot: false
  })
  
  newMessage.value = ''
}
</script>