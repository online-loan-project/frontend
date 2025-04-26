<script setup>
definePageMeta({
  layout: 'default',
  middleware: ['authenticated'],
})

onMounted(() => {
  // Force redirect immediately when component mounts
  redirectBasedOnRole()
})

// Also run the redirect when the page is first loaded (client-side navigation)
if (process.client) {
  redirectBasedOnRole()
}

function redirectBasedOnRole() {
  const user = useCookie('user').value

  // If no user, redirect to login
  if (!user) {
    return navigateTo('/login')
  }

  // Redirect based on role
  switch (user.role) {
    case 1:
      return navigateTo('/admin/dashboard')
    case 2:
      return navigateTo('/borrower/dashboard')
    default:
      // Handle unknown roles - maybe redirect to login or error page
      return navigateTo('/login')
  }
}
</script>

<template>
  <div class="text-center p-10">Redirecting...</div>
</template>

<style scoped>
</style>
