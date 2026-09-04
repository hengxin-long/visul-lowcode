<template>
  <el-page-header @back="goBack" class="back">
    <template #content>
      <p class="text-large font-600 mr-3">表单</p>
      <p class="save-time text-small font-400">最后保存于xxx</p>
    </template>
  </el-page-header>
  <div class="operation">
    <el-button @click="openPreviewForm">预览</el-button>
    <el-button @click="openSaveForm">保存</el-button>
    <el-button @click="handleForm('published')" type="primary">发布表单</el-button>
  </div>
  <!-- 预览窗口 -->
  <DesignPreviewForm :isPreviewFormVisible="isPreviewFormVisible" @close="closePreviewForm" />
  <!-- 保存窗口 -->
  <el-dialog v-model="isSaveFormVisible" title="保存表单" width="500" :before-close="closeSaveForm">
    <span>是否保存为草稿？</span>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="closeSaveForm">取消</el-button>
        <el-button @click="handleForm('draft')">
          是
        </el-button>
        <el-button @click="handleForm('published')" type="primary">发布</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router';
import DesignPreviewForm from '@/views/form-design/DesignPreviewForm.vue';
import { ref } from 'vue'
import { useDesignStore } from '@/stores/design';
import { storeToRefs } from 'pinia';
import type { FormStatus } from '@/types/form'
import { checkIdValid } from '@/utils/verification';

const designStore = useDesignStore()
const { isSaved } = storeToRefs(designStore)
const { switchEdit, switchPreview, postForm, putForm } = designStore

const route = useRoute()

/** 预览表单窗口状态 */
const isPreviewFormVisible = ref(false)

/** 保存表单弹窗状态 */
const isSaveFormVisible = ref(false)

/** 关闭预览窗口 */
const closePreviewForm = () => {
  isPreviewFormVisible.value = false
  switchEdit()
}

/** 打开预览窗口 */
const openPreviewForm = () => {
  isPreviewFormVisible.value = true
  switchPreview()
}

/** 打开保存窗口 */
const openSaveForm = () => {
  isSaveFormVisible.value = true
}

/** 关闭保存窗口 */
const closeSaveForm = () => {
  isSaveFormVisible.value = false
}

/** 处理新增表单 */
const handleForm = (status: FormStatus) => {
  if (status === 'published') {
    console.log('校验画布配置是否合法  待定')
  }
  isSaveFormVisible.value = false

  const id = route.params.id as string
  console.log(status)
  if (id && checkIdValid(id)) {
    putForm(status)
  } else {
    postForm(status)
  }
}

const router = useRouter()
const goBack = () => {
  // 回到主页前做些业务逻辑
  // 比如：1.返回之前是否已保存。2.新建表单后什么都没做就返回
  if (!isSaved.value) return openSaveForm()
  router.push('/form-list')
}
</script>

<style scoped lang="scss"></style>