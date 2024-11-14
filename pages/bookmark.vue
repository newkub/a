<template>
  <div class="p-6">
    <!-- Filters -->
    <BookmarkFilter />

    <!-- Card Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-6">
      <BookmarkCard
        v-for="card in cards"
        :key="card.id"
        v-bind="card"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
// Sample data
const cards = [
  {
    id: 1,
    title: 'PDF Annotation & Readwise Integration',
    description: 'Bridge the gap between reading and thinking.',
    thumbnail: 'https://picsum.photos/400/300?random=1',
    tags: ['PDF', 'Integration']
  },
  {
    id: 2,
    title: "Tag's Table & Kanban View",
    description: 'View all project insights at a glance.',
    thumbnail: 'https://picsum.photos/400/300?random=2',
    tags: ['Organization', 'Project']
  },
  {
    id: 3,
    title: 'Nested Whiteboard',
    description: 'Organize learning topics with hierarchies and reusable cards.',
    thumbnail: 'https://picsum.photos/400/300?random=3',
    tags: ['Learning', 'Organization']
  },
  {
    id: 4,
    title: 'Mindmap',
    description: 'Effortlessly map out your learning.',
    thumbnail: 'https://picsum.photos/400/300?random=4',
    tags: ['Learning', 'Mindmap']
  }
]
</script>

<style scoped>
.grid {
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
}
</style>