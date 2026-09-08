<template>
  <div class="designer-layout">
    <el-container>
      <el-header class="header">
        <DesignHeader />
      </el-header>
      <el-container>
        <el-aside width="250px" class="component-library">
          <DesignComponentLibrary />
        </el-aside>
        <!-- 没选中画布中的组件就赋值为空 -->
        <el-main @click="handleNotSelected">
          <DesignCanvas />
        </el-main>
        <el-aside width="280px" class="props-panel">
          <DesignPropToggle />
        </el-aside>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import DesignHeader from './components/DesignHeader.vue';
import DesignComponentLibrary from './components/DesignComponentLibrary.vue';
import DesignCanvas from './components/DesignCanvas.vue';
import DesignPropToggle from './components/DesignPropToggle.vue';
import { useDesignStore } from '@/stores/design.ts';
import { useRoute, useRouter } from 'vue-router';
import { onMounted, watch } from 'vue';
import { ElMessage } from 'element-plus';
import { storeToRefs } from 'pinia';
import { ref } from 'vue'
import type { FormItem } from '@/types/form.ts';

const designStore = useDesignStore()
const { formSchema, isSaved } = storeToRefs(designStore)
const { resetFormSchema, setFormSchema, handleNotSelected, getFormDetail, switchEdit } = designStore
const route = useRoute()
const router = useRouter()

// 原始对象用来和全局formSchema做对比
const originSchema = ref<FormItem>()

/** 表单id，undefined表示新建表单，"1" 表示编辑表单 */
const id = route.params.id as string

/** 监听表单修改状态 */
watch(() => formSchema.value, () => {
  isSaved.value = JSON.stringify(originSchema.value) == JSON.stringify(formSchema.value)
}, { deep: true })

// 组件挂在完执行
onMounted(async () => {

  // undefined，初始化fomrSchema
  if (!id) {
    resetFormSchema()
    originSchema.value = JSON.parse(JSON.stringify(formSchema.value))
  // 不是 undefined 走else
  } else {
    const form = getFormDetail(id)
    form.then(resolve => {
      setFormSchema(resolve)
      originSchema.value = JSON.parse(JSON.stringify(resolve))
    }, reject => {
      throw new Error("获取失败！", reject);
    }).catch((e) => {
      ElMessage.error(e)
    })
  }
  // 进入表单设计就切换为编辑模式
  switchEdit()
})

</script>

<style scoped lang="scss">
.header {
  height: var(--design-header);
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  border: 1px solid var(--border-color);
}

:deep(.component-library.el-aside) {
  background-color: #fff;
  box-shadow: 1px 0 var(--border-color);
}

:deep(.props-panel.el-aside) {
  background-color: #fff;
  box-shadow: -1px 0 var(--border-color);
}


:deep(.el-main) {
  padding: 0;
}
</style>