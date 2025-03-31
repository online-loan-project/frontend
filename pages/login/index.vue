<script setup>
definePageMeta({
  layout: 'auth',
  middleware: ['redirect-if-authenticated']
})
</script>

<template>
  <div class="relative w-full h-screen bg-home">
    <div class="absolute inset-0 bg-black bg-opacity-50"></div>

    <div class="relative flex flex-col items-center justify-center h-full space-y-6">
      
      <!-- Added Heading and Subtext ABOVE the form -->
      <h1 class="text-6xl font-bold text-white text-center">Welcome Back</h1>
      <p class="text-lg text-gray-300 text-center">Login into your account</p>

      <div class="bg-white border border-blue-500 rounded-lg p-6 w-96 shadow-lg animate-slide-up">
        <h1 class="text-xl font-semibold text-center mb-4">Login</h1>
        <form class="space-y-4">
          <div>
            <label for="phone" class="block text-gray-700">Phone Number</label>
            <input type="email" id="email" class="w-full p-2 border rounded-lg focus:ring-2 focus:ring-teal-500" />
          </div>
          <div>
            <label for="password" class="block text-gray-700">Password</label>
            <input type="password" id="password" class="w-full p-2 border rounded-lg focus:ring-2 focus:ring-teal-500" />
          </div>
          <button type="submit" class="w-full bg-[#040058] text-white py-2 rounded-lg hover:bg-[#27548A] transition">Login</button>
          <button type="submit" class="w-full bg-[#040058] text-white py-2 rounded-lg hover:bg-[#27548A] transition">Login with Google</button>
        </form>

        <!-- Added Text Below the Form -->
        <p class="mt-4 text-center text-gray-600">
          Don't have an account? 
          <a href="#" class="text-green-500 font-semibold hover:underline">Sign up!</a>
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slide-up {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fade-in 1s ease-in-out;
}

.animate-slide-up {
  animation: slide-up 1s ease-in-out;
}

.bg-home {
  background: url('@/assets/image/home.png') no-repeat center center;
  background-size: cover;
}
</style>
