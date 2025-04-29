<script lang="ts" setup>
import { ref, reactive, watch } from 'vue'
import { ElCard, ElForm, ElFormItem, ElInput, ElButton, ElRadioGroup, ElRadio, ElDialog, type FormInstance } from 'element-plus'

type QuestionType = 'multiple_choice' | 'enumeration'

interface Question {
  id: number
  type: QuestionType
  question: string
  answer: string
  choices?: string[]
}

interface Video {
  name: string
  description: string
  video_url: string
  questions: Question[]
}

interface QuizAnswers {
  [key: string]: string
}

const props = defineProps<{
  video: Video
}>()

const dialogVisible = ref(true)
const videoRef = ref<HTMLVideoElement>()
const formRef = ref<FormInstance>()
const quizRef = ref<HTMLElement>()

const quizAnswers = reactive<QuizAnswers>({})

const handleVideoEnded = () => {
  dialogVisible.value = true
}

watch(dialogVisible, (newValue) => {
  if (newValue && quizRef.value) {
    quizRef.value.scrollIntoView({ behavior: 'smooth' })
  }
})

const handleQuizSubmit = async (formEl: FormInstance | undefined) => {
  if (!formEl) return

  await formEl.validate((valid) => {
    if (valid) {
      // Here you can handle the quiz submission
      console.log('Quiz submitted:', quizAnswers)
    }
  })
}
</script>

<template>
  <div class="flex flex-col gap-4">
    <div>
      <video ref="videoRef" :src="video.video_url" class="w-full aspect-video bg-black rounded-lg" controls
        @ended="handleVideoEnded" />
    </div>

    <ElCard>
      <h2 class="text-xl font-bold mb-2">{{ video.name }}</h2>
      <p class="text-gray-600">{{ video.description }}</p>
    </ElCard>

    <!-- Quiz Dialog -->
    <ElDialog v-model="dialogVisible" title="Video Quiz" width="50%" :close-on-click-modal="false"
      :close-on-press-escape="false" :show-close="false">
      <ElForm ref="formRef" :model="quizAnswers" @submit.prevent="handleQuizSubmit(formRef)">
        <h1 class="text-lg font-bold">Questionnaire for video - {{ video.name }}</h1>
        <hr />
        <div class="space-y-6 mt-5">
          <div v-for="question in JSON.parse(video.questions as any)" :key="question.id"
            class="border-b pb-4 last:border-0">
            <h4 class="font-medium text-gray-900 mb-2">
              {{ question.question }}
            </h4>
            <ElFormItem :prop="`answer${question.id}`" :rules="[
              { required: true, message: 'Please provide an answer', trigger: 'blur' }
            ]">
              <template v-if="question.type === 'multiple_choice'">
                <ElRadioGroup v-model="quizAnswers[`answer${question.id}`]">
                  <ElRadio v-for="choice in question.choices" :key="choice" :label="choice">
                    {{ choice }}
                  </ElRadio>
                </ElRadioGroup>
              </template>
              <template v-else>
                <ElInput v-model="quizAnswers[`answer${question.id}`]" placeholder="Enter your answer" />
              </template>
            </ElFormItem>
          </div>
        </div>
        <div class="mt-6">
          <ElButton type="primary" native-type="submit">
            Submit & proceed to next video
          </ElButton>
        </div>
      </ElForm>
    </ElDialog>
  </div>
</template>

<style scoped>
.video-container {
  transition: all 0.3s ease;
}
</style>
