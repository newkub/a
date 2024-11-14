<template>
  <div class="min-h-screen bg-gray-50 font-sans">
    <AppSidebar />
    <main class="pl-20">
      <div class="max-w-[2000px] mx-auto">
        <slot />
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
// Layout will automatically wrap all pages
</script>