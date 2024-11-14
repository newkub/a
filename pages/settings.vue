<template>
  <div class="min-h-[calc(100vh-2rem)] bg-white flex">
    <SettingsSidebar
      :selected-section="selectedSection"
      @select="selectedSection = $event"
      class="flex-shrink-0"
    />
    <SettingsContent :section="selectedSection" />
  </div>
</template>

<script setup lang="ts">
const selectedSection = ref('general')
</script>