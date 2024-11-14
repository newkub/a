<template>
  <div class="space-y-6">
    <div class="p-6 bg-neutral-50 rounded-xl border border-neutral-200">
      <h2 class="text-lg font-semibold mb-4">Theme</h2>
      <div class="space-y-4">
        <BaseToggle
          label="Dark Mode"
          v-model="isDarkMode"
          @update:modelValue="toggleTheme"
        />
        <div class="flex items-center justify-between">
          <div>
            <h3 class="font-medium">Accent Color</h3>
            <p class="text-sm text-neutral-600">Choose your preferred accent color</p>
          </div>
          <div class="flex gap-2">
            <button
              v-for="color in accentColors"
              :key="color.value"
              class="w-6 h-6 rounded-full border-2"
              :class="[
                color.value === selectedColor ? 'border-primary-500' : 'border-transparent',
                color.bg
              ]"
              @click="selectedColor = color.value"
            />
          </div>
        </div>
      </div>
    </div>

    <div class="p-6 bg-neutral-50 rounded-xl border border-neutral-200">
      <h2 class="text-lg font-semibold mb-4">Font</h2>
      <div class="space-y-4">
        <div>
          <label class="block text-sm font-medium mb-2">Font Family</label>
          <select class="w-full rounded-lg border border-neutral-200 p-2">
            <option>IBM Plex Sans Thai</option>
            <option>Inter</option>
            <option>Roboto</option>
          </select>
        </div>
        <BaseSlider
          label="Font Size"
          :model-value="fontSize"
          :min="12"
          :max="20"
          :step="1"
          @update:model-value="fontSize = $event"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const isDarkMode = ref(false)
const fontSize = ref(14)
const selectedColor = ref('blue')

const accentColors = [
  { value: 'blue', bg: 'bg-blue-500' },
  { value: 'purple', bg: 'bg-purple-500' },
  { value: 'green', bg: 'bg-green-500' },
  { value: 'red', bg: 'bg-red-500' },
  { value: 'orange', bg: 'bg-orange-500' }
]

const toggleTheme = () => {
  // Theme toggle logic here
}
</script>