<template>
  <div class="bg-white rounded-xl border border-neutral-200 p-4 h-fit">
    <h2 class="text-lg font-semibold mb-4">Filters</h2>
    
    <!-- Style Tags -->
    <div class="mb-6">
      <h3 class="text-sm font-medium text-neutral-700 mb-2">Styles</h3>
      <div class="space-y-2">
        <label v-for="style in styles" :key="style.id" class="flex items-center">
          <input
            type="checkbox"
            :value="style.id"
            v-model="selectedStyles"
            class="rounded border-neutral-300 text-primary-600 focus:ring-primary-500"
          />
          <span class="ml-2 text-sm text-neutral-600">{{ style.name }}</span>
        </label>
      </div>
    </div>

    <!-- Aspect Ratio -->
    <div class="mb-6">
      <h3 class="text-sm font-medium text-neutral-700 mb-2">Aspect Ratio</h3>
      <div class="grid grid-cols-2 gap-2">
        <button
          v-for="ratio in aspectRatios"
          :key="ratio.id"
          class="px-3 py-1.5 text-sm rounded-lg border"
          :class="selectedRatio === ratio.id ? 'bg-primary-50 border-primary-200 text-primary-700' : 'border-neutral-200 text-neutral-600 hover:bg-neutral-50'"
          @click="selectedRatio = ratio.id"
        >
          {{ ratio.label }}
        </button>
      </div>
    </div>

    <!-- Date Range -->
    <div class="mb-6">
      <h3 class="text-sm font-medium text-neutral-700 mb-2">Date Range</h3>
      <select
        v-model="dateRange"
        class="w-full rounded-lg border-neutral-200 text-sm"
      >
        <option value="all">All Time</option>
        <option value="today">Today</option>
        <option value="week">Past Week</option>
        <option value="month">Past Month</option>
      </select>
    </div>

    <!-- Clear Filters -->
    <button
      class="w-full px-4 py-2 text-sm text-neutral-600 hover:text-neutral-700 hover:bg-neutral-50 rounded-lg border border-neutral-200"
      @click="clearFilters"
    >
      Clear Filters
    </button>
  </div>
</template>

<script setup lang="ts">
const styles = [
  { id: 'photorealistic', name: 'Photorealistic' },
  { id: 'artistic', name: 'Artistic' },
  { id: 'abstract', name: 'Abstract' },
  { id: '3d', name: '3D Render' },
  { id: 'anime', name: 'Anime' }
]

const aspectRatios = [
  { id: 'square', label: '1:1' },
  { id: 'portrait', label: '3:4' },
  { id: 'landscape', label: '4:3' },
  { id: 'wide', label: '16:9' }
]

const selectedStyles = ref<string[]>([])
const selectedRatio = ref('square')
const dateRange = ref('all')

const clearFilters = () => {
  selectedStyles.value = []
  selectedRatio.value = 'square'
  dateRange.value = 'all'
}
</script>