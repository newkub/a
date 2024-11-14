<template>
  <div class="min-h-screen bg-background p-6">
    <!-- Header -->
    <div class="flex items-center justify-between mb-8">
      <div>
        <h1 class="text-2xl font-bold">User Management</h1>
        <p class="text-neutral-600">Manage users, roles, and permissions</p>
      </div>
      <button 
        class="btn-primary"
        @click="showUserForm = true"
      >
        <Icon icon="mdi:plus" class="text-lg" />
        Add User
      </button>
    </div>

    <!-- Stats -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div class="bg-white p-6 rounded-xl border border-neutral-200">
        <div class="flex items-center justify-between mb-2">
          <h3 class="text-neutral-600">Total Users</h3>
          <Icon icon="mdi:account-group" class="text-2xl text-primary-500" />
        </div>
        <p class="text-2xl font-semibold">{{ users.length }}</p>
      </div>
      
      <div class="bg-white p-6 rounded-xl border border-neutral-200">
        <div class="flex items-center justify-between mb-2">
          <h3 class="text-neutral-600">Active Users</h3>
          <Icon icon="mdi:account-check" class="text-2xl text-success-500" />
        </div>
        <p class="text-2xl font-semibold">
          {{ users.filter(u => u.status === 'active').length }}
        </p>
      </div>
      
      <div class="bg-white p-6 rounded-xl border border-neutral-200">
        <div class="flex items-center justify-between mb-2">
          <h3 class="text-neutral-600">Admins</h3>
          <Icon icon="mdi:shield-account" class="text-2xl text-warning-500" />
        </div>
        <p class="text-2xl font-semibold">
          {{ users.filter(u => u.role === 'admin').length }}
        </p>
      </div>
    </div>

    <!-- Search and Filters -->
    <div class="flex items-center gap-4 mb-6">
      <div class="relative flex-1">
        <Icon icon="mdi:magnify" class="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
        <input
          v-model="search"
          type="text"
          placeholder="Search users..."
          class="w-full pl-10 pr-4 py-2 rounded-lg border border-neutral-200 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
        />
      </div>
      <select
        v-model="roleFilter"
        class="rounded-lg border border-neutral-200 px-4 py-2 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
      >
        <option value="">All Roles</option>
        <option value="admin">Admin</option>
        <option value="moderator">Moderator</option>
        <option value="user">User</option>
      </select>
      <select
        v-model="statusFilter"
        class="rounded-lg border border-neutral-200 px-4 py-2 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
      >
        <option value="">All Status</option>
        <option value="active">Active</option>
        <option value="inactive">Inactive</option>
      </select>
    </div>

    <!-- User List -->
    <UserList
      :users="filteredUsers"
      @edit="handleEdit"
      @delete="handleDelete"
    />

    <!-- User Form Modal -->
    <div v-if="showUserForm" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div class="bg-white rounded-xl p-6 w-full max-w-md">
        <h2 class="text-xl font-bold mb-4">{{ selectedUser ? 'Edit User' : 'Add User' }}</h2>
        <UserForm
          :user="selectedUser"
          @submit="handleSubmit"
          @cancel="closeForm"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'

interface User {
  id: string
  name: string
  email: string
  status: 'active' | 'inactive'
  role: string
}

// Sample data
const users = ref<User[]>([
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    status: 'active',
    role: 'admin'
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    status: 'active',
    role: 'user'
  },
  {
    id: '3',
    name: 'Bob Johnson',
    email: 'bob@example.com',
    status: 'inactive',
    role: 'moderator'
  }
])

// State
const search = ref('')
const roleFilter = ref('')
const statusFilter = ref('')
const showUserForm = ref(false)
const selectedUser = ref<User | null>(null)

// Computed
const filteredUsers = computed(() => {
  return users.value.filter(user => {
    const matchesSearch = 
      user.name.toLowerCase().includes(search.value.toLowerCase()) ||
      user.email.toLowerCase().includes(search.value.toLowerCase())
    const matchesRole = !roleFilter.value || user.role === roleFilter.value
    const matchesStatus = !statusFilter.value || user.status === statusFilter.value
    return matchesSearch && matchesRole && matchesStatus
  })
})

// Methods
const handleEdit = (user: User) => {
  selectedUser.value = user
  showUserForm.value = true
}

const handleDelete = (user: User) => {
  if (confirm(`Are you sure you want to delete ${user.name}?`)) {
    users.value = users.value.filter(u => u.id !== user.id)
  }
}

const handleSubmit = (userData: Omit<User, 'id'>) => {
  if (selectedUser.value) {
    // Update existing user
    const index = users.value.findIndex(u => u.id === selectedUser.value!.id)
    users.value[index] = { ...selectedUser.value, ...userData }
  } else {
    // Add new user
    users.value.push({
      id: Date.now().toString(),
      ...userData
    })
  }
  closeForm()
}

const closeForm = () => {
  showUserForm.value = false
  selectedUser.value = null
}
</script>