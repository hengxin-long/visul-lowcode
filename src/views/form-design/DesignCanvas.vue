<template>
  <div class="designer-canvas">
    <div class="title">
      <p class="descrition">表单结构</p>
      <h3 class="form-name">{{ formName }}</h3>
    </div>
    <div class="form-canvas">

    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import Sortable from 'sortablejs'


onMounted(() => {
  const canvas = document.querySelector('.form-canvas') as HTMLElement
  new Sortable(canvas, {
    group: {
      name: 'form',
      pull: 'clone',
      put: true
    },
    animation: 150,
    onAdd: (evt: any) => {
      // evt.item.dataset 拿到自定义属性
      console.log('添加到canvas', evt.item.dataset)
      // 反序列化
      const formSchema = ref(JSON.parse(evt.item.dataset.formSchema))
      console.log('拿到formSchama ', formSchema.value)
    }
  });
})

const formName = ref('登录表单')
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
.filed {
      width: 70px;
      height: 70px;
      background-color: #fff;
      border: 1px solid var(--border-color);
      border-radius: 10px;
      font-size: 25px;
    }

</style>