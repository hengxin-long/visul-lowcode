<template>
  <div class="designer-canvas">
    <div class="title">
      <p class="descrition">表单结构</p>
      <h3 class="form-name">{{ formName }}</h3>
    </div>
    <div class="form-canvas" @click="handleNotSelected">
      <div ref="componet" class="form-component" v-for="com in formSchema?.schema.components" :key="com.componentType"
        @click.stop="handleSelect(com)">
        <!-- 动态渲染组件 -->
        <!-- 
        v-bind：绑定组件属性
        手动双向绑定
        :model-value -> props
        @update:model-value -> function
        as keyof typeof map  告诉TS：这个字符串一定是 map 对象的合法 key，消除类型报错。
         -->
        <component :is="map[com.componentType as keyof typeof map]" v-bind="com.props" :model-value="com.props?.vModel"
          @update:model-value="(val: string) => com.props.vModel = val" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';
import Sortable, { type SortableEvent } from 'sortablejs'
import type { FormComponent } from '@/types/form';
import { componentMap } from '@/utils/componentMap';
import { useDesignStore } from '@/stores/design'
import { storeToRefs } from 'pinia';

const map = componentMap

const designStore = useDesignStore()
const { formSchema } = storeToRefs(designStore)
const { handleSelect, handleNotSelected } = designStore

const formName = ref('新建表单')

let sortbale: Sortable

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

      const field = ref<string>(evt.item.dataset.field)
      // console.log('拿到formSchama ', field.value)
      // 反序列化添加进数组
      formSchema.value?.schema.components.push(JSON.parse(field.value))
      // console.log('components ', formSchema.value?.schema.components)

      // 拖拽的目标容器不是画布直接返回
      if (evt.to !== canvas) return
      // 加到components数组后移出dom元素，只留schema
      if (evt.item) evt.item.remove()
    },
    onEnd: (evt: SortableEvent) => {
      // 从画布上移动结束后位置索引
      const oldIndex = evt.oldIndex as number
      const newIndex = evt.newIndex as number
      // console.log(`在画布上元素从 ${oldIndex} 移动到 ${newIndex}`)
      const item = formSchema.value.schema.components[newIndex]
      formSchema.value.schema.components.splice(newIndex, 1, formSchema.value.schema.components[oldIndex] as FormComponent)
      formSchema.value.schema.components.splice(oldIndex, 1, item as FormComponent)
      // console.log(formSchema.value)
    },
  });
})

onUnmounted(() => {
  sortbale?.destroy()
})

</script>

<style scoped lang="scss">
.designer-canvas {
  .form-name {
    margin: 3px 0 17px 0;
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