<template>
  <div class="designer-canvas">
    <div class="title">
      <p class="descrition">表单结构</p>
      <h3 class="form-name">{{ formName }}</h3>
    </div>
    <div class="form-canvas">
      <div class="form-component" v-for="com in form?.schema.components" :key="com.componentType">
        <!-- 动态渲染组件 -->
        <component :is="map[com.componentType]" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';
import Sortable from 'sortablejs'
import type { FormItem } from '@/types/form';
import { componentMap } from '@/utils/componentMap';

const map = componentMap
// 初始化新建表单
const form = ref<FormItem>()
const formName = ref('登录表单')
let sortbale: Sortable

onMounted(() => {
  // 初始化新表单
  form.value = {
    id: '1',
    formName: '',
    formType: '',
    status: 'draft',
    createTime: new Date().toLocaleTimeString(),
    updateTime: '',
    schema: {
      formName: '',
      formType: '',
      components: []
    }
  }
  const canvas = document.querySelector('.form-canvas') as HTMLElement
  sortbale = new Sortable(canvas, {
    group: {
      name: 'form',
      put: true
    },
    animation: 150,
    // 组件拖拽到画布上的回调
    onAdd: (evt: any) => {
      // 反序列化
      const field = ref(evt.item.dataset.field)

      // console.log('拿到formSchama ', field.value)
      form.value?.schema.components.push(JSON.parse(field.value))
      console.log('components ', form.value?.schema.components)

      // 拖拽的目标容器不是画布直接返回
      if (evt.to !== canvas) return
      // 加到components数组后移出dom元素，只留schema
      if (evt.item) evt.item.remove()
    },
    onChange: ({ oldIndex, newIndex }) => {
      // 从画布上移动结束后位置索引
      console.log(`在画布上元素从 ${oldIndex} 移动到 ${newIndex}`)
      console.log(form.value?.schema.components)
    }
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