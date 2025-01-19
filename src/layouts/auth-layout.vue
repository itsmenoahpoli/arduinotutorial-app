<script lang="ts" setup>
import { ElCard } from 'element-plus';
</script>

<template>
  <div class="h-screen w-full flex justify-center items-center bg-slate-50">
    <ElCard class="w-[400px]">
      <slot />
      <template #footer>
        <p class="text-xs text-center text-gray-400">All Rights Reserved &copy; 2024</p>
      </template>
    </ElCard>
  </div>
</template>

<style lang="scss" scoped></style>
