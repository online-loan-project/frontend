import { defineStore } from 'pinia'
import AdminLoanService from '~/services/AdminLoanService.js'

export const useAdminLoanStore = defineStore('admin_loans', () => {
  const requestLoan = ref({})
  const adminLoanService = AdminLoanService.getInstance()

  const getLoan = async (params) => {
    try {
      const { data } = await adminLoanService.index(params)
      requestLoan.value = data || {}
      return data
    } catch (error) {
      ElMessage.error(error.message || 'Get Loan failed')
      throw new Error(`Get Loan failed: ${error.message || 'Unknown error'}`)
    }
  }

  return {
    RequestLoan: computed(() => requestLoan.value),
    getLoan,
  }
})
