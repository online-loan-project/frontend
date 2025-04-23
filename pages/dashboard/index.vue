<script setup>
definePageMeta({
  layout: 'default',
  middleware: ['authenticated'],
  // requiresBorrower: true,
  // requiresAdmin: true
})
</script>

<template>
  <div>
    <h1>Home</h1>
    <el-button type="primary" @click="navigateTo('/live')">Go to Face</el-button>
  </div>
</template>

<style scoped>

</style>
