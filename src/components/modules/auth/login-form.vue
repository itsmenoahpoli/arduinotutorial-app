<script lang="ts" setup>
import { ref, reactive } from 'vue'
import { ElForm, ElFormItem, ElInput, ElButton, type FormRules, type FormInstance } from 'element-plus';
import { useAuthService } from '@/services'
import { type Credentials } from '@/type/auth';
import { useRouter } from 'vue-router';

const router = useRouter();
const { userSignin } = useAuthService();
const formRef = ref<FormInstance>()
const isLoading = ref(false)
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
  try {
    isLoading.value = true
    await userSignin(formModel)
  } catch (error) {
    console.log(error)
    isLoading.value = false
  }
}

const handleSignup = () => {
  router.push('/auth/signup');
}
</script>

<template>
  <ElForm ref="formRef" :model="formModel" :rules="formRules" @submit.prevent="handleSignin" label-position="top"
    status-icon>
    <h1 class="text-center font-medium capitalize mb-4">System Login</h1>
    <ElFormItem name="email" label="E-mail">
      <ElInput type="email" v-model="formModel.email" />
    </ElFormItem>
    <ElFormItem name="password" label="Password">
      <ElInput type="password" v-model="formModel.password" />
    </ElFormItem>
    <ElFormItem>
      <ElButton type="primary" native-type="submit" :loading="isLoading" :disabled="isLoading" class="w-full">Log In
      </ElButton>
    </ElFormItem>
    <ElFormItem>
      <ElButton @click="handleSignup" class="w-full">Create Account</ElButton>
    </ElFormItem>
  </ElForm>
</template>

<style lang="scss" scoped>
.button-group {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 20px;
}

.w-full {
  width: 100%;
}
</style>