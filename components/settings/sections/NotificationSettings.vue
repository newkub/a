<template>
  <div class="space-y-6">
    <!-- General Notifications -->
    <div class="p-6 bg-neutral-50 rounded-xl border border-neutral-200">
      <h2 class="text-lg font-semibold mb-4">General Notifications</h2>
      <div class="space-y-4">
        <BaseToggle
          label="Enable Notifications"
          v-model="settings.enabled"
        />
        
        <div v-if="settings.enabled">
          <div class="space-y-3">
            <div v-for="notification in notifications" :key="notification.id"
              class="flex items-center justify-between p-3 bg-white rounded-lg border border-neutral-200">
              <div>
                <div class="font-medium">{{ notification.name }}</div>
                <div class="text-sm text-neutral-600">{{ notification.description }}</div>
              </div>
              <select 
                v-model="notification.type"
                class="rounded-lg border border-neutral-200 p-1.5 text-sm"
              >
                <option value="all">All</option>
                <option value="important">Important Only</option>
                <option value="none">None</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Chat Notifications -->
    <div class="p-6 bg-neutral-50 rounded-xl border border-neutral-200">
      <h2 class="text-lg font-semibold mb-4">Chat Notifications</h2>
      <div class="space-y-4">
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium mb-2">Message Preview</label>
            <select v-model="chatSettings.preview" class="w-full rounded-lg border border-neutral-200 p-2">
              <option value="full">Full Message</option>
              <option value="partial">Partial Message</option>
              <option value="sender">Sender Only</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium mb-2">Sound</label>
            <select v-model="chatSettings.sound" class="w-full rounded-lg border border-neutral-200 p-2">
              <option value="default">Default</option>
              <option value="subtle">Subtle</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>

        <div class="space-y-3">
          <BaseToggle
            label="Show Typing Indicators"
            v-model="chatSettings.typingIndicator"
          />
          <BaseToggle
            label="Message Read Receipts"
            v-model="chatSettings.readReceipts"
          />
          <BaseToggle
            label="Mention Notifications"
            v-model="chatSettings.mentions"
          />
          <BaseToggle
            label="Group Chat Notifications"
            v-model="chatSettings.groupChat"
          />
        </div>

        <div>
          <label class="block text-sm font-medium mb-2">Priority Users</label>
          <div class="space-y-2">
            <div v-for="user in priorityUsers" :key="user.id"
              class="flex items-center justify-between p-2 bg-white rounded-lg border border-neutral-200">
              <div class="flex items-center gap-2">
                <div class="w-8 h-8 rounded-full bg-neutral-100 flex items-center justify-center">
                  <Icon icon="mdi:account" class="text-lg text-neutral-600" />
                </div>
                <span>{{ user.name }}</span>
              </div>
              <BaseToggle
                v-model="user.priority"
                :label="''"
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Delivery Schedule -->
    <div class="p-6 bg-neutral-50 rounded-xl border border-neutral-200">
      <h2 class="text-lg font-semibold mb-4">Delivery Schedule</h2>
      <div class="space-y-4">
        <BaseToggle
          label="Enable Quiet Hours"
          v-model="settings.quietHours"
        />
        
        <div v-if="settings.quietHours" class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium mb-2">Start Time</label>
            <input
              v-model="settings.quietHoursStart"
              type="time"
              class="w-full rounded-lg border border-neutral-200 p-2"
            />
          </div>
          <div>
            <label class="block text-sm font-medium mb-2">End Time</label>
            <input
              v-model="settings.quietHoursEnd"
              type="time"
              class="w-full rounded-lg border border-neutral-200 p-2"
            />
          </div>
        </div>

        <div>
          <label class="block text-sm font-medium mb-2">Delivery Days</label>
          <div class="grid grid-cols-7 gap-2">
            <button
              v-for="day in deliveryDays"
              :key="day.value"
              class="p-2 rounded-lg text-center text-sm"
              :class="day.enabled ? 'bg-primary-100 text-primary-700' : 'bg-neutral-100 text-neutral-600'"
              @click="day.enabled = !day.enabled"
            >
              {{ day.label }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'

const settings = reactive({
  enabled: true,
  quietHours: false,
  quietHoursStart: '22:00',
  quietHoursEnd: '07:00'
})

const notifications = reactive([
  {
    id: 1,
    name: 'Chat Notifications',
    description: 'New messages and mentions',
    type: 'all'
  },
  {
    id: 2,
    name: 'System Updates',
    description: 'Important system and security updates',
    type: 'important'
  },
  {
    id: 3,
    name: 'Marketing',
    description: 'News and promotional content',
    type: 'none'
  }
])

const chatSettings = reactive({
  preview: 'partial',
  sound: 'default',
  typingIndicator: true,
  readReceipts: true,
  mentions: true,
  groupChat: true
})

const priorityUsers = reactive([
  { id: 1, name: 'John Doe', priority: true },
  { id: 2, name: 'Jane Smith', priority: false },
  { id: 3, name: 'Bob Johnson', priority: true }
])

const deliveryDays = reactive([
  { value: 'mon', label: 'M', enabled: true },
  { value: 'tue', label: 'T', enabled: true },
  { value: 'wed', label: 'W', enabled: true },
  { value: 'thu', label: 'T', enabled: true },
  { value: 'fri', label: 'F', enabled: true },
  { value: 'sat', label: 'S', enabled: false },
  { value: 'sun', label: 'S', enabled: false }
])
</script>