<template>
  <el-page-header @back="verifySave" class="back">
    <template #content>
      <h3>表单</h3>
      <p>最后保存于&nbsp; {{ formSchema?.updateTime }}</p>
    </template>
  </el-page-header>
  <div class="operation">
    <el-button @click="openPreviewForm">预览</el-button>
    <el-button @click="() => { openSaveForm(); showSave(false) }">保存</el-button>
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
        <el-button v-if="isShowSave" @click="noSave">不保存</el-button>
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
import DesignPreviewForm from './DesignPreviewForm.vue';
import { ref } from 'vue'
import { useDesignStore } from '@/stores/design';
import { storeToRefs } from 'pinia';
import type { FormStatus } from '@/types/form'

const designStore = useDesignStore()
const { isSaved, formSchema } = storeToRefs(designStore)
const { switchEdit, switchPreview, pushForm } = designStore

const route = useRoute()

/** 预览表单窗口状态 */
const isPreviewFormVisible = ref(false)

/** 保存表单弹窗状态 */
const isSaveFormVisible = ref(false)

/** 是否显示不保存按钮，用于返回和保存按钮弹窗显示的功能范围 */
const isShowSave = ref(true)

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
  // 有id 更新，id为空串 添加
  if (id) {
    pushForm('put', status, '已更新')
  } else {
    pushForm('post', status, '保存成功')
  }
}

/** 控制不保存按钮是否显示 */
const showSave = (bool: boolean) => {
  isShowSave.value = bool
}

/** 验证是否已保存 */
const verifySave = () => {
  // 回到主页前做些业务逻辑
  // 1.返回之前是否已保存。2.新建表单后什么都没做就返回
  showSave(true)
  if (!isSaved.value) return openSaveForm()
  goBack()
}

/** 不保存 */
const noSave = () => {
  closeSaveForm()
  goBack()
}

const router = useRouter()
/** 返回form-list */
const goBack = () => {
  router.push('/form-list')
}
</script>

<style scoped lang="scss">
.back {
  :deep(.el-page-header__content) {
    font-size: 13px;
  }
}
</style>