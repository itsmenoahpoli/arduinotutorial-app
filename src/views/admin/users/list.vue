<script lang="ts" setup>
import UsersList from '@/components/modules/users/users-list.vue';
</script>

<template>
  <DashboardLayout title="Manage Users">
    <div class="flex justify-end mb-5">
      <RouterLink to="/admin/users/create">
        <ElButton type="primary" class="h-[40px] text-xs" plain>CREATE NEW USER</ElButton>
      </RouterLink>
    </div>

    <UsersList />
  </DashboardLayout>
</template>

<style lang="scss" scoped></style>
