<script setup>
useSeoMeta({
  title: 'JorngKa | Instant Digital Loans',
  description: 'Get approved for fast, secure loans up to $1000 with competitive rates. Apply online in minutes with JorngKa.'
})

definePageMeta({
  layout: 'default',
})

import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Icons
import {
  Clock,
  Lock,
  Coin,
  User,
  Document,
  CreditCard,
  ChatLineRound
} from '@element-plus/icons-vue'

const loanAmount = ref(500)
const loanTerm = ref(30)

const features = [
  {
    icon: Clock,
    title: 'Instant Approval',
    description: 'Get loan approval within minutes using our automated system',
    stat: '98% approval rate'
  },
  {
    icon: Lock,
    title: 'Secure & Safe',
    description: 'Bank-level security to protect your personal information',
    stat: '256-bit encryption'
  },
  {
    icon: Coin,
    title: 'Low Rates',
    description: 'Competitive interest rates with no hidden charges',
    stat: 'From 5.9% APR'
  }
]

const steps = [
  {
    icon: User,
    title: 'Create Account',
    description: 'Quick registration with basic information',
    color: 'bg-blue-100'
  },
  {
    icon: Document,
    title: 'Submit Application',
    description: 'Easy online form with instant verification',
    color: 'bg-purple-100'
  },
  {
    icon: CreditCard,
    title: 'Receive Funds',
    description: 'Money transferred directly to your account',
    color: 'bg-green-100'
  }
]

const testimonials = [
  {
    name: 'Kwame Mensah',
    role: 'Small Business Owner',
    text: 'JorngKa saved my business when I needed quick cash flow. The process was seamless and funds arrived in minutes!',
    rating: 5
  },
  {
    name: 'Ama Serwaa',
    role: 'Teacher',
    text: 'I needed emergency funds for medical bills. JorngKa provided the most competitive rates I could find.',
    rating: 5
  },
  {
    name: 'Yaw Boateng',
    role: 'Freelancer',
    text: 'As a freelancer with irregular income, the flexible repayment options are perfect for my situation.',
    rating: 4
  }
]

onMounted(() => {
  gsap.registerPlugin(ScrollTrigger)

  // Animate features on scroll
  gsap.utils.toArray('.feature-card').forEach((card, i) => {
    gsap.from(card, {
      scrollTrigger: {
        trigger: card,
        start: "top 80%",
        toggleActions: "play none none none"
      },
      y: 50,
      opacity: 0,
      duration: 0.8,
      delay: i * 0.1
    })
  })

  // Pulse animation for CTA button
  gsap.to('.pulse-cta', {
    scale: 1.05,
    repeat: -1,
    yoyo: true,
    duration: 1.5,
    ease: 'sine.inOut'
  })
})
</script>

<template>
  <div class="min-h-screen bg-white text-gray-800 overflow-x-hidden">
    <!-- Floating Apply Button -->
    <div class="fixed bottom-6 right-6 z-50">
      <el-button
        type="primary"
        size="large"
        class="!rounded-full !px-6 !py-5 shadow-xl pulse-cta"
        @click="navigateTo('/register')"
      >
        Apply Now
      </el-button>
    </div>

    <!-- Navbar -->
    <NavBar />

    <!-- Hero Section -->
    <section class="relative bg-gradient-to-br from-primary-600 to-primary-500 py-24 px-4 text-white overflow-hidden">
      <!-- Animated background elements -->
      <div class="absolute inset-0 overflow-hidden opacity-20">
        <div class="absolute -right-20 -top-20 w-64 h-64 rounded-full bg-primary-300 mix-blend-multiply filter blur-xl animate-float"></div>
        <div class="absolute left-10 bottom-0 w-80 h-80 rounded-full bg-primary-400 mix-blend-multiply filter blur-xl animate-float-delay"></div>
      </div>

      <div class="container mx-auto relative z-10">
        <div class="flex flex-col lg:flex-row items-center gap-12">
          <div class="lg:w-1/2 text-center lg:text-left">
            <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Financial Freedom <br>
              <span class="text-primary-200">Within Reach</span>
            </h1>
            <p class="text-xl md:text-2xl mb-8 opacity-90 max-w-2xl">
              Get instant loans up to $1000 with competitive rates and flexible repayment options tailored to your needs.
            </p>
            <div class="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <el-button
                type="primary"
                size="large"
                class="!text-lg !px-8 !py-5 !rounded-xl bg-white text-primary-600 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
              >
                Apply Now - 5 Minutes
              </el-button>
              <el-button
                size="large"
                class="!text-lg !px-8 !py-5 !rounded-xl bg-transparent border-2 border-white text-white font-semibold hover:bg-white hover:text-primary-600 transition-all duration-300"
              >
                How It Works
              </el-button>
            </div>

            <div class="mt-10 flex flex-wrap justify-center lg:justify-start gap-6">
              <div class="flex items-center">
                <div class="flex -space-x-2">
                  <div v-for="i in 4" :key="i" class="w-10 h-10 rounded-full bg-white border-2 border-primary-500"></div>
                </div>
                <span class="ml-3 font-medium">10,000+ Happy Customers</span>
              </div>
            </div>
          </div>

          <div class="lg:w-1/2 mt-12 lg:mt-0">
            <div class="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-xl">
              <h3 class="text-xl font-bold mb-6 text-center">Loan Calculator</h3>
              <div class="space-y-6">
                <div>
                  <label class="block text-sm font-medium mb-2">Loan Amount</label>
                  <el-slider
                    v-model="loanAmount"
                    :min="100"
                    :max="1000"
                    :step="50"
                    show-input
                    input-size="large"
                  />
                </div>

                <div>
                  <label class="block text-sm font-medium mb-2">Repayment Term</label>
                  <el-radio-group v-model="loanTerm" size="large" class="w-full">
                    <el-radio-button value="15">15 days</el-radio-button>
                    <el-radio-button value="30">30 days</el-radio-button>
                    <el-radio-button value="60">60 days</el-radio-button>
                  </el-radio-group>
                </div>

                <div class="bg-white/20 rounded-lg p-4">
                  <div class="flex justify-between mb-2">
                    <span class="font-medium">Amount:</span>
                    <span class="font-bold">${{ loanAmount }}</span>
                  </div>
                  <div class="flex justify-between mb-2">
                    <span class="font-medium">Term:</span>
                    <span class="font-bold">{{ loanTerm }} days</span>
                  </div>
                  <div class="flex justify-between text-lg">
                    <span class="font-semibold">Estimated Repayment:</span>
                    <span class="font-bold text-primary-200">${{ Math.round(loanAmount * 1.15) }}</span>
                  </div>
                </div>

                <el-button
                  type="primary"
                  size="large"
                  class="w-full !py-5 !rounded-lg !text-lg font-semibold shadow-md"
                  @click="navigateTo('/register')"
                >
                  Get Your Money Now
                </el-button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Trust Badges -->
    <div class="bg-gray-50 py-6">
      <div class="container mx-auto px-4">
        <div class="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-70">
          <div class="text-center">
            <div class="text-3xl font-bold text-primary-600">98%</div>
            <div class="text-sm mt-1">Approval Rate</div>
          </div>
          <div class="text-center">
            <div class="text-3xl font-bold text-primary-600">5min</div>
            <div class="text-sm mt-1">Average Approval</div>
          </div>
          <div class="text-center">
            <div class="text-3xl font-bold text-primary-600">24/7</div>
            <div class="text-sm mt-1">Customer Support</div>
          </div>
          <div class="text-center">
            <div class="text-3xl font-bold text-primary-600">10k+</div>
            <div class="text-sm mt-1">Loans Disbursed</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Features -->
    <section class="py-20 bg-white">
      <div class="container mx-auto px-4">
        <div class="text-center max-w-3xl mx-auto mb-16">
          <h2 class="text-3xl md:text-4xl font-bold mb-4">Why Choose JorngKa?</h2>
          <p class="text-lg text-gray-600">
            We're revolutionizing digital lending with transparency, speed, and customer-centric solutions
          </p>
        </div>

        <div class="grid md:grid-cols-3 gap-8">
          <div
            v-for="(feature, index) in features"
            :key="index"
            class="feature-card p-8 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all hover:-translate-y-2"
          >
            <div class="w-16 h-16 rounded-xl mb-6 flex items-center justify-center"
                 :class="index === 0 ? 'bg-blue-100 text-blue-600' :
                        index === 1 ? 'bg-purple-100 text-purple-600' :
                        'bg-green-100 text-green-600'">
              <component :is="feature.icon" class="w-8 h-8" />
            </div>
            <h3 class="text-xl font-semibold mb-3">{{ feature.title }}</h3>
            <p class="text-gray-600 mb-4">{{ feature.description }}</p>
            <span class="text-sm font-medium px-3 py-1 rounded-full bg-gray-100 text-gray-700">
              {{ feature.stat }}
            </span>
          </div>
        </div>
      </div>
    </section>

    <!-- How It Works -->
    <section class="py-20 bg-gradient-to-br from-gray-50 to-gray-100">
      <div class="container mx-auto px-4">
        <div class="text-center max-w-3xl mx-auto mb-16">
          <h2 class="text-3xl md:text-4xl font-bold mb-4">Simple 3-Step Process</h2>
          <p class="text-lg text-gray-600">
            Get funds in your account faster than traditional lenders
          </p>
        </div>

        <div class="relative">
          <!-- Progress line -->
          <div class="hidden md:block absolute top-16 left-1/2 transform -translate-x-1/2 h-1 bg-primary-200 w-2/3"></div>

          <div class="grid md:grid-cols-3 gap-8 relative z-10">
            <div
              v-for="(step, index) in steps"
              :key="index"
              class="text-center"
            >
              <div class="w-24 h-24 mx-auto mb-6 rounded-full flex items-center justify-center text-white text-3xl font-bold relative"
                   :class="step.color">
                <component :is="step.icon" class="w-8 h-8" />
              </div>
              <h3 class="text-xl font-semibold mb-2">{{ step.title }}</h3>
              <p class="text-gray-600">{{ step.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Testimonials -->
    <section class="py-20 bg-white">
      <div class="container mx-auto px-4">
        <div class="text-center max-w-3xl mx-auto mb-16">
          <h2 class="text-3xl md:text-4xl font-bold mb-4">Trusted by Thousands</h2>
          <p class="text-lg text-gray-600">
            Don't just take our word for it - hear from our satisfied customers
          </p>
        </div>

        <div class="grid md:grid-cols-3 gap-8">
          <div
            v-for="(testimonial, i) in testimonials"
            :key="i"
            class="bg-white p-8 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all"
          >
            <div class="flex items-center mb-6">
              <div class="w-12 h-12 rounded-full bg-gray-200 mr-4 flex items-center justify-center text-gray-500">
                {{ testimonial.name.charAt(0) }}
              </div>
              <div>
                <h4 class="font-semibold">{{ testimonial.name }}</h4>
                <p class="text-sm text-gray-500">{{ testimonial.role }}</p>
              </div>
            </div>
            <p class="text-gray-600 mb-4">"{{ testimonial.text }}"</p>
            <div class="flex text-yellow-400">
              <span v-for="star in testimonial.rating" :key="star">★</span>
              <span v-for="star in (5 - testimonial.rating)" :key="'empty'+star" class="text-gray-300">★</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- FAQ -->
    <section class="py-20 bg-gray-50">
      <div class="container mx-auto px-4">
        <div class="text-center max-w-3xl mx-auto mb-16">
          <h2 class="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
          <p class="text-lg text-gray-600">
            Quick answers to common questions about our loan process
          </p>
        </div>

        <div class="max-w-3xl mx-auto">
          <el-collapse accordion>
            <el-collapse-item name="1">
              <template #title>
                <span class="font-semibold text-lg">How quickly can I get the money?</span>
              </template>
              <div class="text-gray-600">
                <p>Once approved, funds are typically deposited into your account within 15 minutes. The speed depends on your bank's processing times.</p>
              </div>
            </el-collapse-item>
            <el-collapse-item name="2">
              <template #title>
                <span class="font-semibold text-lg">What are the eligibility requirements?</span>
              </template>
              <div class="text-gray-600">
                <p>You must be at least 18 years old, have a valid ID, an active bank account, and a verifiable source of income.</p>
              </div>
            </el-collapse-item>
            <el-collapse-item name="3">
              <template #title>
                <span class="font-semibold text-lg">Are there any hidden fees?</span>
              </template>
              <div class="text-gray-600">
                <p>No. We believe in complete transparency. All fees are clearly stated during the application process before you accept the loan.</p>
              </div>
            </el-collapse-item>
            <el-collapse-item name="4">
              <template #title>
                <span class="font-semibold text-lg">Can I repay early without penalty?</span>
              </template>
              <div class="text-gray-600">
                <p>Yes! We encourage early repayment and don't charge any penalties for doing so. You may even qualify for better rates on future loans.</p>
              </div>
            </el-collapse-item>
          </el-collapse>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="py-20 bg-gradient-to-r from-primary-600 to-primary-500 text-white">
      <div class="container mx-auto px-4 text-center">
        <h2 class="text-3xl md:text-4xl font-bold mb-6">
          Ready to Get Started?
        </h2>
        <p class="text-xl mb-8 max-w-2xl mx-auto opacity-90">
          Join thousands of satisfied customers who trust JorngKa for their financial needs
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <el-button
            type="primary"
            size="large"
            class="!text-lg !px-8 !py-6 !rounded-xl bg-white text-primary-600 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
          >
            Apply Now - It's Free
          </el-button>
          <el-button
            size="large"
            class="!text-lg !px-8 !py-6 !rounded-xl bg-transparent border-2 border-white text-white font-semibold hover:bg-white hover:text-primary-600 transition-all duration-300"
          >
            <ChatLineRound class="mr-2" />
            Live Chat
          </el-button>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="bg-gray-900 text-white pt-16 pb-8">
      <div class="container mx-auto px-4">
        <div class="grid md:grid-cols-4 gap-12 mb-12">
          <div>
            <h3 class="text-xl font-bold mb-6">JorngKa</h3>
            <p class="text-gray-400 mb-6">
              Making financial services accessible and affordable for everyone in Cambodia.
            </p>
            <div class="flex space-x-4">
              <a href="#" class="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-primary-600 transition">
                <i class="fab fa-facebook-f"></i>
              </a>
              <a href="#" class="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-primary-600 transition">
                <i class="fab fa-twitter"></i>
              </a>
              <a href="#" class="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-primary-600 transition">
                <i class="fab fa-instagram"></i>
              </a>
            </div>
          </div>

          <div>
            <h4 class="text-lg font-semibold mb-6">Quick Links</h4>
            <ul class="space-y-3 text-gray-400">
              <li><a href="#" class="hover:text-white transition-colors">About Us</a></li>
              <li><a href="#" class="hover:text-white transition-colors">How It Works</a></li>
              <li><a href="#" class="hover:text-white transition-colors">Loan Calculator</a></li>
              <li><a href="#" class="hover:text-white transition-colors">Blog</a></li>
              <li><a href="#" class="hover:text-white transition-colors">Careers</a></li>
            </ul>
          </div>

          <div>
            <h4 class="text-lg font-semibold mb-6">Products</h4>
            <ul class="space-y-3 text-gray-400">
              <li><a href="#" class="hover:text-white transition-colors">Personal Loans</a></li>
              <li><a href="#" class="hover:text-white transition-colors">Business Loans</a></li>
              <li><a href="#" class="hover:text-white transition-colors">Emergency Loans</a></li>
              <li><a href="#" class="hover:text-white transition-colors">Education Loans</a></li>
              <li><a href="#" class="hover:text-white transition-colors">Loan Top-up</a></li>
            </ul>
          </div>

          <div>
            <h4 class="text-lg font-semibold mb-6">Contact Us</h4>
            <ul class="space-y-3 text-gray-400">
              <li class="flex items-start">
                <i class="fas fa-map-marker-alt mt-1 mr-3 text-primary-500"></i>
                <span>123 Financial Street, Doun Penh, Phnom Penh, Cambodia</span>
              </li>
              <li class="flex items-center">
                <i class="fas fa-phone-alt mr-3 text-primary-500"></i>
                <span>+233 123 456 789</span>
              </li>
              <li class="flex items-center">
                <i class="fas fa-envelope mr-3 text-primary-500"></i>
                <span>support@jorngka.com</span>
              </li>
              <li class="flex items-center">
                <i class="fas fa-clock mr-3 text-primary-500"></i>
                <span>24/7 Customer Support</span>
              </li>
            </ul>
          </div>
        </div>

        <div class="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p class="text-gray-500 text-sm mb-4 md:mb-0">
            © 2023 JorngKa. All rights reserved.
          </p>
          <div class="flex space-x-6">
            <a href="#" class="text-gray-500 hover:text-gray-300 text-sm">Privacy Policy</a>
            <a href="#" class="text-gray-500 hover:text-gray-300 text-sm">Terms of Service</a>
            <a href="#" class="text-gray-500 hover:text-gray-300 text-sm">Licenses</a>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<style scoped>
.animate-float {
  animation: float 6s ease-in-out infinite;
}

.animate-float-delay {
  animation: float 6s ease-in-out 1s infinite;
}

@keyframes float {
  0% {
    transform: translateY(0) translateX(0);
  }
  50% {
    transform: translateY(-20px) translateX(10px);
  }
  100% {
    transform: translateY(0) translateX(0);
  }
}

.feature-card:hover {
  box-shadow: 0 10px 25px -5px rgba(59, 130, 246, 0.1);
}
</style>
