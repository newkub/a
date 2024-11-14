<template>
  <div ref="containerRef" class="tldraw-container" style="width: 100%; height: 100%;">
    <div ref="editorRef" style="width: 100%; height: 100%;" />
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { Tldraw, TldrawProps, createTldrawUI, TldrawUiProps } from '@tldraw/tldraw'
import { createRoot } from 'react-dom/client'

const containerRef = ref<HTMLDivElement>()
const editorRef = ref<HTMLDivElement>()
let root: ReturnType<typeof createRoot> | null = null

onMounted(() => {
  if (!editorRef.value) return

  root = createRoot(editorRef.value)
  
  const props: TldrawProps & TldrawUiProps = {
    persistenceKey: 'wrikka-tldraw',
    autoFocus: true
  }

  root.render(<Tldraw {...props} />)
})

onUnmounted(() => {
  if (root) {
    root.unmount()
    root = null
  }
})
</script>

<style scoped>
.tldraw-container {
  position: relative;
  background: white;
  touch-action: none;
}</style>