<script lang="ts" setup>
import { useRoute, useRouter } from 'vue-router';
import { ElButton } from 'element-plus'
import { useAuthService } from '@/services'
import { ROUTES } from '@/constants';

const $props = defineProps<{
  title?: string;
}>()

const $route = useRoute()
const router = useRouter()
const { userSignout } = useAuthService()

const checkPath = (path: string) => {
  return path.includes($route.fullPath)
}

const handleLogout = () => {
  userSignout()
  router.push(ROUTES.API.SIGNIN)
}
</script>

<template>
  <div class="h-screen w-full">
    <div class="h-[70px] w-full flex justify-end items-center bg-white shadow-sm px-10">
      <ElButton type="danger" @click="handleLogout">Logout</ElButton>
    </div>

    <div className="flex flex-row p-10">
      <div class="flex flex-col w-1/4">
        <h1 className="text-3xl font-bold mb-10">{{ $props.title }}</h1>

        <div class="w-full h-full flex flex-col gap-y-4">
          <div class="w-full">
            <RouterLink to="/admin/dashboard">
              <ElButton :class="[
                'h-[50px] w-full text-xs',
                { '': checkPath('/admin/dashboard') }
              ]" outline active>
                Manage Videos
              </ElButton>
            </RouterLink>
          </div>
          <div class="w-full">
            <RouterLink to="/admin/users">
              <ElButton :class="[
                'h-[50px] w-full text-xs',
                { '': checkPath('/admin/users') }
              ]" outline>
                Manage Users
              </ElButton>
            </RouterLink>
          </div>
        </div>
      </div>

      <div class="w-full px-10">
        <slot />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
