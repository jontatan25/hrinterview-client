<template>
  <div class="w-full max-w-xs">
    <h4 class="text-center">SIGN IN</h4>
    <form @submit.prevent="submitForm" class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <!-- Username field -->
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="username"> Username </label>
        <input
          v-model="username"
          :class="{ 'text-red border-red-500': !username && isSubmitted }"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="username"
          type="text"
          placeholder="Username"
        />
        <div v-if="!username && isSubmitted">
          <p class="text-red-500 text-xs italic">Please choose a username.</p>
        </div>
      </div>

      <!-- Password field -->
      <div class="mb-6">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="password"> Password </label>
        <input
          v-model="password"
          :class="{ 'text-red border-red-500': !password && isSubmitted }"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          id="password"
          type="password"
          placeholder="******************"
        />
        <div v-if="!password && isSubmitted">
          <p class="text-red-500 text-xs italic">Please choose a password.</p>
        </div>
      </div>

      <!-- Sign In button -->
      <div class="flex items-center justify-between">
        <button
          type="submit"
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Sign In
        </button>
        <a
          class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
          href="#"
        >
          Forgot Password?
        </a>
      </div>
    </form>

    <!-- Copyright text -->
    <p class="text-center text-gray-500 text-xs">&copy;2020 Acme Corp. All rights reserved.</p>
  </div>
</template>

<script setup lang="ts">
import router from '@/router'
import { inject, ref } from 'vue'

// Reactive variables for storing form data and submission state
const username = ref<string>('')
const password = ref<string>('')
const isSubmitted = ref<boolean>(false)

const plainAxiosInstance: any = inject('plainAxiosInstance')

// Function to handle form submission
const submitForm = async () => {
  // Set isSubmitted to true when the form is submitted
  isSubmitted.value = true

  // Check if username and password are provided
  if (!username.value || !password.value) {
    // If username or password is empty, return without submitting the form
    console.error('Username and password are required')
    return
  }

  try {
    // Send POST request using plainAxiosInstance
    const response = await plainAxiosInstance.post('/signin', {
      email: username.value,
      password: password.value
    })

    if (!response.data.csrf) return

    localStorage.csrf = response.data.csrf
    localStorage.signedIn = true

    router.push('/experiences')

    // Handle response
    console.log('Signin successful:', response.data)
  } catch (error) {
    // Handle error
    console.error('Signin error:', error)
    delete localStorage.csrf
    delete localStorage.signedIn
  }
}
</script>

<style scoped>
.text-red {
  color: red;
}
</style>
