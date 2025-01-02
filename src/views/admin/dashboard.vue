<script lang="ts" setup>
import { reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { ElButton } from 'element-plus';
import VideosList from '@/components/modules/videos/videos-list.vue';

const router = useRouter();
</script>

<template>
  <DashboardLayout>
    <h1 className="text-3xl font-bold mb-10">Dashboard</h1>

    <div className="h-full flex flex-row">
      <div class="w-1/6 h-full flex flex-col gap-y-4">
        <div class="w-full">
          <ElButton class="h-[50px] w-full text-xs" outline>Manage Videos</ElButton>
        </div>
        <div class="w-full">
          <ElButton class="h-[50px] w-full text-xs" outline>Manage Users</ElButton>
        </div>
      </div>
      <div class="w-full h-full px-10">
        <div class="flex justify-between mb-5">
          <h1 class="text-xl">Manage Videos</h1>
          <div>
            <ElButton type="primary" class="h-[40px] w-full text-xs" plain>UPLOAD NEW VIDEO</ElButton>
          </div>
        </div>

        <div class="w-full h-full bg-white border border-gray-300">
          <VideosList />
        </div>
      </div>
    </div>
  </DashboardLayout>
</template>

<style lang="scss" scoped></style>