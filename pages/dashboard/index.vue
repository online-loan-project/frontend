<script setup>
definePageMeta({
  layout: 'default',
  middleware: ['authenticated', 'dashboard-redirect-global'],
})

const user = useCookie('user').value

// Single redirection point
function redirectBasedOnRole() {
  if (!user) {
    ElMessage.error('You are not logged in')
    return navigateTo('/login')
  }
  //check telegram
  if (!user.telegram_chat_id) {
    ElMessage.error('Please connect your telegram account')
    return navigateTo('/telegram')
  }
  if (user.role == 2) {
    navigateTo('/borrower/dashboard')
  } else if (user.role == 1) {
    navigateTo('/admin/dashboard')
  }
}

// Run only on client side
onMounted(() => {
  redirectBasedOnRole()
})
</script>

<template>
  <div class="text-center p-10">Redirecting...</div>
</template>
