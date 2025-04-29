<script lang="ts" setup>
import { ElCard, ElEmpty, ElInput } from 'element-plus'
import { useStringHelpers } from '@/composables'
import { ref, computed } from 'vue'

const { formatDate } = useStringHelpers()
const searchQuery = ref('')

const props = defineProps<{
  videos: Array<{
    id: string | number
    name: string
    thumbnail_url: string
    created_at: string
  }>
  selectedVideo: any
}>()

const emit = defineEmits<{
  (e: 'selectVideo', video: any): void
}>()

const filteredVideos = computed(() => {
  if (!searchQuery.value) return props.videos
  return props.videos.filter(video =>
    video.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})
</script>

<template>
  <div class="flex flex-col gap-4">
    <h3 class="font-bold text-white text-lg">Available Tutorials</h3>
    <ElInput v-model="searchQuery" placeholder="Search tutorials..." clearable />
    <div class="flex flex-col gap-2">
      <template v-if="filteredVideos?.length">
        <ElCard v-for="video in filteredVideos" :key="video.id" :class="[
          'cursor-pointer hover:bg-gray-50 transition-colors',
          { 'border-blue-500': selectedVideo?.id === video.id }
        ]" @click="emit('selectVideo', video)">
          <div class="flex gap-3">
            <img :src="video.thumbnail_url" :alt="video.name" class="w-32 h-20 object-cover rounded" />
            <div>
              <h4 class="font-medium line-clamp-2">{{ video.name }}</h4>
              <p class="text-xs text-gray-500">{{ formatDate(video.created_at) }}</p>
            </div>
          </div>
        </ElCard>
      </template>
      <ElEmpty v-else description="No tutorials available yet" />
    </div>
  </div>
</template>
