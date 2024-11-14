<template>
  <div class="space-y-6">
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Model Selection -->
      <div class="lg:col-span-1 bg-white rounded-xl border border-neutral-200 p-6">
        <h3 class="text-lg font-semibold mb-4">AI Models</h3>
        <div class="space-y-3">
          <button
            v-for="model in aiModels"
            :key="model.id"
            @click="selectModel(model)"
            class="w-full flex items-center gap-3 p-3 rounded-lg transition-colors text-left"
            :class="selectedModel?.id === model.id ? 'bg-primary-50' : 'hover:bg-neutral-50'"
          >
            <img :src="model.avatar" :alt="model.name" class="w-10 h-10 rounded-lg object-cover" />
            <div>
              <div class="font-medium">{{ model.name }}</div>
              <div class="text-sm text-neutral-600">{{ model.description }}</div>
            </div>
          </button>
        </div>
      </div>

      <!-- Generation Area -->
      <div class="lg:col-span-2 bg-white rounded-xl border border-neutral-200 p-6">
        <div class="mb-4 space-y-4">
          <div>
            <label class="block text-sm font-medium mb-2">Prompt</label>
            <textarea
              v-model="prompt"
              rows="3"
              placeholder="Describe what you want to generate..."
              class="textarea-base"
            ></textarea>
          </div>
          
          <div>
            <label class="block text-sm font-medium mb-2">Negative Prompt (Optional)</label>
            <textarea
              v-model="negativePrompt"
              rows="2"
              placeholder="Describe what you don't want in the image..."
              class="textarea-base"
            ></textarea>
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium mb-2">Number of Images</label>
              <select v-model="numberOfImages" class="w-full p-2 bg-neutral-50 rounded-lg border border-neutral-200">
                <option v-for="n in 4" :key="n" :value="n">{{ n }}</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium mb-2">Steps</label>
              <select v-model="steps" class="w-full p-2 bg-neutral-50 rounded-lg border border-neutral-200">
                <option v-for="s in [20, 30, 50]" :key="s" :value="s">{{ s }}</option>
              </select>
            </div>
          </div>
        </div>

        <div class="grid grid-cols-2 gap-4 mb-4">
          <template v-if="generatedImages.length">
            <div
              v-for="(image, index) in generatedImages"
              :key="index"
              class="aspect-square bg-neutral-100 rounded-lg relative group"
            >
              <img :src="image" class="w-full h-full object-cover rounded-lg" alt="Generated image" />
              <div class="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                <button 
                  @click="downloadImage(image)"
                  class="btn-secondary"
                >
                  Download
                </button>
              </div>
            </div>
          </template>
          <div v-else class="col-span-2 aspect-video bg-neutral-100 rounded-lg flex items-center justify-center">
            <Icon icon="mdi:image-plus" class="text-4xl text-neutral-400" />
          </div>
        </div>

        <div class="flex gap-4">
          <button 
            @click="generate"
            :disabled="!canGenerate"
            class="btn-primary flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Generate
          </button>
          <button 
            @click="clearImages"
            :disabled="!generatedImages.length"
            class="btn-secondary flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Clear
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { Icon } from '@iconify/vue'

interface AIModel {
  id: string
  name: string
  description: string
  avatar: string
}

const aiModels: AIModel[] = [
  {
    id: 'sd-v1.5',
    name: 'Stable Diffusion v1.5',
    description: 'Balanced quality and speed',
    avatar: '/images/models/sd-v1.5.jpg'
  },
  {
    id: 'sd-v2.1',
    name: 'Stable Diffusion v2.1',
    description: 'Improved image quality',
    avatar: '/images/models/sd-v2.1.jpg'
  },
  {
    id: 'sdxl',
    name: 'SDXL',
    description: 'Latest model with best quality',
    avatar: '/images/models/sdxl.jpg'
  }
]

const selectedModel = ref<AIModel | null>(aiModels[0])
const prompt = ref('')
const negativePrompt = ref('')
const numberOfImages = ref(1)
const steps = ref(30)
const generatedImages = ref<string[]>([])

const canGenerate = computed(() => {
  return selectedModel.value && prompt.value.trim().length > 0
})

const selectModel = (model: AIModel) => {
  selectedModel.value = model
}

const generate = async () => {
  if (!canGenerate.value) return
  
  try {
    // Here you would integrate with your AI image generation service
    // For now, we'll use a placeholder
    const response = await fetch('YOUR_AI_SERVICE_ENDPOINT', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: selectedModel.value?.id,
        prompt: prompt.value,
        negative_prompt: negativePrompt.value,
        num_images: numberOfImages.value,
        steps: steps.value
      })
    })
    
    const data = await response.json()
    generatedImages.value = data.images
  } catch (error) {
    console.error('Error generating images:', error)
  }
}

const downloadImage = async (imageUrl: string) => {
  try {
    const response = await fetch(imageUrl)
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

const clearImages = () => {
  generatedImages.value = []
}
</script>
