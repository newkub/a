<template>
  <div class="space-y-6">
    <div class="grid grid-cols-1 lg:grid-cols-6 gap-6">
      <!-- Tools Panel -->
      <div class="lg:col-span-1 bg-white rounded-xl border border-neutral-200 p-4">
        <div class="space-y-2">
          <button
            v-for="tool in editorTools"
            :key="tool.id"
            @click="selectTool(tool)"
            class="w-full flex items-center gap-3 p-2 rounded-lg transition-colors"
            :class="selectedTool?.id === tool.id ? 'btn-primary' : 'btn-ghost'"
          >
            <Icon :icon="tool.icon" class="btn-icon text-neutral-700" />
            <span class="text-sm">{{ tool.name }}</span>
          </button>
        </div>

        <!-- History -->
        <div class="mt-6">
          <h3 class="text-sm font-medium mb-2">History</h3>
          <div class="space-y-1">
            <button
              v-for="(action, index) in history"
              :key="index"
              @click="jumpToHistory(index)"
              class="w-full text-left text-sm p-2 rounded-lg hover:bg-neutral-50"
              :class="currentHistoryIndex === index ? 'bg-primary-50' : ''"
            >
              {{ action.name }}
            </button>
          </div>
        </div>
      </div>

      <!-- Canvas Area -->
      <div class="lg:col-span-4">
        <!-- Canvas Controls -->
        <div class="bg-white rounded-xl border border-neutral-200 p-4 mb-4">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-4">
              <button
                v-for="zoom in zoomLevels"
                :key="zoom"
                @click="currentZoom = zoom"
                class="px-3 py-1 rounded-lg text-sm"
                :class="currentZoom === zoom ? 'bg-primary-600 text-white' : 'bg-neutral-100'"
              >
                {{ zoom }}%
              </button>
            </div>
            <div class="flex items-center gap-2">
              <button
                @click="undo"
                :disabled="!canUndo"
                class="p-2 rounded-lg hover:bg-neutral-100 disabled:opacity-50"
              >
                <Icon icon="mdi:undo" class="text-xl" />
              </button>
              <button
                @click="redo"
                :disabled="!canRedo"
                class="p-2 rounded-lg hover:bg-neutral-100 disabled:opacity-50"
              >
                <Icon icon="mdi:redo" class="text-xl" />
              </button>
            </div>
          </div>
        </div>

        <!-- Canvas -->
        <div class="bg-neutral-100 rounded-xl border border-neutral-200 aspect-video relative">
          <canvas
            ref="canvas"
            class="absolute inset-0 w-full h-full"
            :style="{ transform: `scale(${currentZoom / 100})` }"
          ></canvas>
          <div v-if="!hasImage" class="absolute inset-0 flex flex-col items-center justify-center">
            <Icon icon="mdi:image-plus" class="text-4xl text-neutral-400 mb-2" />
            <button
              @click="openImage"
              class="btn-primary"
            >
              Open Image
            </button>
          </div>
        </div>
      </div>

      <!-- Properties Panel -->
      <div class="lg:col-span-1 space-y-4">
        <!-- Tool Properties -->
        <div class="bg-white rounded-xl border border-neutral-200 p-4">
          <h3 class="font-medium mb-3">Properties</h3>
          <div class="space-y-4">
            <template v-if="selectedTool">
              <!-- Brush Properties -->
              <template v-if="selectedTool.id === 'brush'">
                <div>
                  <label class="block text-sm mb-1">Size</label>
                  <input 
                    v-model="brushSize" 
                    type="range" 
                    min="1" 
                    max="100" 
                    class="w-full" 
                  />
                </div>
                <div>
                  <label class="block text-sm mb-1">Opacity</label>
                  <input 
                    v-model="brushOpacity" 
                    type="range" 
                    min="0" 
                    max="100" 
                    class="w-full" 
                  />
                </div>
                <div>
                  <label class="block text-sm mb-1">Color</label>
                  <div class="grid grid-cols-6 gap-1">
                    <button
                      v-for="color in colors"
                      :key="color"
                      @click="brushColor = color"
                      class="w-6 h-6 rounded-full"
                      :style="{ backgroundColor: color }"
                      :class="{ 'ring-2 ring-primary-600': brushColor === color }"
                    ></button>
                  </div>
                </div>
              </template>

              <!-- Filter Properties -->
              <template v-if="selectedTool.id === 'filter'">
                <div v-for="filter in filters" :key="filter.id" class="space-y-2">
                  <label class="block text-sm mb-1">{{ filter.name }}</label>
                  <input 
                    v-model="filter.value" 
                    type="range" 
                    :min="filter.min" 
                    :max="filter.max" 
                    class="w-full" 
                  />
                </div>
              </template>
            </template>
          </div>
        </div>

        <!-- Export Options -->
        <div class="bg-white rounded-xl border border-neutral-200 p-4">
          <h3 class="font-medium mb-3">Export</h3>
          <div class="space-y-4">
            <div>
              <label class="block text-sm mb-1">Format</label>
              <select v-model="exportFormat" class="w-full p-2 bg-neutral-50 rounded-lg border border-neutral-200">
                <option value="png">PNG</option>
                <option value="jpeg">JPEG</option>
                <option value="webp">WebP</option>
              </select>
            </div>
            <button
              @click="exportImage"
              :disabled="!hasImage"
              class="btn-primary w-full disabled:opacity-50"
            >
              Export
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Icon } from '@iconify/vue'

interface EditorTool {
  id: string
  name: string
  icon: string
}

interface HistoryAction {
  name: string
  undo: () => void
  redo: () => void
}

interface Filter {
  id: string
  name: string
  value: number
  min: number
  max: number
}

const editorTools: EditorTool[] = [
  { id: 'select', name: 'Select', icon: 'mdi:cursor-default' },
  { id: 'brush', name: 'Brush', icon: 'mdi:brush' },
  { id: 'eraser', name: 'Eraser', icon: 'mdi:eraser' },
  { id: 'text', name: 'Text', icon: 'mdi:format-text' },
  { id: 'shape', name: 'Shape', icon: 'mdi:shape' },
  { id: 'crop', name: 'Crop', icon: 'mdi:crop' },
  { id: 'filter', name: 'Filter', icon: 'mdi:image-filter' }
]

const filters: Filter[] = [
  { id: 'brightness', name: 'Brightness', value: 100, min: 0, max: 200 },
  { id: 'contrast', name: 'Contrast', value: 100, min: 0, max: 200 },
  { id: 'saturation', name: 'Saturation', value: 100, min: 0, max: 200 },
  { id: 'blur', name: 'Blur', value: 0, min: 0, max: 20 }
]

const colors = [
  '#000000', '#FFFFFF', '#FF0000', '#00FF00', '#0000FF',
  '#FFFF00', '#FF00FF', '#00FFFF', '#FFA500', '#800080'
]

const zoomLevels = [25, 50, 100, 150, 200]

// Refs
const canvas = ref<HTMLCanvasElement | null>(null)
const selectedTool = ref<EditorTool | null>(editorTools[0])
const currentZoom = ref(100)
const brushSize = ref(10)
const brushOpacity = ref(100)
const brushColor = ref(colors[0])
const exportFormat = ref('png')
const hasImage = ref(false)
const history = ref<HistoryAction[]>([])
const currentHistoryIndex = ref(-1)

// Computed
const canUndo = computed(() => currentHistoryIndex.value > 0)
const canRedo = computed(() => currentHistoryIndex.value < history.value.length - 1)

// Methods
const selectTool = (tool: EditorTool) => {
  selectedTool.value = tool
}

const openImage = () => {
  const input = document.createElement('input')
  input.type = 'file'
  input.accept = 'image/*'
  input.onchange = (e: Event) => {
    const file = (e.target as HTMLInputElement).files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const img = new Image()
        img.onload = () => {
          if (canvas.value) {
            const ctx = canvas.value.getContext('2d')
            if (ctx) {
              canvas.value.width = img.width
              canvas.value.height = img.height
              ctx.drawImage(img, 0, 0)
              hasImage.value = true
              addToHistory('Open Image')
            }
          }
        }
        img.src = e.target?.result as string
      }
      reader.readAsDataURL(file)
    }
  }
  input.click()
}

const addToHistory = (name: string) => {
  // Implementation for history management
  history.value.push({ name, undo: () => {}, redo: () => {} })
  currentHistoryIndex.value = history.value.length - 1
}

const jumpToHistory = (index: number) => {
  currentHistoryIndex.value = index
  // Implementation for history navigation
}

const undo = () => {
  if (canUndo.value) {
    currentHistoryIndex.value--
    history.value[currentHistoryIndex.value].undo()
  }
}

const redo = () => {
  if (canRedo.value) {
    currentHistoryIndex.value++
    history.value[currentHistoryIndex.value].redo()
  }
}

const exportImage = () => {
  if (!canvas.value || !hasImage.value) return

  const link = document.createElement('a')
  link.download = `edited-image-${Date.now()}.${exportFormat.value}`
  link.href = canvas.value.toDataURL(`image/${exportFormat.value}`)
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

// Canvas setup
onMounted(() => {
  if (canvas.value) {
    const ctx = canvas.value.getContext('2d')
    if (ctx) {
      // Initialize canvas
      canvas.value.width = canvas.value.offsetWidth
      canvas.value.height = canvas.value.offsetHeight
      
      // Set up event listeners for drawing
      // Implementation for drawing functionality
    }
  }
})
</script>
