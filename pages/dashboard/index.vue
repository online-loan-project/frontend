<script setup>
definePageMeta({
  layout: 'default',
  middleware: ['authenticated', 'dashboard-redirect-global'],
  // requiresBorrower: true,
  // requiresAdmin: true
})
</script>

<template>
  <div class="text-center p-10">Redirecting...</div>
</template>

<style scoped>
</style>
