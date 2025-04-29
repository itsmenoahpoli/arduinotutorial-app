<script lang="ts" setup>
import { ref, reactive } from 'vue'
import { useVideosService } from '@/services';
import { ElCard, ElForm, ElFormItem, ElInput, ElButton, ElDialog, ElSelect, ElOption, type FormRules, type FormInstance } from 'element-plus';
import { Delete, Plus } from '@element-plus/icons-vue';

type QuestionType = 'multiple_choice' | 'enumeration';

interface Question {
  id: number;
  type: QuestionType;
  question: string;
  answer: string;
  choices?: string[];
}

type CreateVideoTutorial = {
  name: string;
  description: string;
  status: 'draft' | 'published';
  video_file: any;
  thumbnail_file: any;
  thumbnail?: string;
  questions: Question[];
}

const { uploadVideo } = useVideosService()

const formRef = ref<FormInstance>()
const showQuestionTypeDialog = ref(false)
const newQuestionType = ref<QuestionType>('multiple_choice')

const formModel = reactive<CreateVideoTutorial>({
  name: '',
  description: '',
  status: 'published',
  video_file: null,
  thumbnail_file: null,
  thumbnail: '',
  questions: []
})

const formRules = reactive<FormRules>({
  name: [
    { required: true, message: 'Field required' }
  ],
  description: [
    { required: true, message: 'Field required' }
  ]
})

const handleAddQuestion = () => {
  showQuestionTypeDialog.value = true
}

const handleQuestionTypeSelect = () => {
  const newQuestion: Question = {
    id: Date.now(),
    type: newQuestionType.value,
    question: '',
    answer: '',
    choices: newQuestionType.value === 'multiple_choice' ? ['', '', '', ''] : undefined
  }
  formModel.questions.push(newQuestion)
  showQuestionTypeDialog.value = false
}

const handleRemoveQuestion = (index: number) => {
  formModel.questions.splice(index, 1)
}

const handleAddChoice = (questionIndex: number) => {
  if (formModel.questions[questionIndex].choices) {
    formModel.questions[questionIndex].choices?.push('')
  }
}

const handleRemoveChoice = (questionIndex: number, choiceIndex: number) => {
  if (formModel.questions[questionIndex].choices) {
    formModel.questions[questionIndex].choices?.splice(choiceIndex, 1)
  }
}

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

        <!-- Questions Section -->
        <div class="border p-4 rounded-md mb-4">
          <div class="flex justify-between items-center mb-4">
            <h2 class="text-lg font-medium">Quiz Questions</h2>
            <ElButton type="primary" :icon="Plus" @click="handleAddQuestion">
              Add Question
            </ElButton>
          </div>

          <div v-for="(question, index) in formModel.questions" :key="question.id" class="mb-6 p-4 border rounded-md">
            <div class="flex justify-between items-start mb-4">
              <h3 class="text-md font-medium">Question {{ index + 1 }}</h3>
              <ElButton type="danger" size="small" @click="handleRemoveQuestion(index)" :icon="Delete">
                Remove
              </ElButton>
            </div>

            <ElFormItem :label="'Question'" required>
              <ElInput type="text" v-model="question.question" />
            </ElFormItem>

            <template v-if="question.type === 'multiple_choice'">
              <div class="mb-4">
                <h4 class="text-sm font-medium mb-2">Choices</h4>
                <div v-for="(choice, choiceIndex) in question.choices" :key="choiceIndex" class="flex gap-2 mb-2">
                  <ElInput v-model="question.choices[choiceIndex]" placeholder="Enter choice" />
                  <ElButton type="danger" size="small" @click="handleRemoveChoice(index, choiceIndex)" :icon="Delete" />
                </div>
                <ElButton type="primary" size="small" @click="handleAddChoice(index)" class="mt-2">
                  Add Choice
                </ElButton>
              </div>
            </template>

            <ElFormItem :label="'Correct Answer'" required>
              <ElInput type="text" v-model="question.answer" />
            </ElFormItem>
          </div>
        </div>

        <ElButton type="success" native-type="submit">Upload Video</ElButton>
      </ElForm>
    </div>

    <!-- Question Type Selection Dialog -->
    <ElDialog v-model="showQuestionTypeDialog" title="Select Question Type" width="30%">
      <div class="flex flex-col gap-4">
        <ElSelect v-model="newQuestionType" placeholder="Select question type">
          <ElOption label="Multiple Choice" value="multiple_choice" />
          <ElOption label="Enumeration" value="enumeration" />
        </ElSelect>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <ElButton @click="showQuestionTypeDialog = false">Cancel</ElButton>
          <ElButton type="primary" @click="handleQuestionTypeSelect">
            Add Question
          </ElButton>
        </span>
      </template>
    </ElDialog>
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
