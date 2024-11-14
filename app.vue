<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup>
const route = useRoute()
const router = useRouter()

onMounted(() => {
  if (route.path === '/') {
    router.push('/chat')
  }
})
</script>