<script lang="ts" setup>
import { useRoute, useRouter } from 'vue-router';
import { ElButton } from 'element-plus'
import { useAuthService } from '@/services'
import { ROUTES } from '@/constants';
import BrandLogo from '@/assets/brand-logo.png'
import { useAuthStore } from '@/stores/auth.store'

const $props = defineProps<{
  title?: string;
}>()

const $route = useRoute()
const router = useRouter()
const { userSignout } = useAuthService()
const authStore = useAuthStore()

const checkPath = (path: string) => {
  return $route.fullPath.includes(path)
}

const handleLogout = () => {
  userSignout()
  router.push(ROUTES.API.SIGNIN)
}
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Sidebar -->
    <aside class="fixed left-0 top-0 h-full w-64 bg-pink-600 shadow-lg z-30">
      <div class="flex flex-col h-full">
        <!-- Logo area -->
        <div class="flex items-center justify-center px-6 border-b border-pink-500 py-5">
          <img :src="BrandLogo" alt="Arduino Tutorial" class="h-32 w-auto object-contain">
        </div>

        <!-- Navigation -->
        <nav class="flex-1 px-4 py-6 space-y-2">
          <RouterLink to="/admin/dashboard">
            <div :class="[
              'flex items-center px-4 py-3 rounded-lg transition-colors',
              checkPath('/admin/dashboard')
                ? 'bg-pink-700 text-white'
                : 'text-pink-100 hover:bg-pink-700 hover:text-white'
            ]">
              <span class="font-medium">Manage Videos</span>
            </div>
          </RouterLink>

          <RouterLink to="/admin/users">
            <div :class="[
              'flex items-center px-4 py-3 rounded-lg transition-colors',
              checkPath('/admin/users')
                ? 'bg-pink-700 text-white'
                : 'text-pink-100 hover:bg-pink-700 hover:text-white'
            ]">
              <span class="font-medium">Manage Users</span>
            </div>
          </RouterLink>
        </nav>

        <!-- User Info -->
        <div class="p-4 border-t border-pink-500">
          <div class="text-white">
            <p class="font-medium">{{ authStore.GET_USER?.fullName || 'Administrator' }}</p>
            <p class="text-sm text-pink-100">{{ authStore.GET_USER?.email }}</p>
          </div>
        </div>
      </div>
    </aside>

    <!-- Main Content -->
    <div class="ml-64 min-h-screen flex flex-col">
      <!-- Header -->
      <header class="h-16 bg-white shadow-sm flex items-center justify-between px-6 sticky top-0 z-20">
        <h2 class="text-xl font-medium text-gray-800">{{ $props.title }}</h2>

        <h1 class="text-xl font-bold">
          ARDUINO BASIC VIDEO TUTORIAL
        </h1>
        <ElButton type="danger" @click="handleLogout" class="hover:bg-red-600">
          LOGOUT
        </ElButton>
      </header>

      <!-- Page Content -->
      <main class="flex-1 p-6">
        <div class="bg-white rounded-lg shadow-sm p-6">
          <slot />
        </div>
      </main>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.router-link-active {
  @apply text-white bg-pink-700;
}
</style>
