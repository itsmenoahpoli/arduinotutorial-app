<script lang="ts" setup>
import { ElButton, ElTable, ElTableColumn } from 'element-plus';
import { useQuery } from '@tanstack/vue-query';
import { useVideosService } from '@/services'

const { getVideos } = useVideosService();
const { isFetching, data } = useQuery({
  queryKey: ['videos'],
  queryFn: getVideos,
})
</script>

<template>
  <el-table :data="data" v-loading="isFetching" element-loading-text="Fetching data">
    <el-table-column fixed prop="date" label="Date" />
    <el-table-column prop="title" label="Title" />
    <el-table-column prop="description" label="Description" />
    <el-table-column prop="category" label="Category" />
    <el-table-column prop="created_at" label="Date Uploaded" />
    <el-table-column align="right" label="...">
      <template #default>
        <el-button link type="primary" size="small" @click="handleClick">
          Detail
        </el-button>
        <el-button link type="primary" size="small">Edit</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<style lang="scss" scoped></style>