<script lang="ts" setup>
import { ElButton, ElTable, ElTableColumn } from 'element-plus';
import { useQuery } from '@tanstack/vue-query';
import { useVideosService } from '@/services'
import { useStringHelpers } from '@/composables'

const { fetchVideos, deleteVideo } = useVideosService();
const { formatDate } = useStringHelpers()
const { isFetching, data } = useQuery({
  queryKey: ['videos'],
  queryFn: fetchVideos,
})

const confirmDelete = async (id: number) => {
  if (confirm('Do you confirm to delete this video?')) {
    await deleteVideo(id)
  }
}
</script>

<template>
  <ElTable :data="data" v-loading="isFetching" element-loading-text="Fetching data">
    <ElTableColumn prop="thumbnail_url" label="Thumbnail">
      <template #default="scope">
        <img :src="scope.row.thumbnail_url" alt="thumbnail-image" class="h-[150px] w-[150px]" />
      </template>
    </ElTableColumn>
    <ElTableColumn prop="name" label="Title" />
    <ElTableColumn prop="description" label="Description" width="300" show-overflow-tooltip />
    <ElTableColumn prop="created_at" label="Date Uploaded">
      <template #default="scope">
        {{ formatDate(scope.row.created_at) }}
      </template>
    </ElTableColumn>
    <ElTableColumn align="right" label="...">
      <template #default="scope">
        <ElButton type="primary" size="small" link>Edit</ElButton>
        <ElButton type="danger" size="small" @click="confirmDelete(scope.row.id)" link>Delete</ElButton>
      </template>
    </ElTableColumn>
  </ElTable>
</template>

<style lang="scss" scoped></style>