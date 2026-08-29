<template>
  <el-scrollbar>
    <div class="designer-components">
      <div class="title">
        <h3>添加字段</h3>
        <p>拖拽或点击</p>
      </div>
      <div class="components">
        <el-collapse v-model="activeName" accordion>
          <el-collapse-item title="基础字段" name="1">
            <!-- <el-scrollbar max-height="200px"> -->
            <div v-for="field in fields" class="field" :key="field.label" :data-field="JSON.stringify(field)">
              {{ field.label }}
            </div>
            <!-- </el-scrollbar> -->
          </el-collapse-item>
          <el-collapse-item title="主页字段" name="2">
            <div>字段</div>
          </el-collapse-item>
          <el-collapse-item title="表单字段" name="3">
            <div>字段</div>
          </el-collapse-item>
        </el-collapse>
      </div>
      <div class="tips">
        小提示：拖动字段卡片可调整顺序，点击字段可配置属性
      </div>
    </div>
  </el-scrollbar>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';
import Sortable from 'sortablejs'
import { baseFields } from '@/utils/materialList';
import type { FormComponent } from '@/types/form'

const activeName = ref('1')
const fields = ref<FormComponent[]>(baseFields)
let sortbale: Sortable

onMounted(() => {
  const form = document.querySelector('.el-collapse-item__content') as HTMLElement
  sortbale = new Sortable(form, {
    group: {
      name: 'shared', // 组名
      pull: 'clone', // 克隆
      put: false, // 是否可放入
    },
    sort: false, // 列表内是否可排序
    animation: 150, // 动画
    ghostClass: 'form-canvas',
  });
})

onUnmounted(() => {
  sortbale?.destroy()
})

// group: {
//     name: "shared",        // 分组名称
//     pull: true,           // 是否可以从此列表拖拽出元素 (true/false/function/"clone")
//     put: true,            // 是否可以放入元素到此列表 (true/false/function/array)
//     revertClone: false    // 克隆模式下是否还原克隆元素
// }


</script>

<style scoped lang="scss">
.designer-components {
  width: 100%;
  height: calc(100vh - 60px);
  padding: 22px 20px;

  .title {
    display: flex;
    justify-content: space-between;
    width: 100%;

  }

  .components {
    width: 100%;
    height: 400px;
    margin: 20px 0;

    :deep(.el-collapse-item__content) {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
    }

    .field {
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
  }

  .tips {
    width: 100%;
    height: 55px;
    padding: 10px 15px;
    color: $vlcpColor;
    font-size: 12px;
    background-color: var(--light-green);
    border-radius: 10px;

    :deep(.el-icon) {
      display: inline-block;
      color: $vlcpColor;
      font-size: 14px;
    }
  }

}
</style>