//useRoute
import { useRoute } from 'vue-router'
export default defineNuxtRouteMiddleware(async () => {
  const { value: token } = useCookie('access_token')
  const { value: user } = useCookie('user')

  if (!token) {
    return navigateTo('/login')
  }

  if (!user || user.is_verified !== 1) {
    return navigateTo('/unverified') // Redirect if not verified
  }

  const role = user.role

  const route = useRoute()

  if (route.meta.requiresAdmin && role !== 1) {
    return navigateTo('/unauthorized') // Redirect if not an admin
  }

  if (route.meta.requiresBorrower && role !== 2) {
    return navigateTo('/unauthorized') // Redirect if not a borrower
  }
})
