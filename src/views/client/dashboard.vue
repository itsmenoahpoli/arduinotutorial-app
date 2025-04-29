<script lang="ts" setup>
import { ref } from 'vue'
import { useQuery } from '@tanstack/vue-query'
import { useVideosService } from '@/services'
import VideoPlayer from '@/components/modules/videos/video-player.vue'
import VideoSidebar from '@/components/modules/videos/video-sidebar.vue'

const { fetchVideos } = useVideosService()
const selectedVideo = ref(null)

const { data: videos } = useQuery({
  queryKey: ['videos'],
  queryFn: fetchVideos,
})

const handleVideoSelect = (video: any) => {
  selectedVideo.value = video
}
</script>

<template>
  <ClientDashboardLayout>
    <div class="flex gap-6">
      <!-- Main Video Container -->
      <div class="w-3/4">
        <VideoPlayer v-if="selectedVideo" :video="selectedVideo" />
        <div v-else class="h-[400px] bg-gray-200 rounded-lg flex items-center justify-center">
          <p class="text-white-500">Select a video to start learning</p>
        </div>
      </div>

      <!-- Video Sidebar -->
      <div class="w-1/4">
        <VideoSidebar :videos="videos" :selected-video="selectedVideo" @select-video="handleVideoSelect" />
      </div>
    </div>
  </ClientDashboardLayout>
</template>