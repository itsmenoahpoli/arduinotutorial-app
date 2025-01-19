<script lang="ts" setup>
import { ref, reactive } from 'vue'
import { useVideosService } from '@/services';
import { ElCard, ElForm, ElFormItem, ElInput, ElButton, type FormRules, type FormInstance } from 'element-plus';

type CreateVideoTutorial = {
  name: string;
  description: string;
  status: 'draft' | 'published',
  video_file: any,
  thumbnail?: string
}

const { uploadVideo } = useVideosService()

const formRef = ref<FormInstance>()

const formModel = reactive<CreateVideoTutorial>({
  name: 'title',
  description: 'description',
  status: 'published',
  video_file: null,
  thumbnail: ''
})

const formRules = reactive<FormRules<{ title: string, description: string }>>({
  title: [
    { required: true, message: 'Field required' }
  ],
  description: [
    { required: true, message: 'Field required' }
  ],
})

const handleVideoInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]

  if (file && file.type.startsWith('video/')) {
    formModel.video_file = file;
    generateThumbnail(file);
  }
}

const handleRemoveVideoFile = () => {
  formModel.video_file = null
  formModel.thumbnail = ''
}

const handleSignin = async () => {
  await uploadVideo(formModel)
}

const generateThumbnail = (videoFile: File) => {
  const videoElement = document.createElement('video');
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  if (!ctx) return;

  const url = URL.createObjectURL(videoFile);
  videoElement.src = url;

  videoElement.addEventListener('loadedmetadata', () => {
    canvas.width = videoElement.videoWidth;
    canvas.height = videoElement.videoHeight;
    videoElement.currentTime = 1;
  });

  videoElement.addEventListener('seeked', () => {
    ctx.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
    const thumbnailDataUrl = canvas.toDataURL('image/jpeg');
    URL.revokeObjectURL(url);
    formModel.thumbnail = thumbnailDataUrl;
  });

  videoElement.addEventListener('error', () => {
    URL.revokeObjectURL(url);
  });
};
</script>

<template>
  <DashboardLayout title="Upload Video">
    <ElCard class="p-8">
      <div class="flex flex-col gap-y-5">
        <div>
          <h1>Please provide video details</h1>
          <small class="text-xs text-gray-400">Fields mark with (<span class="text-red-800">*</span>) are
            required</small>
        </div>
        <hr />

        <ElForm ref="formRef" :model="formModel" :rules="formRules" @submit.prevent="handleSignin" label-position="top"
          status-icon>

          <ElFormItem name="name" label="Title" required>
            <ElInput type="text" v-model="formModel.name" />
          </ElFormItem>
          <ElFormItem name="description" label="Description" required>
            <ElInput type="textarea" v-model="formModel.description" />
          </ElFormItem>
          <ElFormItem label="Video File" required>
            <div class="flex flex-col gap-y-2">
              <input v-if="!formModel.thumbnail" type="file" @change="handleVideoInput" />
              <div v-else>
                <ElButton type="primary" color="red" class="text-xs mb-3" @click="handleRemoveVideoFile">Remove
                </ElButton>
                <img :src="formModel.thumbnail" alt="Video Thumbnail" />
              </div>
            </div>
          </ElFormItem>

          <ElButton type="success" native-type="submit">Upload Video</ElButton>
        </ElForm>
      </div>
    </ElCard>
  </DashboardLayout>
</template>

<style lang="scss" scoped></style>