<script setup>
definePageMeta({
  layout: 'loan',
})

// Dummy data structure that matches what your API would return
const dashboardData = ref({
  credit_score: 200,
  next_payment: {
    amount: 200,
    due_date: '10th April'
  },
  repayment_schedule: [
    {
      date: '10th April',
      amount: 200,
      status: 'pending'
    },
    {
      date: '10th March',
      amount: 200,
      status: 'paid'
    },
    {
      date: '10th February',
      amount: 200,
      status: 'paid'
    }
  ]
})

const navigateToLoanDetails = () => {
  navigateTo('/borrower/loan-details') // Adjust this path to your actual loan details page
}
</script>

<template>
<<<<<<<< HEAD:pages/borrower/loan/index.vue
  <div>
    Borrower loan page
========
  <div class="dashboard-container p-6 max-w-4xl mx-auto">
    <h1 class="text-3xl font-bold mb-8">Dashboard</h1>
    
    <!-- Credit Score Card -->
    <div class="bg-dark-blue rounded-lg shadow-md p-6 mb-6 text-white">
      <h2 class="text-xl font-semibold mb-4">Credit Score</h2>
      <div class="flex items-center">
        <div class="text-5xl font-bold text-white mr-4">
          {{ dashboardData.credit_score }}
        </div>
        <div class="text-sm text-gray-200">
          <p>Your current credit score</p>
          <p class="text-blue-300 mt-1 hover:underline cursor-pointer">View score history →</p>
        </div>
      </div>
    </div>

    <!-- Next Payment Card -->
    <div class="bg-dark-blue rounded-lg shadow-md p-6 mb-8 text-white">
      <h2 class="text-xl font-semibold mb-4">Next Payment</h2>
      <div class="flex justify-between items-center">
        <div>
          <div class="text-3xl font-bold">${{ dashboardData.next_payment.amount }}</div>
          <div class="text-gray-200 mt-2">Due: {{ dashboardData.next_payment.due_date }}</div>
        </div>
      </div>
    </div>

    <div class="border-t border-gray-200 my-6"></div>

    <!-- Loan Details Section -->
    <div class="mb-8">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-2xl font-bold">Loan Detail</h2>
        <button 
          @click="navigateToLoanDetails"
          class="bg-dark-blue hover:bg-dark-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
        >
          View Full Details
        </button>
      </div>
      
      <!-- Repayment Schedule -->
      <div class="bg-white rounded-lg shadow-md p-6">
        <h3 class="text-lg font-semibold mb-4">Repayment Schedule</h3>
        
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-dark-blue text-white">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Date</th>
                <th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Amount</th>
                <th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="(payment, index) in dashboardData.repayment_schedule" :key="index">
                <td class="px-6 py-4 whitespace-nowrap">{{ payment.date }}</td>
                <td class="px-6 py-4 whitespace-nowrap">${{ payment.amount }}</td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span 
                    :class="{
                      'px-2 inline-flex text-xs leading-5 font-semibold rounded-full': true,
                      'bg-yellow-100 text-yellow-800': payment.status === 'pending',
                      'bg-green-100 text-green-800': payment.status === 'paid'
                    }"
                  >
                    {{ payment.status }}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
>>>>>>>> 9f291f8b4fe9d65b3d6dbc5cdbbbc7657558a74c:pages/borrower/dashboard/index.vue
  </div>
</template>

<style scoped>
.dashboard-container {
  font-family: 'Inter', sans-serif;
}

.bg-dark-blue {
  background-color: #000B58;
}

.bg-dark-blue-700 {
  background-color: #00084d;
}

.text-blue-300 {
  color: #93c5fd;
}

.bg-yellow-100 {
  background-color: #fef9c3;
}

.text-yellow-800 {
  color: #92400e;
}

.bg-green-100 {
  background-color: #d1fae5;
}

.text-green-800 {
  color: #065f46;
}

/* Add smooth transitions */
button, a {
  transition: all 0.2s ease;
}

/* Responsive adjustments */
@media (max-width: 640px) {
  .dashboard-container {
    padding: 1rem;
  }
  
  .text-5xl {
    font-size: 2.5rem;
  }
  
  table {
    display: block;
    overflow-x: auto;
    white-space: nowrap;
  }

  .flex.justify-between.items-center {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
}
</style>