<script setup>
import { ElMessage } from 'element-plus'

definePageMeta({
  layout: 'borrower',
  middleware: ['authenticated'],
})

const currentStep = ref(1);
const steps = [
  { title: 'Personal Data', icon: 'User' },
  { title: 'NID Verification', icon: 'Postcard' },
  { title: 'Income Information', icon: 'Money' }
];

const user = useCookie('user').value
if (!user || !user.phone) {
  ElMessage.error('User information not found. Please log in again.')
  navigateTo('/login')
}


const personalData = ref({
  fullName: user.profile.first_name + ' ' + user.profile.last_name,
  email: user.email,
  phone: user.phone,
  address: user.profile.address,
  dateOfBirth: user.profile.dob
});

const nidData = ref({
  nidNumber: '',
  nidFront: null,
  nidBack: null,
  selfieWithNid: null
});

const incomeData = ref({
  monthlyIncome: '',
  occupation: '',
  employer: '',
  bankStatements: []
});

const nidPreview = ref({
  front: null,
  back: null,
  selfie: null
});

const handleFileUpload = (file, type) => {
  const reader = new FileReader();
  reader.onload = (e) => {
    if (type === 'front') {
      nidData.value.nidFront = file;
      nidPreview.value.front = e.target.result;
    } else if (type === 'back') {
      nidData.value.nidBack = file;
      nidPreview.value.back = e.target.result;
    } else {
      nidData.value.selfieWithNid = file;
      nidPreview.value.selfie = e.target.result;
    }
  };
  reader.readAsDataURL(file);
};

const handleBankStatementUpload = (files) => {
  incomeData.value.bankStatements = [...files];
};

const nextStep = () => {
  if (currentStep.value < steps.length) {
    currentStep.value++;
  }
};

const prevStep = () => {
  if (currentStep.value > 1) {
    currentStep.value--;
  }
};

const submitLoanRequest = () => {
  // In a real app, you would submit all data to your backend
  console.log('Submitting loan request:', {
    personalData: personalData.value,
    nidData: nidData.value,
    incomeData: incomeData.value
  });

  // Show success message and redirect
  ElMessage.success('Loan request submitted successfully!');
  navigateTo('/borrower/request-loan');
};
</script>

<template>
  <div class="container mx-auto px-4 py-8 max-w-4xl">
    <h1 class="text-2xl font-bold text-gray-800 mb-8">Request New Loan</h1>

    <!-- Stepper -->
    <el-steps :active="currentStep" align-center class="mb-8">
      <el-step
        v-for="(step, index) in steps"
        :key="index"
        :title="step.title"
        :icon="step.icon"
      />
    </el-steps>

    <!-- Step 1: Personal Data -->
    <div v-if="currentStep === 1" class="bg-white rounded-lg shadow p-6">
      <h2 class="text-xl font-semibold mb-6">Personal Information</h2>

      <el-form :model="personalData" label-width="150px" label-position="top">
        <el-form-item label="Full Name" required>
          <el-input v-model="personalData.fullName" placeholder="Enter your full name" disabled />
        </el-form-item>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <el-form-item label="Email Address" required>
            <el-input v-model="personalData.email" type="text" placeholder="your@email.com" disabled />
          </el-form-item>

          <el-form-item label="Phone Number" required>
            <el-input v-model="personalData.phone" placeholder="092000000" disabled />
          </el-form-item>
        </div>

        <el-form-item label="Date of Birth" required>
          <el-date-picker
            v-model="personalData.dateOfBirth"
            type="date"
            placeholder="Select your date of birth"
            class="w-full"
            disabled
          />
        </el-form-item>

        <el-form-item label="Address" required>
          <el-input
            v-model="personalData.address"
            type="textarea"
            :rows="3"
            placeholder="Enter your full address"
            disabled
          />
        </el-form-item>
      </el-form>

      <div class="flex justify-end mt-6">
        <el-button type="primary" @click="nextStep">
          Continue to NID Verification
          <i class="i-material-symbols-arrow-forward ml-2"></i>
        </el-button>
      </div>
    </div>

    <!-- Step 2: NID Verification -->
    <div v-if="currentStep === 2" class="bg-white rounded-lg shadow p-6">
      <h2 class="text-xl font-semibold mb-6">National ID Verification</h2>

      <el-form :model="nidData" label-width="150px" label-position="top">
        <el-form-item label="NID Number" required>
          <el-input v-model="nidData.nidNumber" placeholder="Enter your NID number" />
        </el-form-item>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <el-form-item label="NID Front Side" required>
              <el-upload
                action="#"
                :auto-upload="false"
                :show-file-list="false"
                :on-change="(file) => handleFileUpload(file.raw, 'front')"
                accept="image/*"
                class="upload-area"
              >
                <div v-if="nidPreview.front" class="preview-container">
                  <img :src="nidPreview.front" class="preview-image" />
                  <div class="preview-overlay">
                    <i class="i-material-symbols-edit text-white text-2xl"></i>
                  </div>
                </div>
                <div v-else class="upload-placeholder">
                  <i class="i-material-symbols-upload text-3xl text-gray-400 mb-2"></i>
                  <p>Upload Front Side</p>
                </div>
              </el-upload>
            </el-form-item>
          </div>

          <div>
            <el-form-item label="NID Back Side" required>
              <el-upload
                action="#"
                :auto-upload="false"
                :show-file-list="false"
                :on-change="(file) => handleFileUpload(file.raw, 'back')"
                accept="image/*"
                class="upload-area"
              >
                <div v-if="nidPreview.back" class="preview-container">
                  <img :src="nidPreview.back" class="preview-image" />
                  <div class="preview-overlay">
                    <i class="i-material-symbols-edit text-white text-2xl"></i>
                  </div>
                </div>
                <div v-else class="upload-placeholder">
                  <i class="i-material-symbols-upload text-3xl text-gray-400 mb-2"></i>
                  <p>Upload Back Side</p>
                </div>
              </el-upload>
            </el-form-item>
          </div>
        </div>

        <el-form-item label="Selfie with NID" required>
          <el-upload
            action="#"
            :auto-upload="false"
            :show-file-list="false"
            :on-change="(file) => handleFileUpload(file.raw, 'selfie')"
            accept="image/*"
            class="upload-area selfie-upload"
          >
            <div v-if="nidPreview.selfie" class="preview-container">
              <img :src="nidPreview.selfie" class="preview-image" />
              <div class="preview-overlay">
                <i class="i-material-symbols-edit text-white text-2xl"></i>
              </div>
            </div>
            <div v-else class="upload-placeholder">
              <i class="i-material-symbols-camera-alt text-3xl text-gray-400 mb-2"></i>
              <p>Take a selfie holding your NID</p>
              <p class="text-xs text-gray-500 mt-1">Make sure your face and NID are clearly visible</p>
            </div>
          </el-upload>
        </el-form-item>
      </el-form>

      <div class="flex justify-between mt-6">
        <el-button @click="prevStep">
          <i class="i-material-symbols-arrow-back mr-2"></i>
          Back
        </el-button>
        <el-button type="primary" @click="nextStep">
          Continue to Income Information
          <i class="i-material-symbols-arrow-forward ml-2"></i>
        </el-button>
      </div>
    </div>

    <!-- Step 3: Income Information -->
    <div v-if="currentStep === 3" class="bg-white rounded-lg shadow p-6">
      <h2 class="text-xl font-semibold mb-6">Income Information</h2>

      <el-form :model="incomeData" label-width="150px" label-position="top">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <el-form-item label="Monthly Income (BDT)" required>
            <el-input-number
              v-model="incomeData.monthlyIncome"
              :min="10000"
              :step="5000"
              controls-position="right"
              class="w-full"
            />
          </el-form-item>

          <el-form-item label="Occupation" required>
            <el-input v-model="incomeData.occupation" placeholder="Your profession" />
          </el-form-item>
        </div>

        <el-form-item label="Employer/Company Name">
          <el-input v-model="incomeData.employer" placeholder="Where you work" />
        </el-form-item>

        <el-form-item label="Bank Statements (Last 3 months)" required>
          <el-upload
            action="#"
            multiple
            :auto-upload="false"
            :file-list="incomeData.bankStatements"
            :on-change="handleBankStatementUpload"
            accept=".pdf,.jpg,.jpeg,.png"
            class="bank-statement-upload"
          >
            <el-button type="primary">
              <i class="i-material-symbols-upload mr-2"></i>
              Upload Bank Statements
            </el-button>
            <template #tip>
              <div class="el-upload__tip">
                Upload PDF or images of your bank statements for the last 3 months
              </div>
            </template>
          </el-upload>

          <div v-if="incomeData.bankStatements.length > 0" class="mt-4">
            <div class="flex flex-wrap gap-2">
              <el-tag
                v-for="(file, index) in incomeData.bankStatements"
                :key="index"
                closable
                @close="incomeData.bankStatements.splice(index, 1)"
              >
                {{ file.name }}
              </el-tag>
            </div>
          </div>
        </el-form-item>
      </el-form>

      <div class="flex justify-between mt-6">
        <el-button @click="prevStep">
          <i class="i-material-symbols-arrow-back mr-2"></i>
          Back
        </el-button>
        <el-button type="primary" @click="submitLoanRequest">
          Submit Loan Request
          <i class="i-material-symbols-check-circle ml-2"></i>
        </el-button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.upload-area {
  @apply border-2 border-dashed border-gray-300 rounded-lg p-4 cursor-pointer transition-colors;
}

.upload-area:hover {
  @apply border-blue-500;
}

.upload-placeholder {
  @apply flex flex-col items-center justify-center text-center p-6 text-gray-500;
}

.preview-container {
  @apply relative h-40;
}

.preview-image {
  @apply w-full h-full object-contain rounded-lg;
}

.preview-overlay {
  @apply absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity rounded-lg;
}

.selfie-upload {
  @apply max-w-md mx-auto;
}

.bank-statement-upload {
  @apply w-full;
}

.el-step {
  @apply cursor-pointer;
}

.el-step:deep(.el-step__title) {
  @apply font-medium;
}

.el-step.is-process:deep(.el-step__title) {
  @apply font-semibold text-blue-600;
}
</style>
