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
            <div class="filed">
              文本框
            </div>
            <div class="filed">
              密码框
            </div>
            <div class="filed">
              日期
            </div>
          </el-collapse-item>
          <el-collapse-item title="Feedback" name="2">
            <div>
              单选
            </div>
          </el-collapse-item>
          <el-collapse-item title="Efficiency" name="3">
            <div>
              多选
            </div>
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
import { onMounted, ref } from 'vue';
import Sortable from 'sortablejs'

const activeName = ref('1')

onMounted(() => {
  const form = document.querySelector('.el-collapse-item__content') as HTMLElement
  new Sortable(form, {
    group: {
      name: 'shared', // 组名
      pull: 'clone', // 克隆
      put: false, // 是否可放入
    },
    sort: false, // 列表内是否可排序
    animation: 150, // 动画
    ghostClass: 'form-canvas',
    onStart: (item: any) => {
      console.log('开始拖拽', item)
    },
    onEnd: (evt: any) => {
      console.log(`元素从 ${evt.oldIndex} 移动到 ${evt.newIndex}`)
    }
  });
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
    background-color: #e0e0e0;

    :deep(.el-collapse-item__content) {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
    }

    .filed {
      width: 70px;
      height: 70px;
      background-color: #fff;
      border: 1px solid var(--border-color);
      border-radius: 10px;
      font-size: 18px;
      text-align: center;
      line-height: 70px;
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