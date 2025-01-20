<template>

  <section class="relative flex items-center justify-center min-h-screen bg-gray-900 overflow-hidden">

    <video
        autoplay
        loop
        muted
        playsinline
        class="absolute z-0 w-auto min-w-full min-h-full max-w-none"
    >
      <source
          src="../assets/image/bg.mp4"
          type="video/mp4"
      />
      Your browser does not support the video tag.
    </video>


    <div class="absolute inset-0 z-10 bg-black opacity-50"></div>


    <div
        class="relative z-20 w-full max-w-md px-6 py-8 bg-white rounded-lg shadow-md dark:bg-gray-800 animate-fade-in"
    >

      <div class="flex justify-center mb-6">
        <img
            src="../assets/image/logo1.png"
            alt="Logo"
            class="h-12"
        />
      </div>


      <form @submit.prevent="handlePasswordReset" class="space-y-6">

        >
        <div>
          <label for="new-password" class="block text-sm text-gray-700 dark:text-gray-200">
            New Password
          </label>
          <input
              v-model="newPassword"
              type="password"
              id="new-password"
              required
              placeholder="Enter your new password"
              class="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border rounded-lg dark:bg-gray-900 dark:placeholder-gray-500 dark:text-gray-300 focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
          />
        </div>


        <div>
          <label for="confirm-password" class="block text-sm text-gray-700 dark:text-gray-200">
            Confirm Password
          </label>
          <input
              v-model="confirmPassword"
              type="password"
              id="confirm-password"
              required
              placeholder="Confirm your new password"
              class="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border rounded-lg dark:bg-gray-900 dark:placeholder-gray-500 dark:text-gray-300 focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
          />
        </div>


        <div>
          <button
              type="submit"
              class="w-full px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:bg-blue-600 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          >
            Reset Password
          </button>
        </div>
      </form>

      <!-- Go Back to Login -->
      <div class="mt-6 text-center">
        <p class="text-sm text-gray-500 dark:text-gray-400">
          Remembered your password?
          <a
              href="/login"
              class="text-blue-500 hover:underline dark:text-blue-300"
          >
            Log in
          </a>
        </p>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from "vue";


const newPassword = ref("");
const confirmPassword = ref("");


const handlePasswordReset = () => {
  if (newPassword.value !== confirmPassword.value) {
    console.error("Passwords do not match!");
    return;
  }

  console.log("Password Reset Successfully!", {
    newPassword: newPassword.value,
  });
};
</script>

<style scoped>

@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(15px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fade-in 0.5s ease-out;
}
</style>
