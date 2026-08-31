<template>
  <el-page-header @back="goBack" class="back">
    <template #content>
      <p class="text-large font-600 mr-3">表单</p>
      <p class="save-time text-small font-400">最后保存于xxx</p>
    </template>
  </el-page-header>
  <div class="operation">
    <el-button @click="openPreviewForm">预览</el-button>
    <el-button>保存</el-button>
    <el-button type="primary">发布表单</el-button>
  </div>
  <!-- 预览窗口 -->
  <DesignPreviewForm :isPreviewFormVisible="isPreviewFormVisible" @close="closePreviewForm" />
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import DesignPreviewForm from '@/views/form-design/DesignPreviewForm.vue';
import { ref } from 'vue'

/** 预览表单窗口状态 */
const isPreviewFormVisible = ref(false)

/** 关闭预览窗口 */
const closePreviewForm = () => {
  isPreviewFormVisible.value = false
}

/** 打开预览窗口 */
const openPreviewForm = () => {
  isPreviewFormVisible.value = true
}

const router = useRouter()
const goBack = () => {
  // 回到主页前做些业务逻辑
  // 比如：1.返回之前是否已保存。2.新建表单后什么都没做就返回
  router.push('/form-list')
}
</script>

<style scoped lang="scss"></style>