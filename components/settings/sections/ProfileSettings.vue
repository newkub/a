<template>
  <div class="space-y-6">
    <!-- Profile Information -->
    <div class="p-6 bg-neutral-50 rounded-xl border border-neutral-200">
      <div class="flex items-start justify-between mb-6">
        <div>
          <h2 class="text-lg font-semibold">Profile Information</h2>
          <p class="text-neutral-600">Manage your personal information</p>
        </div>
        <button class="btn btn-primary">
          Save Changes
        </button>
      </div>

      <div class="flex items-center gap-6 mb-6">
        <div class="relative">
          <img
            :src="profile.avatar || 'https://avatars.githubusercontent.com/u/142387426?s=200&v=4'"
            alt="Profile"
            class="img-round w-24 h-24"
          />
          <button class="absolute bottom-0 right-0 p-2 bg-white rounded-lg shadow-sm border border-neutral-200 hover:bg-neutral-50">
            <Icon icon="mdi:camera" class="text-lg" />
          </button>
        </div>
        
        <div class="flex-1">
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium mb-1">First Name</label>
              <input
                v-model="profile.firstName"
                type="text"
                class="w-full rounded-lg border border-neutral-200 p-2"
              />
            </div>
            <div>
              <label class="block text-sm font-medium mb-1">Last Name</label>
              <input
                v-model="profile.lastName"
                type="text"
                class="w-full rounded-lg border border-neutral-200 p-2"
              />
            </div>
          </div>
        </div>
      </div>

      <div class="space-y-4">
        <div>
          <label class="block text-sm font-medium mb-1">Email</label>
          <input
            v-model="profile.email"
            type="email"
            class="w-full rounded-lg border border-neutral-200 p-2"
          />
        </div>
        
        <div>
          <label class="block text-sm font-medium mb-1">Bio</label>
          <textarea
            v-model="profile.bio"
            rows="3"
            class="textarea-base resize-none"
          />
        </div>

        <div>
          <label class="block text-sm font-medium mb-1">Time Zone</label>
          <select v-model="profile.timezone" class="w-full rounded-lg border border-neutral-200 p-2">
            <option v-for="tz in timeZones" :key="tz.value" :value="tz.value">
              {{ tz.label }}
            </option>
          </select>
        </div>
      </div>
    </div>

    <!-- Connected Accounts -->
    <div class="p-6 bg-neutral-50 rounded-xl border border-neutral-200">
      <h2 class="text-lg font-semibold mb-4">Connected Accounts</h2>
      <div class="space-y-3">
        <div v-for="account in connectedAccounts" :key="account.id"
          class="flex items-center justify-between p-3 bg-white rounded-lg border border-neutral-200">
          <div class="flex items-center gap-3">
            <Icon :icon="account.icon" class="text-2xl" />
            <div>
              <div class="font-medium">{{ account.name }}</div>
              <div class="text-sm text-neutral-600">{{ account.status }}</div>
            </div>
          </div>
          <button 
            class="px-3 py-1.5 rounded-lg text-sm"
            :class="account.connected ? 'text-error-600 hover:bg-error-50' : 'text-primary-600 hover:bg-primary-50'"
          >
            {{ account.connected ? 'Disconnect' : 'Connect' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'

const profile = reactive({
  firstName: 'John',
  lastName: 'Doe',
  email: 'john@example.com',
  bio: '',
  avatar: 'https://avatars.githubusercontent.com/u/142387426?s=200&v=4',
  timezone: 'UTC+7'
})

const timeZones = [
  { value: 'UTC+7', label: 'Bangkok (UTC+7)' },
  { value: 'UTC+8', label: 'Singapore (UTC+8)' },
  { value: 'UTC+9', label: 'Tokyo (UTC+9)' },
  { value: 'UTC', label: 'London (UTC)' },
  { value: 'UTC-4', label: 'New York (UTC-4)' },
  { value: 'UTC-7', label: 'San Francisco (UTC-7)' }
]

const connectedAccounts = reactive([
  {
    id: 1,
    name: 'Google',
    icon: 'mdi:google',
    status: 'Connected as john@gmail.com',
    connected: true
  },
  {
    id: 2,
    name: 'GitHub',
    icon: 'mdi:github',
    status: 'Not connected',
    connected: false
  },
  {
    id: 3,
    name: 'Discord',
    icon: 'mdi:discord',
    status: 'Connected as John#1234',
    connected: true
  } ])
</script>