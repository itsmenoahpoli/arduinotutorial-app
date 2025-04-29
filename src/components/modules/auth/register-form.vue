<template>
  <ElForm ref="registerForm" :model="formData" :rules="rules" label-position="top" @submit.prevent="handleSubmit">
    <ElFormItem label="Full Name" prop="fullname">
      <el-input v-model="formData.fullname" placeholder="Enter your full name" />
    </ElFormItem>

    <ElFormItem label="Email" prop="email">
      <el-input v-model="formData.email" placeholder="Enter your email" />
    </ElFormItem>

    <ElFormItem label="Password" prop="password">
      <el-input v-model="formData.password" type="password" placeholder="Enter your password" show-password />
    </ElFormItem>

    <ElFormItem label="Confirm Password" prop="confirmPassword">
      <el-input v-model="formData.confirmPassword" type="password" placeholder="Confirm your password" show-password />
    </ElFormItem>

    <ElFormItem>
      <ElButton type="primary" native-type="submit" :loading="loading" class="w-full">
        Register
      </ElButton>
    </ElFormItem>

    <div class="login-link">
      Already have an account? <router-link to="/auth/signin">Login here</router-link>
    </div>
  </ElForm>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { useUsersService } from '@/services/users.service';
import { ElMessage } from 'element-plus';

const router = useRouter();
const { createUser } = useUsersService();
const loading = ref(false);
const registerForm = ref();

const formData = reactive({
  fullname: '',
  email: '',
  password: '',
  confirmPassword: '',
});

const validatePass = (rule: any, value: string, callback: any) => {
  if (value === '') {
    callback(new Error('Please input the password'));
  } else {
    if (formData.confirmPassword !== '') {
      registerForm.value?.validateField('confirmPassword');
    }
    callback();
  }
};

const validatePass2 = (_: any, value: string, callback: any) => {
  if (value === '') {
    callback(new Error('Please input the password again'));
  } else if (value !== formData.password) {
    callback(new Error("Two passwords don't match!"));
  } else {
    callback();
  }
};

const rules = {
  fullname: [
    { required: true, message: 'Please input your full name', trigger: 'blur' },
    { min: 3, message: 'Full name must be at least 3 characters', trigger: 'blur' }
  ],
  email: [
    { required: true, message: 'Please input your email', trigger: 'blur' },
    { type: 'email', message: 'Please input a valid email', trigger: 'blur' }
  ],
  password: [
    { required: true, validator: validatePass, trigger: 'blur' },
    { min: 6, message: 'Password must be at least 6 characters', trigger: 'blur' }
  ],
  confirmPassword: [
    { required: true, validator: validatePass2, trigger: 'blur' }
  ]
};

const handleSubmit = async () => {
  if (!registerForm.value) return;

  await registerForm.value.validate(async (valid: boolean) => {
    if (valid) {
      loading.value = true;
      try {
        await createUser({
          name: formData.fullname,
          email: formData.email,
          password: formData.password
        });
        ElMessage.success('Registration successful! Please login.');
        router.push('/auth/signin');
      } catch (error) {
        console.error('Registration failed:', error);
      } finally {
        loading.value = false;
      }
    }
  });
};
</script>

<style scoped>
.register-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f5f7fa;
}

.register-card {
  width: 100%;
  max-width: 500px;
  margin: 20px;
}

.register-card :deep(.el-card__header) {
  text-align: center;
}

.login-link {
  text-align: center;
  margin-top: 20px;
}

.login-link a {
  color: #409eff;
  text-decoration: none;
}

.login-link a:hover {
  text-decoration: underline;
}
</style>