<template>
  <div class="min-h-screen bg-background font-sans flex">
    <AppSidebar />
    <main class="flex-1 pl-20 p-6">
      <div class="max-w-7xl mx-auto">
        <slot />
      </div>
    </main>
  </div>
</template>