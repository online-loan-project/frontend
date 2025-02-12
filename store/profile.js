import ProfileService from '~/services/ProfileService.js'
import { ElMessage } from 'element-plus'

const profileService = ProfileService.getInstance()

export const useProfileStore = defineStore('profile', () => {
  const user = ref(null)

  //getMe function
  const getProfile = async (params = {}) => {
    try {
      const { data } = await profileService.getProfile(params)
      if (!data) {
        throw new Error('No data returned')
      }
      user.value = data
      return data
    } catch (error) {
      ElMessage.error(error.message || 'Login failed')
      throw new Error(`Login failed: ${error.message || 'Unknown error'}`)
    }
  }

  //updateProfile function
  const updateProfile = async (req) => {
    try {
      const { data } = await profileService.updateProfile(req)
      return data
    } catch (error) {
      ElMessage.error(error.message || 'Update profile failed')
      throw new Error(`Update profile failed: ${error.message || 'Unknown error'}`)
    }
  }

  return {
    user: computed(() => user.value),
    getProfile,
    updateProfile
  }
})
