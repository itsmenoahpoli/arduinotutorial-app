<script lang="ts" setup>
import { ref, reactive } from 'vue'
import { useVideosService } from '@/services';
import { ElCard, ElForm, ElFormItem, ElInput, ElButton, type FormRules, type FormInstance } from 'element-plus';
import { Delete } from '@element-plus/icons-vue';

type CreateVideoTutorial = {
  name: string;
  description: string;
  status: 'draft' | 'published';
  video_file: any;
  thumbnail_file: any;
  thumbnail?: string;
  question1: string;
  answer1: string;
  question2: string;
  answer2: string;
  question3: string;
  answer3: string;
  question4: string;
  answer4: string;
  question5: string;
  answer5: string;
}

// Helper type for dynamic key access
type QuestionKeys = `question${1 | 2 | 3 | 4 | 5}`;
type AnswerKeys = `answer${1 | 2 | 3 | 4 | 5}`;

const { uploadVideo } = useVideosService()

const formRef = ref<FormInstance>()

const formModel = reactive<CreateVideoTutorial>({
  name: '',
  description: '',
  status: 'published',
  video_file: null,
  thumbnail_file: null,
  thumbnail: '',
  question1: '',
  answer1: '',
  question2: '',
  answer2: '',
  question3: '',
  answer3: '',
  question4: '',
  answer4: '',
  question5: '',
  answer5: ''
})

// Helper function for type-safe property access
const getModelValue = (key: QuestionKeys | AnswerKeys) => {
  return formModel[key];
}

// Helper function for type-safe property setting
const setModelValue = (key: QuestionKeys | AnswerKeys, value: string) => {
  formModel[key] = value;
}

const formRules = reactive<FormRules>({
  title: [
    { required: true, message: 'Field required' }
  ],
  description: [
    { required: true, message: 'Field required' }
  ],
  question1: [
    { required: true, message: 'Question 1 is required' },
    { max: 255, message: 'Maximum length is 255 characters' }
  ],
  answer1: [
    { required: true, message: 'Answer 1 is required' },
    { max: 255, message: 'Maximum length is 255 characters' }
  ],
  question2: [
    { required: true, message: 'Question 2 is required' },
    { max: 255, message: 'Maximum length is 255 characters' }
  ],
  answer2: [
    { required: true, message: 'Answer 2 is required' },
    { max: 255, message: 'Maximum length is 255 characters' }
  ],
  question3: [
    { required: true, message: 'Question 3 is required' },
    { max: 255, message: 'Maximum length is 255 characters' }
  ],
  answer3: [
    { required: true, message: 'Answer 3 is required' },
    { max: 255, message: 'Maximum length is 255 characters' }
  ],
  question4: [
    { required: true, message: 'Question 4 is required' },
    { max: 255, message: 'Maximum length is 255 characters' }
  ],
  answer4: [
    { required: true, message: 'Answer 4 is required' },
    { max: 255, message: 'Maximum length is 255 characters' }
  ],
  question5: [
    { required: true, message: 'Question 5 is required' },
    { max: 255, message: 'Maximum length is 255 characters' }
  ],
  answer5: [
    { required: true, message: 'Answer 5 is required' },
    { max: 255, message: 'Maximum length is 255 characters' }
  ]
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

const handleUploadSubmit = async () => {
  await uploadVideo(formModel)
}

const dataURLToBlob = (dataURL: string): Blob => {
  const [header, base64] = dataURL.split(',');
  const mimeMatch = header.match(/:(.*?);/);
  const mimeType = mimeMatch ? mimeMatch[1] : 'image/jpeg';
  const binary = atob(base64);
  const array = new Uint8Array(binary.length);

  for (let i = 0; i < binary.length; i++) {
    array[i] = binary.charCodeAt(i);
  }

  return new Blob([array], { type: mimeType });
};

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
    const blob = dataURLToBlob(thumbnailDataUrl);
    const thumbnailFile = new File([blob], 'thumbnail.jpg', { type: 'image/jpeg' });
    URL.revokeObjectURL(url);
    formModel.thumbnail = thumbnailDataUrl;
    formModel.thumbnail_file = thumbnailFile
  });

  videoElement.addEventListener('error', () => {
    URL.revokeObjectURL(url);
  });
}

const isDragging = ref(false)

const handleDragOver = (event: DragEvent) => {
  event.preventDefault()
  isDragging.value = true
}

const handleDragLeave = (event: DragEvent) => {
  event.preventDefault()
  isDragging.value = false
}

const handleDrop = (event: DragEvent) => {
  event.preventDefault()
  isDragging.value = false

  const file = event.dataTransfer?.files[0]
  if (file && file.type.startsWith('video/')) {
    formModel.video_file = file
    generateThumbnail(file)
  }
}

const getVideoFileSize = (file: File): string => {
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
  if (!file) return '0 Byte'
  const i = parseInt(Math.floor(Math.log(file.size) / Math.log(1024)).toString())
  return Math.round(file.size / Math.pow(1024, i)) + ' ' + sizes[i]
}
</script>

<template>
  <ElCard class="p-8">
    <div class="flex flex-col gap-y-5">
      <div>
        <h1>Please provide video details</h1>
        <small class="text-xs text-gray-400">Fields mark with (<span class="text-red-800">*</span>) are
          required</small>
      </div>
      <hr />

      {{ formModel }}

      <ElForm ref="formRef" :model="formModel" :rules="formRules" @submit.prevent="handleUploadSubmit"
        label-position="top" status-icon>
        <ElFormItem name="name" label="Title" required>
          <ElInput type="text" v-model="formModel.name" />
        </ElFormItem>
        <ElFormItem name="description" label="Description" required>
          <ElInput type="textarea" v-model="formModel.description" />
        </ElFormItem>
        <ElFormItem label="Video File" required>
          <div class="w-full min-h-[250px] relative border-2 border-dashed rounded-lg p-6" :class="{
            'border-gray-300 bg-gray-50': !isDragging && !formModel.video_file,
            'border-blue-500 bg-blue-50': isDragging,
            'border-green-500 bg-green-50': formModel.video_file
          }" @dragover="handleDragOver" @dragleave="handleDragLeave" @drop="handleDrop">
            <!-- Upload State -->
            <div v-if="!formModel.video_file" class="w-full text-center">
              <div class="w-full flex flex-col items-center justify-center gap-2">
                <i class="el-icon-upload text-4xl text-gray-400"></i>
                <div class="text-gray-600">
                  Drag and drop your video here or
                  <label class="text-blue-500 hover:text-blue-700 cursor-pointer">
                    browse
                    <input type="file" class="hidden" accept="video/*" @change="handleVideoInput">
                  </label>
                </div>
                <p class="text-sm text-gray-500">
                  Supported formats: MP4, WebM, Ogg
                </p>
              </div>
            </div>

            <!-- Preview State -->
            <div v-else class="flex flex-col gap-4">
              <div class="flex items-start gap-4">
                <!-- Thumbnail Preview -->
                <div class="w-48 h-32 bg-black rounded overflow-hidden">
                  <img v-if="formModel.thumbnail" :src="formModel.thumbnail" alt="Video Thumbnail"
                    class="w-full h-full object-cover" />
                </div>

                <!-- Video Details -->
                <div class="flex-1">
                  <h4 class="font-medium text-gray-900">
                    {{ formModel.video_file.name }}
                  </h4>
                  <p class="text-sm text-gray-500">
                    Size: {{ getVideoFileSize(formModel.video_file) }}
                  </p>
                  <p class="text-sm text-gray-500">
                    Type: {{ formModel.video_file.type }}
                  </p>
                </div>

                <!-- Remove Button -->
                <ElButton type="danger" size="small" @click="handleRemoveVideoFile" class="!px-3" :icon="Delete">
                  Remove
                </ElButton>
              </div>
            </div>
          </div>
        </ElFormItem>

        <!-- Questions and Answers -->
        <div class="border p-4 rounded-md mb-4">
          <h2 class="text-lg font-medium mb-4">Quiz Questions</h2>

          <div v-for="n in 5" :key="n" class="mb-6">
            <h3 class="text-md font-medium mb-2">Question {{ n }}</h3>
            <ElFormItem :name="`question${n}`" label="Question" required>
              <ElInput type="text" v-model="formModel[`question${n}` as QuestionKeys]" />
            </ElFormItem>
            <ElFormItem :name="`answer${n}`" label="Answer" required>
              <ElInput type="text" v-model="formModel[`answer${n}` as AnswerKeys]" />
            </ElFormItem>
          </div>
        </div>

        <ElButton type="success" native-type="submit">Upload Video</ElButton>
      </ElForm>
    </div>
  </ElCard>
</template>

<style scoped>
.el-icon-upload {
  font-size: 48px;
}

/* Optional: Add some transitions */
.border-2 {
  transition: all 0.3s ease;
}
</style>
