<template>
  <div class="min-h-screen flex items-center justify-center bg-slate-900">
    <div class="text-center">
      <h1 class="text-9xl font-bold text-white">404</h1>
      <p class="text-2xl font-medium text-gray-300 mt-4">Page Not Found</p>
      <p class="text-gray-400 mt-2">The page you're looking for doesn't exist or has been moved.</p>
      <div class="mt-6">
        <router-link to="/"
          class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500">
          Go back home
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// No additional logic needed for this component
</script>