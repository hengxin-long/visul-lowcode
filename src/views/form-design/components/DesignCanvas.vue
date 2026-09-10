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
        <div class="form-canvas" @click="handleNotSelected">
          <Form :formSchema="formSchema" />
        </div>
      </div>
    </div>
  </el-scrollbar>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue';
import Sortable, { type SortableEvent } from 'sortablejs'
import { useDesignStore } from '@/stores/design'
import { storeToRefs } from 'pinia';
import Form from '@/components/Form.vue';
import { nextTick } from 'vue';

const designStore = useDesignStore()
const { formSchema } = storeToRefs(designStore)
const { handleNotSelected, clearFormComponent, handleAddToCanvas } = designStore

let sortbale: Sortable

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

/** 创建sortable实例 */
const createSortable = () => {
  const canvas = document.querySelector('.form-canvas') as HTMLElement

  sortbale = new Sortable(canvas, {
    group: {
      name: 'canvas',
      put: true // 是否可放入
    },
    animation: 150,
    preventOnFilter: true, // 触发过滤器时是否阻止默认事件

    /** 组件拖拽到画布上时触发 */
    onAdd: (evt: any) => {
      evt.preventDefault()
      // 拖拽的目标容器不是画布直接返回
      if (evt.to !== canvas) return

      const newIndex = evt.newIndex
      const fieldStr = evt.item.dataset.field
      // 转换
      const component = handleAddToCanvas(fieldStr)

      // 加到components数组后移除dom元素，只留schema
      if (evt.item) evt.item.remove()

      formSchema.value?.schema.components.splice(newIndex, 0, component)
    },

    /** 画布内组件移动时触发 */
    onUpdate: (evt: SortableEvent) => {
      evt.preventDefault()

      // 只处理画布已有组件拖拽，排除左侧新增
      if (evt.from !== evt.to) return

      const oldIndex = evt.oldIndex as number
      const newIndex = evt.newIndex as number

      const list = formSchema.value.schema.components
      
      // 将移动的的对象取出来
      const moveItem = list.splice(oldIndex, 1)[0]
      if (!moveItem) return
      // 插入到新索引上
      list.splice(newIndex, 0, moveItem)
    },
  });
}

onMounted(async () => {
  // 等待dom更新完再创建sortable
  await nextTick()
  createSortable()
})

onUnmounted(() => {
  sortbale?.destroy()
})

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