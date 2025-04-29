<script lang="ts" setup>
import { ElCard } from 'element-plus';
import brandLogo from '@/assets/brand-logo.png';
</script>

<template>
  <div class="h-screen w-full flex justify-center items-center bg-pink-900">
    <ElCard class="w-[400px] border-pink-200">
      <div class="flex flex-col items-center gap-4">
        <img :src="brandLogo" alt="Arduino Tutorials Logo" class="w-32 h-32 object-contain" />
        <h1 class="text-xl font-bold text-gray-900">Arduino Basic Tutorials</h1>
      </div>
      <slot />
      <template #footer>
        <p class="text-xs text-center font-medium">All Rights Reserved &copy; 2025</p>
      </template>
    </ElCard>
  </div>
</template>

<style lang="scss" scoped>
:deep(.el-card) {
  --el-card-bg-color: white;
  --el-card-border-color: theme('colors.pink.200');
  --el-text-color-primary: theme('colors.gray.900');
}
</style>
