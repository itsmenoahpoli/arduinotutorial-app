<script lang="ts" setup>
import { computed, ref, reactive } from 'vue';
import { ElButton, ElTable, ElTableColumn, ElMessageBox, ElDialog, ElForm, ElFormItem, ElInput } from 'element-plus';
import { useQuery } from '@tanstack/vue-query';
import { useUsersService } from '@/services'
import { useStringHelpers } from '@/composables'
import { useAuthStore } from '@/stores'

const { fetchUsers, deleteUser, updateUser } = useUsersService();
const { formatDate } = useStringHelpers()
const authStore = useAuthStore()

const editDialogVisible = ref(false)
const selectedUser = ref(null)
const editForm = reactive({
  name: '',
  email: '',
  password: ''
})

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

const openEditDialog = (user: any) => {
  selectedUser.value = user
  editForm.name = user.name
  editForm.email = user.email
  editForm.password = ''
  editDialogVisible.value = true
}

const handleUpdateUser = async () => {
  if (!selectedUser.value) return

  const payload = { ...editForm }
  if (!payload.password) {
    // @ts-ignore
    delete payload.password
  }

  await updateUser((selectedUser.value as any).id, payload)
  editDialogVisible.value = false
  refetch()
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
        <ElButton type="primary" size="small" @click="openEditDialog(scope.row)" link>
          Edit
        </ElButton>
        <ElButton type="danger" size="small" @click="confirmDelete(scope.row.id)" link>
          Delete
        </ElButton>
      </template>
    </ElTableColumn>
  </ElTable>

  <ElDialog v-model="editDialogVisible" title="Edit User" width="500px">
    <ElForm @submit.prevent="handleUpdateUser">
      <ElFormItem label="Name" required>
        <ElInput v-model="editForm.name" />
      </ElFormItem>
      <ElFormItem label="Email" required>
        <ElInput v-model="editForm.email" />
      </ElFormItem>
      <ElFormItem label="Password" required>
        <ElInput type="password" v-model="editForm.password" placeholder="Leave empty to keep current password" />
      </ElFormItem>
      <div class="dialog-footer">
        <ElButton @click="editDialogVisible = false">Cancel</ElButton>
        <ElButton type="primary" @click="handleUpdateUser">Update</ElButton>
      </div>
    </ElForm>
  </ElDialog>
</template>
