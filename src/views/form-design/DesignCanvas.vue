<template>
  <el-scrollbar>
    <div class="canvas">
      <div class="designer-canvas">
        <div class="form-header">
          <div class="info">
            <p class="descrition">表单结构</p>
            <h3 class="form-name">{{ formName }}</h3>
          </div>
          <div class="func">
            <el-button @click.stop="confirmClear">清除表单</el-button>
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
          </div>
        </div>
        <div class="form-canvas" @click="handleNotSelected">
          <div ref="componet" class="form-component" v-for="com in formSchema?.schema.components" :key="com.id"
            @click.stop="handleSelect(com)">
            <!-- 动态渲染组件 -->
            <!-- 
              v-bind：绑定组件属性
              手动双向绑定
              :model-value -> props
              @update:model-value -> function
              as keyof typeof map  告诉TS：这个字符串一定是 map 对象的合法 key，消除类型报错。
            -->
            <p v-if="com.componentType === 'input' || com.componentType === 'password'">{{ com.props.label }}</p>

            <component :is="map[com.componentType as keyof typeof map]" v-bind="com.props">
              <span v-if="com.componentType === 'button'">{{ com.props.label }}</span>
            </component>
          </div>
        </div>
      </div>
    </div>
  </el-scrollbar>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';
import Sortable, { type SortableEvent } from 'sortablejs'
import type { FormComponent } from '@/types/form';
import { componentMap } from '@/utils/componentMap';
import { useDesignStore } from '@/stores/design'
import { storeToRefs } from 'pinia';
import { ElMessage } from 'element-plus';

const map = componentMap

const designStore = useDesignStore()
const { formSchema } = storeToRefs(designStore)
const { handleSelect, handleNotSelected, clearFormComponent } = designStore

const formName = ref('新建表单')
let sortbale: Sortable
// 组件的唯一id
let id = 1

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

const clearForm = () => {
  closeClear()
  clearFormComponent()
}

onMounted(() => {

  const canvas = document.querySelector('.form-canvas') as HTMLElement

  sortbale = new Sortable(canvas, {
    group: {
      name: 'form',
      put: true
    },
    animation: 150,
    // 组件拖拽到画布上的回调
    onAdd: (evt: any) => {
      // 拖拽的目标容器不是画布直接返回
      if (evt.to !== canvas) return

      const field = ref<string>(evt.item.dataset.field)
      const newIndex = evt.newIndex
      // 反序列化添加进数组
      const component = JSON.parse(field.value)
      component.id = `${id}`
      formSchema.value?.schema.components.splice(newIndex, 0, component)
      // 添加完id 自增
      id++
      console.log('添加进数组后 ', formSchema.value.schema.components)

      // 加到components数组后移出dom元素，只留schema
      if (evt.item) evt.item.remove()
    },
    onEnd: (evt: SortableEvent) => {
      evt.preventDefault()

      const oldIndex = evt.oldIndex as number
      const newIndex = evt.newIndex as number
      // 将原来索引位的对象取出来
      const item = formSchema.value.schema.components[newIndex]

      if (!item) return ElMessage.error('数据错误')

      // 交换
      formSchema.value.schema.components.splice(newIndex, 1, formSchema.value.schema.components[oldIndex] as FormComponent)
      formSchema.value.schema.components.splice(oldIndex, 1, item as FormComponent)
    },
  });
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

    .form-component {
      width: 100%;
      margin: 13px 0;
    }
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
</style>