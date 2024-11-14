<template>
  <div class="flex items-center gap-3 mb-6 overflow-x-auto pb-2">
    <!-- Card Type Filter -->
    <div class="relative">
      <button 
        class="px-3 py-1.5 rounded-lg border border-neutral-200 bg-white flex items-center gap-2 hover:bg-neutral-50"
        @click="toggleDropdown('type')"
      >
        <Icon icon="mdi:card-outline" class="text-lg" />
        Card Type
        <Icon 
          :icon="activeDropdown === 'type' ? 'mdi:chevron-up' : 'mdi:chevron-down'" 
          class="text-lg"
        />
      </button>
      
      <div v-if="activeDropdown === 'type'"
        class="absolute top-full mt-1 w-48 bg-white rounded-lg shadow-lg border border-neutral-200 py-1 z-10">
        <button
          v-for="type in cardTypes"
          :key="type.value"
          class="w-full px-3 py-2 text-left hover:bg-neutral-50 flex items-center gap-2"
          :class="selectedType === type.value ? 'text-primary-500' : 'text-neutral-700'"
          @click="selectType(type.value)"
        >
          <Icon :icon="type.icon" class="text-lg" />
          {{ type.label }}
        </button>
      </div>
    </div>

    <!-- Tags Filter -->
    <div class="relative">
      <button 
        class="px-3 py-1.5 rounded-lg border border-neutral-200 bg-white flex items-center gap-2 hover:bg-neutral-50"
        @click="toggleDropdown('tags')"
      >
        <Icon icon="mdi:tag-outline" class="text-lg" />
        Tags
        <Icon 
          :icon="activeDropdown === 'tags' ? 'mdi:chevron-up' : 'mdi:chevron-down'" 
          class="text-lg"
        />
      </button>
      
      <div v-if="activeDropdown === 'tags'"
        class="absolute top-full mt-1 w-64 bg-white rounded-lg shadow-lg border border-neutral-200 p-2 z-10">
        <div class="mb-2">
          <input
            v-model="tagSearch"
            type="text"
            placeholder="Search tags..."
            class="w-full px-2 py-1.5 bg-neutral-50 rounded-md text-sm"
          />
        </div>
        <div class="max-h-48 overflow-y-auto">
          <button
            v-for="tag in filteredTags"
            :key="tag"
            class="w-full px-2 py-1.5 text-left hover:bg-neutral-50 rounded-md flex items-center gap-2"
            :class="selectedTags.includes(tag) ? 'text-primary-500' : 'text-neutral-700'"
            @click="toggleTag(tag)"
          >
            <Icon 
              :icon="selectedTags.includes(tag) ? 'mdi:checkbox-marked' : 'mdi:checkbox-blank-outline'" 
              class="text-lg"
            />
            {{ tag }}
          </button>
        </div>
      </div>
    </div>

    <!-- Whiteboards Filter -->
    <div class="relative">
      <button 
        class="px-3 py-1.5 rounded-lg border border-neutral-200 bg-white flex items-center gap-2 hover:bg-neutral-50"
        @click="toggleDropdown('whiteboards')"
      >
        <Icon icon="mdi:whiteboard" class="text-lg" />
        Whiteboards
        <Icon 
          :icon="activeDropdown === 'whiteboards' ? 'mdi:chevron-up' : 'mdi:chevron-down'" 
          class="text-lg"
        />
      </button>
    </div>

    <!-- Add Filter Button -->
    <button 
      class="px-3 py-1.5 rounded-lg border border-neutral-200 bg-white flex items-center gap-2 hover:bg-neutral-50 text-neutral-600"
    >
      <Icon icon="mdi:plus" class="text-lg" />
      Add Filter
    </button>
  </div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { ref, computed, onMounted, onUnmounted } from 'vue'

const activeDropdown = ref<string | null>(null)
const selectedType = ref<string | null>(null)
const selectedTags = ref<string[]>([])
const tagSearch = ref('')

const cardTypes = [
  { value: 'all', label: 'All Types', icon: 'mdi:view-grid' },
  { value: 'note', label: 'Notes', icon: 'mdi:note-text' },
  { value: 'image', label: 'Images', icon: 'mdi:image' },
  { value: 'link', label: 'Links', icon: 'mdi:link' }
]

const tags = [
  'Research', 'Tutorial', 'Reference', 'Project', 'Ideas',
  'Documentation', 'Design', 'Development', 'Learning'
]

const filteredTags = computed(() => {
  if (!tagSearch.value) return tags
  return tags.filter(tag => 
    tag.toLowerCase().includes(tagSearch.value.toLowerCase())
  )
})

const toggleDropdown = (type: string) => {
  activeDropdown.value = activeDropdown.value === type ? null : type
}

const selectType = (type: string) => {
  selectedType.value = type
  activeDropdown.value = null
}

const toggleTag = (tag: string) => {
  const index = selectedTags.value.indexOf(tag)
  if (index === -1) {
    selectedTags.value.push(tag)
  } else {
    selectedTags.value.splice(index, 1)
  }
}

// Handle click outside
const handleClickOutside = (event: MouseEvent) => {
  const target = event.target as HTMLElement
  if (!target.closest('.relative')) {
    activeDropdown.value = null
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>