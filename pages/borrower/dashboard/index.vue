<script setup>
import { ref } from 'vue'

definePageMeta({
  layout: 'borrower',
  middleware: ['authenticated'],
})

import { useRequestLoanStore } from '~/store/request_loan.js'

const now = new Date()

const { value: user } = useCookie('user')
// Sample data matching your API response
const apiResponse = ref({})
const loading = ref(false)

const requestLoanStore = useRequestLoanStore()
const { getRequestLoan } = requestLoanStore

const fetchData = async (page = 1) => {
  loading.value = true
  try {
    const response = await getRequestLoan({ page: page })
    apiResponse.value = response
  } finally {
    loading.value = false
  }
}

// Initial data fetch
onMounted(() => {
  fetchData()
})
</script>

<template>
  <h1 class="mb-4">Welcome Back</h1>

  <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
    <el-card shadow="hover" class="summary-card">
      <div class="flex flex-row items-center"> <!-- Changed to column layout -->
        <div class="flex items-center justify-center rounded-full mr-2">
          <el-image
            v-if="user && user.profile && user.profile.image"
            :src="user.profile.image"
            class="w-10 h-10 rounded-full border-2 border-primary-600 shadow-md transition-all"
            fit="contain"
            :preview-src-list="[user.profile.image]"
          />
        </div>
        <div class="flex flex-col">
          <p class="font-bold my-auto"> <!-- Added margin-top -->
            {{ user.profile.first_name }} {{ user.profile.last_name }}
          </p>
          <p class="text-sm text-gray-500">Last Login : {{ now }}</p>
        </div>
      </div>
    </el-card>

    <el-card shadow="hover" class="summary-card">
      <div class="flex items-center">
        <div class="p-3 rounded-full bg-blue-50 mr-4">
          <i class="i-material-symbols-list text-blue-500 text-xl"></i>
        </div>
        <div>
          <p class="text-sm text-gray-500">Your Credit Score</p>
          <p class="text-2xl font-bold">
            {{ apiResponse?.summary?.total_requests }}
          </p>
        </div>
      </div>
    </el-card>
  </div>

  <h1 class="mb-4">Loan Statistics</h1>
  <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
    <el-card shadow="hover" class="summary-card">
      <div class="flex items-center">
        <div class="p-3 rounded-full bg-blue-50 mr-4">
          <i class="i-material-symbols-list text-blue-500 text-xl"></i>
        </div>
        <div>
          <p class="text-sm text-gray-500">Total Requests</p>
          <p class="text-2xl font-bold">
            {{ apiResponse?.summary?.total_requests }}
          </p>
        </div>
      </div>
    </el-card>

    <el-card shadow="hover" class="summary-card">
      <div class="flex items-center">
        <div class="p-3 rounded-full bg-purple-50 mr-4">
          <i
            class="i-material-symbols-attach-money text-purple-500 text-xl"
          ></i>
        </div>
        <div>
          <p class="text-sm text-gray-500">Active Loan</p>
          <p class="text-2xl font-bold">
            ${{ apiResponse?.summary?.total_request_amount }}
          </p>
        </div>
      </div>
    </el-card>

    <el-card shadow="hover" class="summary-card">
      <div class="flex items-center">
        <div class="p-3 rounded-full bg-yellow-50 mr-4">
          <i
            class="i-material-symbols-pending-actions text-yellow-500 text-xl"
          ></i>
        </div>
        <div>
          <p class="text-sm text-gray-500">Total Loan Amount</p>
          <p class="text-2xl font-bold">
            {{ apiResponse?.summary?.total_request_amount }}
          </p>
        </div>
      </div>
    </el-card>

    <el-card shadow="hover" class="summary-card">
      <div class="flex items-center">
        <div class="p-3 rounded-full bg-green-50 mr-4">
          <i class="i-material-symbols-check-circle text-green-500 text-xl"></i>
        </div>
        <div>
          <p class="text-sm text-gray-500">Total Repayment</p>
          <p class="text-2xl font-bold">
            {{ apiResponse?.summary?.status_counts?.approved }}
          </p>
        </div>
      </div>
    </el-card>
  </div>
</template>

<style scoped></style>
