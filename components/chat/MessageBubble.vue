<template>
  <div 
    class="p-4 rounded-xl"
    :class="variant === 'primary' ? 'bg-primary-50 text-primary-900' : 'bg-neutral-100 text-neutral-900'"
  >
    <div class="prose prose-sm max-w-none" v-html="renderedContent" />
  </div>
</template>

<script setup lang="ts">
import MarkdownIt from 'markdown-it'

const md = new MarkdownIt({
  html: true,
  breaks: true,
  linkify: true
})

const props = defineProps<{
  variant: 'primary' | 'neutral'
  content: string
}>()

const renderedContent = computed(() => md.render(props.content))
</script>

<style scoped>
.prose {
  line-height: 1.6;
}

.prose :deep(p) {
  margin-top: 0.5em;
  margin-bottom: 0.5em;
}

.prose :deep(p:first-child) {
  margin-top: 0;
}

.prose :deep(p:last-child) {
  margin-bottom: 0;
}
</style>