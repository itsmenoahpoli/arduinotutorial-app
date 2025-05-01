<script lang="ts" setup>
import { ElButton, ElMessageBox, ElInput, ElDialog } from 'element-plus';
import { useQuery } from '@tanstack/vue-query';
import { useVideosService } from '@/services'
import { useStringHelpers } from '@/composables'
import { ref, computed } from 'vue'

interface Video {
  id: number;
  name: string;
  description: string;
  thumbnail_url: string;
  created_at: string;
  video_url: string;
}

const { fetchVideos, deleteVideo } = useVideosService();
const { formatDate } = useStringHelpers()
const searchQuery = ref('')
const selectedVideo = ref<Video | null>(null)
const showVideoDialog = ref(false)

const { isFetching, data, refetch } = useQuery<Video[]>({
  queryKey: ['videos'],
  queryFn: fetchVideos,
})

const filteredVideos = computed(() => {
  if (!data.value) return []
  if (!searchQuery.value) return data.value

  const query = searchQuery.value.toLowerCase()
  return data.value.filter((video: Video) =>
    video.name.toLowerCase().includes(query)
  )
})

const openVideoDialog = (video: Video) => {
  selectedVideo.value = video
  showVideoDialog.value = true
}

const closeVideoDialog = () => {
  selectedVideo.value = null
  showVideoDialog.value = false
}

const confirmDelete = async (id: number, event?: Event) => {
  event?.stopPropagation()

  ElMessageBox.confirm(
    'Do you confirm to delete this video?',
    'Confirm',
    {
      confirmButtonClass: 'bg-red-500 hover:bg-red-700 border-0',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
      type: 'warning'
    }
  ).then(async () => {
    await deleteVideo(id).then(() => refetch())
  })
}
</script>

<template>
  <div>
    <div class="flex items-center justify-between gap-4">
      <ElInput v-model="searchQuery" placeholder="Search videos..." class="max-w-md" clearable>
        <template #prefix>
          <i class="el-icon-search">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clip-rule="evenodd" />
            </svg>
          </i>
        </template>
      </ElInput>
    </div>

    <div class="relative min-h-[200px] mt-5">
      <div v-if="isFetching" class="absolute inset-0 flex items-center justify-center bg-white bg-opacity-80 z-10">
        <div class="text-center">
          <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mb-2"></div>
          <p class="text-gray-600">Fetching data...</p>
        </div>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <div v-for="video in filteredVideos" :key="video.id" @click="openVideoDialog(video)"
          class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer">

          <div class="relative group">
            <img :src="video.thumbnail_url" :alt="video.name" class="w-full h-48 object-cover">
            <div class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300">
            </div>
          </div>


          <div class="p-4">
            <h3 class="text-lg font-semibold mb-2 line-clamp-1">{{ video.name }}</h3>
            <p class="text-gray-600 text-sm mb-4 line-clamp-2">{{ video.description }}</p>


            <div class="flex items-center justify-between text-sm text-gray-500">
              <span>{{ formatDate(video.created_at) }}</span>
              <ElButton type="danger" size="small" @click="confirmDelete(video.id, $event)" class="hover:text-red-700"
                link>
                Delete
              </ElButton>
            </div>
          </div>
        </div>
      </div>


      <div v-if="!isFetching && (!filteredVideos.length)" class="text-center py-12 text-gray-500">
        {{ searchQuery ? 'No videos found matching your search' : 'No videos available' }}
      </div>
    </div>


    <ElDialog v-model="showVideoDialog" :title="selectedVideo?.name" width="100%" @close="closeVideoDialog"
      destroy-on-close>
      <div v-if="selectedVideo" class="space-y-6">

        <div class="relative w-full" style="padding-top: 56.25%">
          <video class="absolute inset-0 w-full h-full" :src="selectedVideo.video_url" controls autoplay></video>
        </div>


        <div class="space-y-4">
          <h2 class="text-xl font-semibold">{{ selectedVideo.name }}</h2>
          <p class="text-gray-600">{{ selectedVideo.description }}</p>
          <div class="text-sm text-gray-500">
            Uploaded on {{ formatDate(selectedVideo.created_at) }}
          </div>
        </div>
      </div>
    </ElDialog>
  </div>
</template>

<style lang="scss" scoped>
.line-clamp-1 {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

:deep(.el-dialog) {
  @media (min-width: 1024px) {
    --el-dialog-width: 80% !important;
    max-width: 1200px;
  }
}
</style>