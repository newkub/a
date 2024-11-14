<template>
  <form @submit.prevent="handleSubmit" class="space-y-6">
    <!-- Name -->
    <div>
      <label class="block text-sm font-medium text-neutral-700 mb-1">Name</label>
      <input
        v-model="formData.name"
        type="text"
        class="w-full rounded-lg border border-neutral-200 px-4 py-2 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
        required
      />
    </div>

    <!-- Email -->
    <div>
      <label class="block text-sm font-medium text-neutral-700 mb-1">Email</label>
      <input
        v-model="formData.email"
        type="email"
        class="w-full rounded-lg border border-neutral-200 px-4 py-2 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
        required
      />
    </div>

    <!-- Role -->
    <div>
      <label class="block text-sm font-medium text-neutral-700 mb-1">Role</label>
      <select
        v-model="formData.role"
        class="w-full rounded-lg border border-neutral-200 px-4 py-2 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
      >
        <option value="user">User</option>
        <option value="admin">Admin</option>
        <option value="moderator">Moderator</option>
      </select>
    </div>

    <!-- Status -->
    <div>
      <label class="block text-sm font-medium text-neutral-700 mb-1">Status</label>
      <div class="flex items-center gap-4">
        <label class="flex items-center gap-2">
          <input
            type="radio"
            v-model="formData.status"
            value="active"
            class="text-primary-500 focus:ring-primary-500"
          />
          <span>Active</span>
        </label>
        <label class="flex items-center gap-2">
          <input
            type="radio"
            v-model="formData.status"
            value="inactive"
            class="text-primary-500 focus:ring-primary-500"
          />
          <span>Inactive</span>
        </label>
      </div>
    </div>

    <!-- Actions -->
    <div class="flex items-center justify-end gap-3">
      <button
        type="button"
        class="btn-ghost"
        @click="$emit('cancel')"
      >
        Cancel
      </button>
      <button
        type="submit"
        class="btn-primary"
      >
        {{ user ? 'Update User' : 'Add User' }}
      </button>
    </div>
  </form>
</template>

<script setup lang="ts">
interface User {
  id: string
  name: string
  email: string
  status: 'active' | 'inactive'
  role: string
}

const props = defineProps<{
  user?: User
}>()

const emit = defineEmits<{
  submit: [user: Omit<User, 'id'>]
  cancel: []
}>()

const formData = ref({
  name: props.user?.name ?? '',
  email: props.user?.email ?? '',
  role: props.user?.role ?? 'user',
  status: props.user?.status ?? 'active'
})

const handleSubmit = () => {
  emit('submit', { ...formData.value })
}
</script>