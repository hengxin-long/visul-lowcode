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
          <!-- <PropsPanel /> -->
        </el-aside>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import DesignHeader from './DesignHeader.vue';
import DesignComponentLibrary from './DesignComponentLibrary.vue';
import PropsPanel from './PropsPanel.vue';
import DesignCanvas from './DesignCanvas.vue';
import DesignPropToggle from './DesignPropToggle.vue';
import { useDesignStore } from '@/stores/design.ts';
import { useRoute, useRouter } from 'vue-router';
import { onMounted } from 'vue';
import { ElMessage } from 'element-plus';
import { getFormDetailById } from '@/api/form/index.ts';
import { storeToRefs } from 'pinia';
import type { FormItem } from '@/types/form.ts';

const designStore = useDesignStore()
const { formSchema } = storeToRefs(designStore)
const { handleNotSelected } = designStore
const route = useRoute()
const router = useRouter()

/** 表单id，undefined表示新建表单，"1" 表示编辑表单 */
const id = route.params.id as string

/** 检验id */
const checkIdValid = (id: string) => {
  if (!id) return false
  // 空字符串、纯空格：判定非法
  const trimId = id.trim()
  if (trimId === '') return false
  // 自定义你的规则：纯数字 / uuid正则，这里示范数字id
  return /^\d+$/.test(id)
}

/** 获取表单详情 */
const getFormDetail = async () => {
  const form: FormItem = await getFormDetailById(id)
  // console.log('form: ', form)
  // console.log(formSchema)
  formSchema.value = form
}

// 组件挂在完执行
onMounted(async () => {
  console.log('表单id：', id)
  /** 校验id是否合法 */
  // 校验id
  if (id !== undefined && !checkIdValid(id)) {
    ElMessage.error('表单id非法')
    router.replace('/form-list')
    return
  }
  if (checkIdValid(id)) {
    // id合法，get请求
    getFormDetail()
  }
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