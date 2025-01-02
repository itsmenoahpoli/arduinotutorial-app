<script lang="ts" setup>
import { ElButton } from 'element-plus'
</script>

<template>
  <div class="h-screen w-full bg-gray-100">
    <div class="h-[70px] w-full flex justify-end items-center bg-white shadow-sm px-10">
      <ElButton type="danger">Logout</ElButton>
    </div>

    <div class="p-10">
      <slot />
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
