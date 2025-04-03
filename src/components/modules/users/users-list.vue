<script lang="ts" setup>
import { computed } from 'vue';
import { ElButton, ElTable, ElTableColumn, ElMessageBox } from 'element-plus';
import { useQuery } from '@tanstack/vue-query';
import { useUsersService } from '@/services'
import { useStringHelpers } from '@/composables'
import { useAuthStore } from '@/stores'

const { fetchUsers, deleteUser } = useUsersService();
const { formatDate } = useStringHelpers()
const authStore = useAuthStore()

const { isFetching, data, refetch } = useQuery({
  queryKey: ['users'],
  queryFn: fetchUsers,
})

// Filter out the current user and show only client users
const filteredUsers = computed(() => {
  if (!data.value) return []
  return data.value.filter((user: any) =>
    // @ts-ignore
    user.id !== authStore.GET_USER?.id &&
    user.user_type === 'client'
  )
})

const confirmDelete = async (id: number) => {
  ElMessageBox.confirm(
    'Do you confirm to delete this user?',
    'Confirm',
    {
      confirmButtonClass: 'bg-red-500 hover:bg-red-700 border-0',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
      type: 'warning'
    }
  ).then(async () => {
    await deleteUser(id).then(() => refetch())
  })
}
</script>

<template>
  <ElTable :data="filteredUsers" v-loading="isFetching" element-loading-text="Fetching data">
    <ElTableColumn prop="name" label="Name" />
    <ElTableColumn prop="email" label="Email" />
    <ElTableColumn prop="created_at" label="Date Joined">
      <template #default="scope">
        {{ formatDate(scope.row.created_at) }}
      </template>
    </ElTableColumn>
    <ElTableColumn align="right" label="Actions">
      <template #default="scope">
        <ElButton type="primary" size="small" @click="$router.push(`/admin/users/${scope.row.id}/edit`)" link>
          Edit
        </ElButton>
        <ElButton type="danger" size="small" @click="confirmDelete(scope.row.id)" link>
          Delete
        </ElButton>
      </template>
    </ElTableColumn>
  </ElTable>
</template>
