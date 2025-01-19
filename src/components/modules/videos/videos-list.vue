<script lang="ts" setup>
import { ElButton, ElTable, ElTableColumn } from 'element-plus';
import { useQuery } from '@tanstack/vue-query';
import { useVideosService } from '@/services'

const { fetchVideos } = useVideosService();
const { isFetching, data } = useQuery({
  queryKey: ['videos'],
  queryFn: fetchVideos,
})
</script>

<template>
  <ElTable :data="data" v-loading="isFetching" element-loading-text="Fetching data">
    <ElTableColumn prop="thumbnail_url" label="Thumbnail" />
    <ElTableColumn prop="name" label="Title" />
    <ElTableColumn prop="description" label="Description" />
    <ElTableColumn prop="created_at" label="Date Uploaded" />
    <ElTableColumn align="right" label="...">
      <template #default>
        <ElButton type="primary" size="small" link>Edit</ElButton>
        <ElButton type="danger" size="small" link>Delete</ElButton>
      </template>
    </ElTableColumn>
  </ElTable>
</template>

<style lang="scss" scoped></style>