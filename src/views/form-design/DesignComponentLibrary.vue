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
            <div class="filed" @click="handleClick">
              字段
            </div>
            <div class="filed" @click="handleClick">
              字段
            </div>
            <div class="filed" @click="handleClick">
              字段
            </div>
          </el-collapse-item>
          <el-collapse-item title="Feedback" name="2">
            <div>
              字段
            </div>
          </el-collapse-item>
          <el-collapse-item title="Efficiency" name="3">
            <div>
              字段
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
import { ref } from 'vue';
import Sortable from 'sortablejs'

const activeName = ref('1')

const handleClick = () => {
  const example2Left = document.querySelector('.el-collapse-item__content') as HTMLElement
  const item = new Sortable(example2Left, {
    group: 'shared', // set both lists to same group
    animation: 150,
    disabled: false,
    ghostClass: 'container',
  });
  console.log(item)
}




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
      font-size: 25px;
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