<script lang="ts" setup>
import { ElButton } from 'element-plus'
import { useAuthService } from '@/services'
import { useRouter } from 'vue-router'
import { ROUTES } from '@/constants/routes.constant'

const router = useRouter()
const { userSignout } = useAuthService()

const handleLogout = () => {
  userSignout()
  router.push(ROUTES.API.SIGNIN)
}
</script>

<template>
  <div class="h-screen w-full bg-pink-900">
    <!-- Header -->
    <div class="h-[70px] w-full flex justify-between items-center bg-white shadow-sm px-10">
      <h1 class="text-xl font-bold">ARDUINO BASIC TUTORIALS</h1>
      <ElButton type="danger" @click="handleLogout">Logout</ElButton>
    </div>

    <!-- Main Content -->
    <div class="container mx-auto p-6">
      <slot />
    </div>
  </div>
</template>
