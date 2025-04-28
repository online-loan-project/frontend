export const useHttp = async (url, options = {}) => {
  const config = useRuntimeConfig()
  const baseURL = `${config.public.serverApiUrl}/${config.public.apiVersion}`
  const cookie = useCookie('access_token')
  const token = cookie.value

  // Remove body for GET requests
  if (options.method === 'GET') {
    delete options.body
  }

  // Configure request headers
  options = {
    ...options,
    headers: {
      Authorization: `Bearer ${token}`,
      accept: 'application/json',
      // Set Content-Type only if not using FormData
      ...(options.body instanceof FormData ? {} : { 'Content-Type': 'application/json' }),
      ...options.headers,
    },
    // Ensure the body is either FormData or JSON
    body: options.body instanceof FormData ? options.body : JSON.stringify(options.body),

    credentials: 'include', // <-- This will send cookies/auth cross-origin
    mode: 'cors',           // <-- Explicitly set CORS mode
  }

  try {
    return await $fetch(url, { baseURL, ...options })
  } catch (error) {
    console.error('HTTP Request failed:', error)

    // Handle error message display
    if (error.data) {
      // If there's a specific message in the error response
      if (error.data.message) {
        ElMessage.error(error.data.message)
      }
      // If there are validation errors, you might want to show them all
      else if (error.data.errors) {
        const errorMessages = Object.values(error.data.errors).flat().join('\n')
        ElMessage.error(errorMessages)
      }
    } else {
      ElMessage.error(error.message || 'Unknown error occurred')
    }

    throw error
  }
}
