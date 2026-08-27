<template>
  <el-page-header @back="goBack" class="back">
    <template #content>
      <p class="text-large font-600 mr-3">表单</p>
      <p class="save-time text-small font-400">最后保存于xxx</p>
    </template>
  </el-page-header>
  <div class="operation">
    <el-button>预览</el-button>
    <el-button>保存</el-button>
    <el-button type="primary">发布表单</el-button>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter()
const goBack = () => {
  // 回到主页前做些业务逻辑
  // 比如：1.返回之前是否已保存。2.新建表单后什么都没做就返回
  router.push('/form-list')
}
</script>

<style scoped lang="scss">
</style>