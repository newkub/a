<template>
  <div class="p-8">
    <h1 class="text-4xl font-bold mb-4">Welcome to Wrikka OS</h1>
    <p class="text-gray-600 mb-8">Your intelligent workspace powered by AI. Create, collaborate, and innovate with advanced tools and features.</p>
    
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <!-- AI Chat -->
      <div class="bg-white rounded-xl p-6 shadow-sm">
        <div class="i-mdi-chat text-4xl mb-4" />
        <h2 class="text-xl font-semibold mb-2">AI Chat</h2>
        <p class="text-gray-600">Engage with advanced AI models for intelligent conversations and assistance.</p>
      </div>

      <!-- Smart Canvas -->
      <div class="bg-white rounded-xl p-6 shadow-sm">
        <div class="i-mdi-pencil text-4xl mb-4" />
        <h2 class="text-xl font-semibold mb-2">Smart Canvas</h2>
        <p class="text-gray-600">Create and organize your ideas visually with our interactive canvas.</p>
      </div>

      <!-- Bot Integration -->
      <div class="bg-white rounded-xl p-6 shadow-sm">
        <div class="i-mdi-robot text-4xl mb-4" />
        <h2 class="text-xl font-semibold mb-2">Bot Integration</h2>
        <p class="text-gray-600">Access and manage various AI bots for specialized tasks.</p>
      </div>
    </div>

    <div class="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Quick Start -->
      <div class="bg-white rounded-xl p-6 shadow-sm">
        <h2 class="text-2xl font-semibold mb-4">Quick Start</h2>
        <div class="space-y-4">
          <div class="flex items-center space-x-3">
            <div class="i-mdi-chat text-2xl" />
            <span>Start a Chat</span>
          </div>
        </div>
      </div>

      <!-- Recent Activity -->
      <div class="bg-white rounded-xl p-6 shadow-sm">
        <h2 class="text-2xl font-semibold mb-4">Recent Activity</h2>
        <div class="space-y-4">
          <div class="flex items-center space-x-3">
            <div class="i-mdi-chat text-2xl" />
            <span>Chat Session: Project Planning</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>