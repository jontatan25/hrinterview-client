<template>
  <div class="px-8 pt-6 pb-8">
    <button
      @click="signout"
      class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
    >
      Sign Out
    </button>
  </div>
</template>

<script setup>
import router from '@/router'

const signout = async () => {
  try {
    // Send POST request using plainAxiosInstance
    await securedAxiosInstance.post('/signout', {
      email: username.value,
      password: password.value
    })

    delete localStorage.csrf
    delete localStorage.signedIn

    router.push('/')

    // Handle response
    console.log('Signout successful:', response.data)
  } catch (error) {
    // Handle error
    console.error('Signout error:', error)
    delete localStorage.csrf
    delete localStorage.signedIn
  }
}
</script>
