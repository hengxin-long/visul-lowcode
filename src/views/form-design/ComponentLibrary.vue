<template>
  <el-scrollbar>
    <div class="designer-components">
      <div class="title">
        <h3>添加字段</h3>
        <p>拖拽或点击</p>
      </div>
      <div class="components">
        表单或组件
      </div>
      <div class="tips">
        小提示：拖动字段卡片可调整顺序，点击字段可配置属性
      </div>
    </div>
  </el-scrollbar>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.designer-components {
  width: 100%;
  height: calc(100vh - 60px);
  padding: 25px 20px;

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