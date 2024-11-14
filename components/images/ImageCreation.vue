<template>
  <div class="space-y-6">
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Left Column: Input Controls -->
      <div class="space-y-6">
        <!-- Text to Image -->
        <div class="bg-white rounded-xl border border-neutral-200 p-6">
          <div class="flex items-start justify-between mb-4">
            <div>
              <h3 class="text-lg font-semibold mb-1">Text to Image</h3>
              <p class="text-sm text-neutral-600">Transform your text descriptions into stunning visuals</p>
            </div>
            <Icon icon="mdi:text-box-edit" class="text-2xl text-primary-600" />
          </div>
          <textarea
            v-model="prompt"
            rows="4"
            placeholder="Describe the image you want to create..."
            class="textarea-base"
          ></textarea>
          <button 
            @click="generateImage"
            class="btn-primary mt-4 w-full"
          >
            Generate Image
          </button>
        </div>

        <!-- Style Controls -->
        <div class="bg-white rounded-xl border border-neutral-200 p-6">
          <h3 class="text-lg font-semibold mb-4">Style Controls</h3>
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium mb-2">Art Style</label>
              <select 
                v-model="selectedStyle"
                class="w-full p-2 bg-neutral-50 rounded-lg border border-neutral-200"
              >
                <option v-for="style in artStyles" :key="style" :value="style">
                  {{ style }}
                </option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium mb-2">Resolution</label>
              <div class="flex gap-2">
                <button 
                  v-for="res in resolutions" 
                  :key="res"
                  @click="selectedResolution = res"
                  class="flex-1 p-2 rounded-lg text-sm"
                  :class="selectedResolution === res ? 'bg-primary-600 text-white' : 'bg-neutral-50 border border-neutral-200'"
                >
                  {{ res }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Right Column: Output -->
      <div class="bg-white rounded-xl border border-neutral-200 p-6">
        <h3 class="text-lg font-semibold mb-4">Generated Output</h3>
        <div 
          class="aspect-square bg-neutral-100 rounded-lg mb-4 flex items-center justify-center"
          :class="{'relative': generatedImage}"
        >
          <template v-if="generatedImage">
            <img :src="generatedImage" class="img-round" alt="Generated image" />
          </template>
          <Icon v-else icon="mdi:image-plus" class="text-4xl text-neutral-400" />
        </div>
        <button 
          @click="downloadImage"
          :disabled="!generatedImage"
          class="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Download Image
        </button>
      </div>
    </div>

    <!-- Recent Creations -->
    <div class="bg-white rounded-xl border border-neutral-200 p-6">
      <h3 class="text-lg font-semibold mb-4">Recent Creations</h3>
      <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        <div 
          v-for="(image, i) in recentCreations" 
          :key="i"
          class="aspect-square rounded-lg bg-neutral-100 hover:opacity-80 transition-opacity cursor-pointer"
        >
          <img :src="image" class="img-round img-hover" alt="Recent creation" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Icon } from '@iconify/vue'

const prompt = ref('')
const selectedStyle = ref('Realistic')
const selectedResolution = ref('512x512')
const generatedImage = ref('')
const recentCreations = ref<string[]>([])

const artStyles = [
  'Realistic',
  'Artistic',
  'Abstract',
  'Cartoon',
  'Watercolor',
  'Oil Painting',
  'Digital Art',
  'Sketch'
]

const resolutions = ['512x512', '768x768', '1024x1024']

const generateImage = async () => {
  if (!prompt.value) return
  
  try {
    // Here you would integrate with your AI image generation service
    // For now, we'll use a placeholder
    const response = await fetch('YOUR_AI_SERVICE_ENDPOINT', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt: prompt.value,
        style: selectedStyle.value,
        resolution: selectedResolution.value
      })
    })
    
    const data = await response.json()
    generatedImage.value = data.imageUrl
    recentCreations.value.unshift(data.imageUrl)
    
    if (recentCreations.value.length > 10) {
      recentCreations.value.pop()
    }
  } catch (error) {
    console.error('Error generating image:', error)
  }
}

const downloadImage = async () => {
  if (!generatedImage.value) return
  
  try {
    const response = await fetch(generatedImage.value)
    const blob = await response.blob()
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `generated-image-${Date.now()}.png`
    document.body.appendChild(a)
    a.click()
    window.URL.revokeObjectURL(url)
    a.remove()
  } catch (error) {
    console.error('Error downloading image:', error)
  }
}
</script>
