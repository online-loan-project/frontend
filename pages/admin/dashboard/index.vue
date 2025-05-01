<script setup>
import { useDashboardStore } from '~/store/dashboard.js'

definePageMeta({
  layout: 'admin',
  middleware: ['authenticated'],
})

import { Bar, Line, Pie } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, ArcElement, PointElement, LineElement } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, ArcElement, PointElement, LineElement)

const now = new Date()

const { value: user } = useCookie('user')
const apiResponse = ref({})
const loading = ref(false)

const requestLoanStore = useDashboardStore()
const { getDashboard } = requestLoanStore

const fetchData = async (page = 1) => {
  loading.value = true
  try {
    const response = await getDashboard({ page: page })
    apiResponse.value = response
    prepareChartData(response)
  } finally {
    loading.value = false
  }
}

console.log(apiResponse.value.total_unpaid)
// Chart data and options
const loanStatusChart = ref({
  data: {
    labels: ['Unpaid', 'Paid'],
    datasets: [
      {
        label: 'Loan Applications',
        backgroundColor: ['#FFCE56', '#36A2EB'],
        data: [apiResponse.value.total_unpaid, apiResponse.value.total_paid]
      }
    ]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Loan Status Distribution'
      }
    }
  }
})

const monthlyTrendsChart = ref({
  data: {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Loan Applications',
        backgroundColor: '#36A2EB',
        borderColor: '#36A2EB',
        data: [12, 19, 3, 5, 2, 3, 15, 8, 10, 7, 12, 9]
      },
      {
        label: 'Approved Loans',
        backgroundColor: '#4BC0C0',
        borderColor: '#4BC0C0',
        data: [8, 12, 2, 3, 1, 2, 10, 6, 7, 5, 9, 6]
      }
    ]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Monthly Loan Trends'
      }
    }
  }
})

const loanAmountsChart = ref({
  data: {
    labels: ['< $100', '$100-$200', '$200-$500', '$500-$1k', '> $1k'],
    datasets: [
      {
        label: 'Number of Loans',
        backgroundColor: '#FF9F40',
        data: [15, 25, 10, 5, 2]
      }
    ]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Loan Amount Distribution'
      }
    }
  }
})

const prepareChartData = (response) => {
  if (response?.summary?.status_counts) {
    loanStatusChart.value.data.datasets[0].data = [
      response.summary.status_counts.pending || 0,
      response.summary.status_counts.approved || 0,
      response.summary.status_counts.rejected || 0,
      response.summary.status_counts.completed || 0
    ]
  }
}

// Initial data fetch
onMounted(() => {
  fetchData()
})
</script>

<template>
  <div class="mb-4">
    <h1 class="text-2xl font-bold">Admin Dashboard</h1>
    <p class="text-gray-600">Overview of platform performance and loan activities</p>
  </div>

  <!-- User Profile and Quick Stats -->
  <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
    <el-card shadow="hover" class="summary-card">
      <div class="flex flex-row items-center">
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
          <p class="font-bold my-auto">
            {{ user.profile.first_name }} {{ user.profile.last_name }}
          </p>
          <p class="text-sm text-gray-500">Last Login : {{ now.toLocaleString() }}</p>
        </div>
      </div>
    </el-card>

    <el-card shadow="hover" class="summary-card">
      <div class="flex items-center">
        <div class="p-3 rounded-full bg-blue-50 mr-4">
          <i class="i-material-symbols-list text-blue-500 text-xl"></i>
        </div>
        <div>
          <p class="text-sm text-gray-500">Total Users</p>
          <p class="text-2xl font-bold">
            {{ apiResponse?.total_user || '0' }}
          </p>
        </div>
      </div>
    </el-card>
  </div>

  <!-- Loan Statistics -->
  <h2 class="mb-4 text-xl font-semibold">Loan Statistics</h2>
  <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
    <el-card shadow="hover" class="summary-card">
      <div class="flex items-center">
        <div class="p-3 rounded-full bg-blue-50 mr-4">
          <i class="i-material-symbols-list text-blue-500 text-xl"></i>
        </div>
        <div>
          <p class="text-sm text-gray-500">Total Requests</p>
          <p class="text-2xl font-bold">
            {{ apiResponse?.total_request_loan || '0' }}
          </p>
        </div>
      </div>
    </el-card>

    <el-card shadow="hover" class="summary-card">
      <div class="flex items-center">
        <div class="p-3 rounded-full bg-purple-50 mr-4">
          <i class="i-material-symbols-attach-money text-purple-500 text-xl"></i>
        </div>
        <div>
          <p class="text-sm text-gray-500">Active Loans</p>
          <p class="text-2xl font-bold">
            {{ apiResponse?.total_active_loan || '0' }}
          </p>
        </div>
      </div>
    </el-card>

    <el-card shadow="hover" class="summary-card">
      <div class="flex items-center">
        <div class="p-3 rounded-full bg-yellow-50 mr-4">
          <i class="i-material-symbols-pending-actions text-yellow-500 text-xl"></i>
        </div>
        <div>
          <p class="text-sm text-gray-500">Total Revenue</p>
          <p class="text-2xl font-bold">
            ${{ (apiResponse?.total_revenue || 0).toLocaleString() }}
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
          <p class="text-sm text-gray-500">Total Repayments</p>
          <p class="text-2xl font-bold">
            ${{ (apiResponse?.total_loan_repayment || 0).toLocaleString() }}
          </p>
        </div>
      </div>
    </el-card>
  </div>

  <!-- Charts Section -->
  <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
    <!-- Loan Status Distribution -->
    <el-card shadow="hover" class="p-4">
      <div class="h-64">
        <Pie
          :data="loanStatusChart.data"
          :options="loanStatusChart.options"
        />
      </div>
      <div class="mt-4 text-center">
        <p class="text-sm text-gray-500">Loan application status breakdown</p>
      </div>
    </el-card>

    <!-- Monthly Trends -->
    <el-card shadow="hover" class="p-4">
      <div class="h-64">
        <Line
          :data="monthlyTrendsChart.data"
          :options="monthlyTrendsChart.options"
        />
      </div>
      <div class="mt-4 text-center">
        <p class="text-sm text-gray-500">Monthly loan application and approval trends</p>
      </div>
    </el-card>
  </div>

  <!-- Additional Data Section -->
  <div class="grid grid-cols-1 gap-6 mb-8">
    <!-- Loan Amount Distribution -->
    <el-card shadow="hover" class="p-4">
      <div class="h-64">
        <Bar
          :data="loanAmountsChart.data"
          :options="loanAmountsChart.options"
        />
      </div>
      <div class="mt-4 text-center">
        <p class="text-sm text-gray-500">Distribution of loans by amount ranges</p>
      </div>
    </el-card>
  </div>

  <!-- Top Borrowers -->
  <h2 class="mb-4 text-xl font-semibold">Top Borrowers</h2>
  <el-card shadow="hover">
    <el-table :data="apiResponse?.top_borrowers || []" style="width: 100%">
      <el-table-column prop="rank" label="Rank" width="80" />
      <el-table-column prop="name" label="Borrower" />
      <el-table-column prop="loans_taken" label="Loans Taken" width="120" />
      <el-table-column prop="total_borrowed" label="Total Borrowed" width="180">
        <template #default="{ row }">
          ${{ row.total_borrowed?.toLocaleString() || '0' }}
        </template>
      </el-table-column>
      <el-table-column prop="repayment_rate" label="Repayment Rate" width="150">
        <template #default="{ row }">
          <el-progress :percentage="row.repayment_rate || 0" :color="row.repayment_rate >= 90 ? '#67C23A' : row.repayment_rate >= 70 ? '#E6A23C' : '#F56C6C'" />
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<style scoped>
.summary-card {
  @apply transition-all duration-300 hover:shadow-lg;
}

.summary-card:hover {
  transform: translateY(-2px);
}

.el-card {
  @apply rounded-lg;
}

h1, h2 {
  @apply text-gray-800;
}
</style>
