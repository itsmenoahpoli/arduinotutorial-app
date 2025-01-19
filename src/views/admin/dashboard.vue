<script lang="ts" setup>
import VideosList from '@/components/modules/videos/videos-list.vue';
</script>

<template>
  <DashboardLayout title="Manage Videos">
    <div class="flex justify-end mb-5">
      <RouterLink to="/admin/videos/upload">
        <ElButton type="primary" class="h-[40px] text-xs" plain>UPLOAD NEW VIDEO</ElButton>
      </RouterLink>

    </div>

    <VideosList />
  </DashboardLayout>
</template>

<style lang="scss" scoped></style>