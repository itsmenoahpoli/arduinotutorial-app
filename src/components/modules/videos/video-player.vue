<script lang="ts" setup>
import { ref, reactive, watch } from 'vue'
import { ElCard, ElForm, ElFormItem, ElInput, ElButton, type FormInstance } from 'element-plus'

type QuestionKeys = `question${1 | 2 | 3 | 4 | 5}`
type AnswerKeys = `answer${1 | 2 | 3 | 4 | 5}`

interface Video {
  name: string
  description: string
  video_url: string
  question1: string
  answer1: string
  question2: string
  answer2: string
  question3: string
  answer3: string
  question4: string
  answer4: string
  question5: string
  answer5: string
}

interface QuizAnswers {
  [key: string]: string
}

const props = defineProps<{
  video: Video
}>()

const showQuiz = ref(false)
const videoRef = ref<HTMLVideoElement>()
const formRef = ref<FormInstance>()
const quizRef = ref<HTMLElement>()

const quizAnswers = reactive<QuizAnswers>({
  answer1: '',
  answer2: '',
  answer3: '',
  answer4: '',
  answer5: ''
})

const handleVideoEnded = () => {
  showQuiz.value = true
}

watch(showQuiz, (newValue) => {
  if (newValue && quizRef.value) {
    quizRef.value.scrollIntoView({ behavior: 'smooth' })
  }
})

const getQuestion = (n: number): string => {
  return props.video[`question${n}` as QuestionKeys]
}

const getCorrectAnswer = (n: number): string => {
  return props.video[`answer${n}` as AnswerKeys]
}

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

    <!-- Quiz Section -->
    <ElCard v-if="showQuiz" ref="quizRef" class="mt-4">
      <h3 class="text-lg font-bold mb-4">Video Quiz</h3>
      <ElForm ref="formRef" :model="quizAnswers" @submit.prevent="handleQuizSubmit(formRef)">
        <div class="space-y-6">
          <div v-for="n in 5" :key="n" class="border-b pb-4 last:border-0">
            <h4 class="font-medium text-gray-900 mb-2">
              Question {{ n }}: {{ getQuestion(n) }}
            </h4>
            <ElFormItem :prop="`answer${n}`" :rules="[
              { required: true, message: 'Please provide an answer', trigger: 'blur' }
            ]">
              <ElInput v-model="quizAnswers[`answer${n}`]" placeholder="Enter your answer" />
            </ElFormItem>
          </div>
        </div>
        <div class="mt-6">
          <ElButton type="primary" native-type="submit">
            Submit & proceed to next video
          </ElButton>
        </div>
      </ElForm>
    </ElCard>
  </div>
</template>

<style scoped>
.video-container {
  transition: all 0.3s ease;
}
</style>
