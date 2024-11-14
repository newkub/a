<template>
  <div class="relative" ref="selectorRef">
    <button
      @click="isOpen = !isOpen"
      class="btn-ghost flex items-center gap-2 px-3 py-1.5 border border-neutral-200 hover:border-neutral-300"
      :class="{ 'border-neutral-300 bg-neutral-50': isOpen }"
    >
      <div class="flex items-center gap-2 min-w-0">
        <template v-if="currentSelectedItem">
          <img v-if="currentSelectedItem.avatar" :src="currentSelectedItem.avatar" class="img-round-sm w-5 h-5" :alt="currentSelectedItem.label">
          <Icon v-else-if="currentSelectedItem.icon" :icon="currentSelectedItem.icon" class="text-lg text-neutral-600" />
          <span class="font-medium text-sm text-neutral-700 truncate">{{ currentSelectedItem.label }}</span>
        </template>
        <template v-else>
          <Icon :icon="icon" class="text-lg text-neutral-600" />
          <span class="font-medium text-sm text-neutral-700">{{ title }}</span>
        </template>
      </div>
      <Icon 
        :icon="isOpen ? 'mdi:chevron-up' : 'mdi:chevron-down'" 
        class="text-lg text-neutral-500 transition-transform duration-200 ml-auto"
        :class="{ 'rotate-180': isOpen }"
      />
    </button>

    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="transform scale-95 opacity-0"
      enter-to-class="transform scale-100 opacity-100"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="transform scale-100 opacity-100"
      leave-to-class="transform scale-95 opacity-0"
    >
      <div
        v-if="isOpen"
        class="absolute z-50 w-64 mt-2 bg-white border border-neutral-200 rounded-xl shadow-lg shadow-neutral-200/50 backdrop-blur-sm"
      >
        <div v-if="withSearch" class="p-2 border-b border-neutral-100">
          <div class="relative">
            <Icon icon="mdi:magnify" class="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
            <input
              v-model="searchQuery"
              type="text"
              :placeholder="searchPlaceholder"
              class="w-full pl-9 pr-3 py-2 bg-neutral-50 rounded-lg text-sm border border-transparent hover:border-neutral-200 focus:border-neutral-300 focus:outline-none transition-colors"
              @input="$emit('update:modelValue', searchQuery)"
            />
          </div>
        </div>
        <div 
          class="max-h-[280px] overflow-y-auto p-1 scrollbar-thin scrollbar-thumb-neutral-200 scrollbar-track-transparent hover:scrollbar-thumb-neutral-300"
        >
          <slot 
            :select="handleSelect" 
            :selected-id="currentSelectedItem?.id"
          ></slot>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { ref, watch, computed, onUnmounted } from 'vue'
import { onClickOutside } from '@vueuse/core'
import { useSelectorStore } from '~/composables/useSelectorStore'

interface Item {
  id: string | number
  label: string
  icon?: string
  avatar?: string
  [key: string]: any
}

const props = defineProps<{
  modelValue?: string
  title: string
  icon: string
  withSearch?: boolean
  searchPlaceholder?: string
  storeKey?: string // Unique key for this selector instance
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
  'update:isOpen': [value: boolean]
}>()

const isOpen = ref(false)
const selectorRef = ref(null)
const selectorStore = useSelectorStore()

// Use a unique key for this selector instance, fallback to title if not provided
const storeKey = computed(() => props.storeKey || props.title)

// Initialize search query from store
const searchQuery = computed({
  get: () => selectorStore.getSearchQuery(storeKey.value),
  set: (value) => selectorStore.setSearchQuery(storeKey.value, value)
})

// Get current selected item from store
const currentSelectedItem = computed(() => 
  selectorStore.getSelectedItem(storeKey.value)
)

const handleSelect = (item: Item) => {
  selectorStore.setSelectedItem(storeKey.value, item)
  emit('update:modelValue', item.id)
  isOpen.value = false
  emit('update:isOpen', false)
}

onClickOutside(selectorRef, () => {
  isOpen.value = false
  emit('update:isOpen', false)
})

// Clean up when component is unmounted
onUnmounted(() => {
  selectorStore.setSelectedItem(storeKey.value, null)
  selectorStore.setSearchQuery(storeKey.value, '')
})
</script>

<style scoped>
.scrollbar-thin {
  scrollbar-width: thin;
}

.scrollbar-thumb-neutral-200::-webkit-scrollbar-thumb {
  background-color: #e5e5e5;
  border-radius: 9999px;
}

.scrollbar-thumb-neutral-300::-webkit-scrollbar-thumb {
  background-color: #d4d4d4;
}

.scrollbar-track-transparent::-webkit-scrollbar-track {
  background-color: transparent;
}

::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-thumb {
  border-radius: 9999px;
}

::-webkit-scrollbar-track {
  background-color: transparent;
}
</style>
