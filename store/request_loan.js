import { defineStore } from 'pinia'
import RequestLoanService from '~/services/RequestLoanService.js'

export const useRequestLoanStore = defineStore('request-loan', () => {
  const requestLoan = ref({})
  const requestLoanService = RequestLoanService.getInstance()

  const getRequestLoan = async (params) => {
    try {
      const { data } = await requestLoanService.index(params)
      requestLoan.value = data || {}
      return data
    } catch (error) {
      ElMessage.error(error.message || 'Get Request Loan failed')
      throw new Error(`Get Request Loan failed: ${error.message || 'Unknown error'}`)
    }
  }

  //storeNid
  const storeNid = async (params) => {
    try {
      const { data } = await requestLoanService.storeNid(params)
      requestLoan.value = data || {}
      return data
    } catch (error) {
      ElMessage.error(error.message || 'Get Request Loan failed')
      throw new Error(`Get Request Loan failed: ${error.message || 'Unknown error'}`)
    }
  }

  //store
  const storeRequestLoan = async (params) => {
    try {
      const { data } = await requestLoanService.store(params)
      requestLoan.value = data || {}
      return data
    } catch (error) {
      ElMessage.error(error.message || 'Get Request Loan failed')
      throw new Error(`Get Request Loan failed: ${error.message || 'Unknown error'}`)
    }
  }

  return {
    RequestLoan: computed(() => requestLoan.value),
    getRequestLoan,
    storeNid,
    storeRequestLoan,
  }
})
