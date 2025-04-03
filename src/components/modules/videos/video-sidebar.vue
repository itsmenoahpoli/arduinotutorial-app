<script lang="ts" setup>
import { ElCard, ElEmpty } from 'element-plus'
import { useStringHelpers } from '@/composables'

const { formatDate } = useStringHelpers()

defineProps<{
  videos: Array<any>
  selectedVideo: any
}>()

const emit = defineEmits<{
  (e: 'selectVideo', video: any): void
}>()
</script>

<template>
  <div class="flex flex-col gap-4">
    <h3 class="font-bold text-lg">Available Tutorials</h3>
    <div class="flex flex-col gap-2">
      <template v-if="videos?.length">
        <ElCard v-for="video in videos" :key="video.id" :class="[
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
