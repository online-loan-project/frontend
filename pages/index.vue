<script setup>
import { ref } from "vue";
import { useUsbAuth } from "@/composables/useUsbAuth";

const {
  logs,
  supported,
  status,
  selectedDeviceName,
  pinModalVisible,
  requestDevice,
  verifyPin,
} = useUsbAuth();

const pinInput = ref("");
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100 p-6">
    <el-card class="w-full max-w-md rounded-2xl shadow-xl p-6">

      <!-- Title -->
      <h1 class="text-3xl font-bold text-center mb-6">
        Login with Device Token
      </h1>

      <!-- Instruction (when idle) -->
      <div v-if="supported && status === 'idle'" class="mb-4 text-center">
        <p class="text-gray-600 text-sm">
          Please connect your Device to begin authentication.
        </p>
      </div>

      <!-- Status Indicator -->
      <div v-if="status !== 'idle'" class="mb-4 text-center">
        <el-tag v-if="status === 'verifying'" type="warning">
          Verifying device...
        </el-tag>
        <el-tag v-else-if="status === 'authorized'" type="success">
          Token verified — enter PIN
        </el-tag>
        <el-tag v-else-if="status === 'unauthorized'" type="danger">
          Unauthorized Device Token
        </el-tag>
        <el-tag v-else-if="status === 'login-success'" type="success">
          Login Successful 🎉
        </el-tag>
      </div>

      <!-- Connect Button -->
      <div v-if="supported && status !== 'login-success'" class="text-center mb-4">
        <el-button
          type="primary"
          size="large"
          class="w-full"
          @click="requestDevice"
        >
          Connect Device
        </el-button>
      </div>

      <!-- Browser not supported alert -->
      <el-alert
        v-else-if="!supported"
        title="WebUSB is not supported. Use Google Chrome."
        type="error"
        show-icon
        class="mb-4"
      />

      <!-- Logs -->
      <el-card
        v-if="logs.length"
        shadow="never"
        class="bg-gray-50 mt-4 max-h-48 overflow-auto text-sm"
      >
        <p
          v-for="(l, i) in logs"
          :key="i"
          class="py-1 border-b border-gray-200"
        >
          {{ l }}
        </p>
      </el-card>
    </el-card>

    <!-- PIN Modal -->
    <el-dialog
      v-model="pinModalVisible"
      title="Enter PIN"
      width="350px"
    >
      <p class="mb-4 text-gray-700 text-sm">
        Enter the 4-digit PIN for your device token: <strong>{{ selectedDeviceName }}</strong>
      </p>

      <el-input
        v-model="pinInput"
        placeholder="Enter your 4-digit PIN"
        type="password"
        maxlength="4"
        show-password
        class="mb-4"
      />

      <template #footer>
        <el-button @click="pinModalVisible = false">Cancel</el-button>
        <el-button type="primary" @click="verifyPin(pinInput)">
          Verify PIN
        </el-button>
      </template>
    </el-dialog>
  </div>
</template>
