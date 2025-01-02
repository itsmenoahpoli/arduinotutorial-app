<script lang="ts" setup>
import { ref, reactive } from 'vue'
import { ElForm, ElFormItem, ElInput, ElButton, type FormRules, type FormInstance } from 'element-plus';
import { useAuthService } from '@/services'
import { type Credentials } from '@/type/auth';

const props = defineProps<{
  loginType: 'admin' | 'client'
}>()

const { userSignin } = useAuthService();
const formRef = ref<FormInstance>()
const formModel = reactive<Credentials>({
  email: 'admin@domain.com',
  password: 'password'
})
const formRules = reactive<FormRules<Credentials>>({
  email: [
    { required: true, message: 'E-mail is required' }
  ],
  password: [
    { required: true, message: 'Password is required' }
  ]
})

const handleSignin = async () => {
  return await userSignin(formModel)
}
</script>

<template>
  <ElForm ref="formRef" :model="formModel" :rules="formRules" @submit.prevent="handleSignin" label-position="top" status-icon>
    <h1 class="text-center font-medium capitalize mb-4">{{ props.loginType }} Login</h1>
    <ElFormItem name="email" label="E-mail">
      <ElInput type="email" v-model="formModel.email" />
    </ElFormItem>
    <ElFormItem name="password" label="Password">
      <ElInput type="password" v-model="formModel.password" />
    </ElFormItem>
    <ElButton type="primary" native-type="submit">Log In</ElButton>
  </ElForm>
</template>

<style lang="scss" scoped></style>