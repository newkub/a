<template>
  <div class="p-8">
    <div class="flex justify-between items-center mb-8">
      <div>
        <h1 class="text-2xl font-bold mb-2">Image Generation</h1>
        <p class="text-gray-600">Create and manage AI-generated images</p>
      </div>
      <button class="btn-primary">
        <span class="i-mdi-plus mr-2" />
        New Image
      </button>
    </div>

    <!-- Image Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      <div 
        v-for="i in 8" 
        :key="i"
        class="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
      >
        <div class="aspect-square bg-gray-100">
          <!-- Placeholder for image -->
          <div class="w-full h-full flex items-center justify-center text-gray-400">
            <span class="i-mdi-image text-4xl" />
          </div>
        </div>
        <div class="p-4">
          <h3 class="font-medium mb-1">Generated Image {{ i }}</h3>
          <p class="text-sm text-gray-500 mb-3">Created on March 15, 2024</p>
          <div class="flex items-center space-x-2">
            <button class="btn-ghost p-2">
              <span class="i-mdi-download text-xl" />
            </button>
            <button class="btn-ghost p-2">
              <span class="i-mdi-share text-xl" />
            </button>
            <button class="btn-ghost p-2">
              <span class="i-mdi-delete text-xl" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>