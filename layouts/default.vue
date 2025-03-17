<template>
  <div class="layout flex h-screen overflow-y-auto">
    <div class="flex flex-col">
      <main ref="mainContent" class="p-4">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from '~/store/auth'
import { onMounted } from 'vue'

definePageMeta({
  middleware: ['authenticated'],
})
const { isLoggedIn } = useAuthenticate()
onMounted(async () => {
  if (isLoggedIn.value) {
    // await useAuthStore().getMe()
  }
})
</script>

<style scoped></style>
