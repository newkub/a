<template>
  <div class="min-h-screen bg-background font-sans flex">
    <AppSidebar />
    <main class="flex-1 p-6">
      <div class="h-[calc(100vh-3rem)]">
        <slot />
      </div>
    </main>
  </div>
</template>