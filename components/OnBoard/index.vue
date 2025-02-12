<template>
  <div class="relative flex items-center justify-center min-h-screen bg-home">
    <div class="absolute inset-0 bg-black bg-opacity-50"></div>

    <div class="relative z-10 flex flex-col items-center space-y-6 text-white text-center">
      <img src="@/assets/image/logo.svg" alt="logo" class="w-32 md:w-40" />

      <p class="text-lg md:text-xl font-light leading-relaxed">
        The beauty of fragrance is that <br>
        it speaks to your heart and <br>
        hopefully someone else's.
      </p>

      <div class="flex flex-col space-y-5">
        <Locale />
        <el-button type="primary" round @click="navigateTo('login')">
          {{ $t('home.sign_in') }}
        </el-button>
      </div>
    </div>
  </div>
</template>


<script setup>
</script>

<style scoped>
.bg-home {
  background: url('@/assets/image/homePage.png') no-repeat center center;
  background-size: cover;
}
</style>

