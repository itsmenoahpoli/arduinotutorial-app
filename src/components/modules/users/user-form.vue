<script lang="ts" setup>
import { ref, reactive } from 'vue'
import { ElCard, ElForm, ElFormItem, ElInput, ElButton, type FormRules, type FormInstance } from 'element-plus';
import { useUsersService } from '@/services';

type CreateUser = {
  name: string;
  email: string;
  password: string;
}

const { createUser } = useUsersService()

const formRef = ref<FormInstance>()

const formModel = reactive<CreateUser>({
  name: '',
  email: '',
  password: '',
})

const formRules = reactive<FormRules>({
  name: [
    { required: true, message: 'Name is required' },
    { max: 255, message: 'Maximum length is 255 characters' }
  ],
  email: [
    { required: true, message: 'Email is required' },
    { type: 'email', message: 'Please enter a valid email' }
  ],
  password: [
    { required: true, message: 'Password is required' },
    { min: 6, message: 'Password must be at least 6 characters' }
  ]
})

const handleSubmit = async () => {
  if (!formRef.value) return

  await formRef.value.validate(async (valid) => {
    if (valid) {
      await createUser(formModel)
    }
  })
}
</script>

<template>
  <ElCard class="p-8">
    <div class="flex flex-col gap-y-5">
      <div>
        <h1>Create New User</h1>
        <small class="text-xs text-gray-400">Fields marked with (<span class="text-red-800">*</span>) are
          required</small>
      </div>
      <hr />

      <ElForm ref="formRef" :model="formModel" :rules="formRules" @submit.prevent="handleSubmit" label-position="top"
        status-icon>
        <ElFormItem name="name" label="Name" required>
          <ElInput v-model="formModel.name" />
        </ElFormItem>
        <ElFormItem name="email" label="Email" required>
          <ElInput type="email" v-model="formModel.email" />
        </ElFormItem>
        <ElFormItem name="password" label="Password" required>
          <ElInput type="password" v-model="formModel.password" />
        </ElFormItem>

        <ElButton type="primary" native-type="submit">Create User</ElButton>
      </ElForm>
    </div>
  </ElCard>
</template>