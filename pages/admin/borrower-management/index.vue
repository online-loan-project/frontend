<script setup>
import { ref, onMounted } from 'vue'
import { Edit, Delete, Search, User, Check, Close } from '@element-plus/icons-vue'
import { useAdminUserManagementStore } from '~/store/admin/admin_user_management.js'

definePageMeta({
  layout: 'admin',
  middleware: ['authenticated'],
})

const borrowerStore = useAdminUserManagementStore()
const { index } = borrowerStore

// State
const borrowers = ref([])
const loading = ref(false)
const currentPage = ref(1)
const totalPages = ref(1)
const itemsPerPage = ref(10)
const searchQuery = ref('')
const statusFilter = ref('all') // 'all', 'active', 'inactive'

// Status counts from API
const statusCounts = ref({
  active: 0,
  inactive: 0,
  total: 0
})

// Fetch borrowers with pagination and filters
const fetchBorrowers = async (page = 1) => {
  loading.value = true
  try {
    const params = {
      page,
      per_page: itemsPerPage.value,
      search: searchQuery.value,
      status: statusFilter.value === 'all' ? undefined : statusFilter.value
    }

    const response = await index(params)
    borrowers.value = response.borrowers.data
    currentPage.value = response.borrowers.current_page
    totalPages.value = response.borrowers.last_page
    itemsPerPage.value = response.borrowers.per_page
    statusCounts.value = {
      active: response.active_count,
      inactive: response.inactive_count,
      total: response.total_count
    }
  } catch (error) {
    console.error('Failed to fetch borrowers:', error)
    ElNotification({
      title: 'Error',
      message: 'Failed to fetch borrowers',
      type: 'error',
    })
  } finally {
    loading.value = false
  }
}

// Handle page change
const handlePageChange = (page) => {
  currentPage.value = page
  fetchBorrowers(page)
}

// Handle search
const handleSearch = () => {
  currentPage.value = 1
  fetchBorrowers()
}

// Handle filter change
const handleFilterChange = () => {
  currentPage.value = 1
  fetchBorrowers()
}

// Format date
const formatDate = (dateString) => {
  if (!dateString) return '-'
  return new Date(dateString).toLocaleDateString()
}

// Get status text and type
const getUserStatus = (user) => {
  if (!user) return { text: 'Inactive', type: 'warning' }
  return user.status === '1'
    ? { text: 'Active', type: 'success' }
    : { text: 'Inactive', type: 'warning' }
}

// Get full name
const getFullName = (borrower) => {
  return `${borrower.first_name} ${borrower.last_name}`
}

// Initial data fetch
onMounted(() => {
  fetchBorrowers()
})
</script>

<template>
  <div class="container mx-auto px-4 py-8">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold text-gray-800">Borrower Management</h1>

      <div class="flex space-x-4">
        <el-input
          v-model="searchQuery"
          placeholder="Search borrowers..."
          class="w-64"
          clearable
          @clear="handleSearch"
          @keyup.enter="handleSearch"
        >
          <template #append>
            <el-button :icon="Search" @click="handleSearch" />
          </template>
        </el-input>

        <el-select
          v-model="statusFilter"
          placeholder="Filter by status"
          class="w-40"
          @change="handleFilterChange"
        >
          <el-option label="All Borrowers" value="all" />
          <el-option label="Active" value="active" />
          <el-option label="Inactive" value="inactive" />
        </el-select>
      </div>
    </div>

    <!-- Status Cards Row -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">

      <el-card shadow="hover" class="summary-card">
        <div class="flex items-center">
          <div class="flex p-3 rounded-full bg-blue-50 mr-4">
            <el-icon class="text-blue-500 text-xl"><Check /></el-icon>
          </div>
          <div>
            <p class="text-sm text-gray-500">Active Borrowers</p>
            <p class="text-2xl font-bold">{{ statusCounts.active || 0 }}</p>
          </div>
        </div>
      </el-card>

      <el-card shadow="hover" class="summary-card">
        <div class="flex items-center">
          <div class="flex p-3 rounded-full bg-blue-50 mr-4">
            <el-icon class="text-blue-500 text-xl"><Close /></el-icon>
          </div>
          <div>
            <p class="text-sm text-gray-500">Inactive Borrowers</p>
            <p class="text-2xl font-bold">{{ statusCounts.inactive || 0 }}</p>
          </div>
        </div>
      </el-card>

      <el-card shadow="hover" class="summary-card">
        <div class="flex items-center">
          <div class="flex p-3 rounded-full bg-blue-50 mr-4">
            <el-icon class="text-blue-500 text-xl"><User /></el-icon>
          </div>
          <div>
            <p class="text-sm text-gray-500">Total Borrowers</p>
            <p class="text-2xl font-bold">{{ statusCounts.total || 0 }}</p>
          </div>
        </div>
      </el-card>
    </div>

    <el-card shadow="never" class="mb-6">
      <el-table :data="borrowers" v-loading="loading" empty-text="No borrowers found">
        <el-table-column prop="id" label="ID" width="80" />
        <el-table-column label="Name" width="180">
          <template #default="{ row }">
            <div class="flex items-center">
              <el-avatar :src="row.image" class="mr-3" size="small">
                {{ row.first_name.charAt(0) }}{{ row.last_name.charAt(0) }}
              </el-avatar>
              <span>{{ getFullName(row) }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="User Info">
          <template #default="{ row }">
            <div v-if="row.user">
              <div class="font-medium">{{ row.user.email }}</div>
              <div class="text-sm text-gray-500">{{ row.user.phone }}</div>
            </div>
            <span v-else class="text-gray-400">No user account</span>
          </template>
        </el-table-column>
        <el-table-column label="Status" width="120">
          <template #default="{ row }">
            <el-tag :type="getUserStatus(row.user).type" size="small">
              {{ getUserStatus(row.user).text }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="Details">
          <template #default="{ row }">
            <div class="text-sm">
              <div>DOB: {{ formatDate(row.dob) }}</div>
              <div class="capitalize">{{ row.gender }}</div>
              <div class="text-gray-500 truncate max-w-xs">{{ row.address }}</div>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="Joined" width="120">
          <template #default="{ row }">
            {{ formatDate(row.created_at) }}
          </template>
        </el-table-column>
        <el-table-column label="Actions" width="120" align="right">
          <template #default="{ row }">
            <el-button size="small" :icon="Edit" circle />
            <el-button
              size="small"
              :icon="Delete"
              type="danger"
              circle
            />
          </template>
        </el-table-column>
      </el-table>

      <div class="flex justify-center mt-6">
        <el-pagination
          v-model:current-page="currentPage"
          :page-size="itemsPerPage"
          :total="borrowers.total || 0"
          layout="prev, pager, next"
          @current-change="handlePageChange"
        />
      </div>
    </el-card>
  </div>
</template>