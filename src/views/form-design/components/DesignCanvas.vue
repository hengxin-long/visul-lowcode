<template>
  <el-scrollbar>
    <div class="canvas">
      <div class="designer-canvas">
        <div class="form-header">
          <div class="info">
            <p class="descrition">表单结构</p>
            <h3 class="form-name">{{ formSchema?.formName }}</h3>
          </div>
          <div class="func">
            <el-button @click.stop="isViewVisible = true">查看schema</el-button>
            <el-button @click.stop="confirmClear">重做</el-button>
            <!-- 清除确认框 -->
            <el-dialog v-model="isClearVisible" title="警告" width="400" :before-close="closeClear">
              <span>确认清除全部组件？</span>
              <template #footer>
                <div class="dialog-footer">
                  <el-button @click="closeClear">取消</el-button>
                  <el-button type="primary" @click="clearForm">
                    确认清除
                  </el-button>
                </div>
              </template>
            </el-dialog>
            <!-- 查看schema
              <pre> 标签定义预先格式化的文本。
              <pre> 元素中的文本以等宽字体显示，文本保留空格和换行符。文本将完全按照 HTML 源代码中所写的方式显示。
            -->
            <el-dialog v-model="isViewVisible" title="schema" width="500px" :before-close="closeView">
              <div class="pre-json">
                <pre>{{ strSchema }}</pre>
              </div>
            </el-dialog>
          </div>
        </div>
        <VueDraggable
          v-model="formSchema.schema.components"
          :group="{
            name: 'canvas',
            put: true,
          }"
          class="form-canvas"
          ghostClass="ghost"
          disabled
          :animation="150"
          @add="onAdd"
          @click="handleNotSelected"
        >
          <Form :formSchema="formSchema" />
        </VueDraggable>
      </div>
    </div>
  </el-scrollbar>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useDesignStore } from '@/stores/design'
import { storeToRefs } from 'pinia';
import Form from '@/components/Form.vue';
import { VueDraggable } from 'vue-draggable-plus';
import { ElMessage } from 'element-plus';

const designStore = useDesignStore()
const { formSchema } = storeToRefs(designStore)
const { handleNotSelected, clearFormComponent, getComponentId } = designStore

/** 清除确认窗状态 */
const isClearVisible = ref(false)

/** 清除表单确认弹窗 */
const confirmClear = () => {
  isClearVisible.value = true
}

/** 关闭清除表单确认弹窗 */
const closeClear = () => {
  isClearVisible.value = false
}

/** 清空表单组件 */
const clearForm = () => {
  closeClear()
  clearFormComponent()
}

/** 查看schema弹窗状态 */
const isViewVisible = ref(false)

/** 表单发生变化重新调用，用于查看schema */
const strSchema = computed(() => {
  return JSON.stringify(formSchema.value, null, 2)
})

/** 关闭schema弹窗 */
const closeView = () => {
  isViewVisible.value = false
}

/** 组件添加到画布上的回调 */
const onAdd = (e: any) => {
  // 将克隆的实例设置id和字段在自动添加到components
  const component = e?.clonedData
  if (!component) return ElMessage.error('添加组件错误')
  const id = getComponentId()
  component.id = `${id}`
  component.field = component.field + '_' + id
}
</script>

<style scoped lang="scss">
:deep(.el-scrollbar) {
  width: 100%;
  max-height: 100%;
}

.canvas {
  width: 100%;
  height: calc(100vh - 60px);
  padding: 20px 140px;
}

.designer-canvas {

  .form-header {
    display: flex;
    justify-content: space-between;
    align-items: end;
    margin-bottom: 10px;

    .form-name {
      margin-top: 3px;
    }
  }


  .form-canvas {
    width: 100%;
    min-height: 400px;
    padding: 18px 15px;
    background-color: #fff;
    border: 1px solid var(--border-color);
    border-radius: 15px;

  }

  .form-canvas .draggable-canvas {
      width: 100%;
      height: 100%;
      min-height: 100%;
    }
}

.field {
  display: none;
  width: 80px;
  height: 50px;
  background-color: #fff;
  border: 1px solid var(--border-color);
  border-radius: 10px;
  font-size: 14px;
  text-align: center;
  line-height: 50px;
  cursor: pointer;
}

.pre-json {
  padding: 10px;
  width: 100%;
  height: 400px;
  overflow: auto;
  box-shadow: 0 0 0 1px #d8d8d8;
  background-color: #f8f8f8;
  border-radius: 6px;

  pre {
    white-space: pre-wrap;
    word-break: break-all;
    font-family: monospace;
    font-size: 15px;
    color: black;
  }
}
</style>