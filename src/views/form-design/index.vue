<template>
  <div class="designer-layout">
    <el-container>
      <el-header class="header">
        <DesignHeader />
      </el-header>
      <el-container>
        <el-aside width="250px">
          <ComponentLibrary />
        </el-aside>
        <el-main>Main</el-main>
        <el-aside width="250px">
          <PropsPanel />
        </el-aside>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import DesignHeader from './DesignHeader.vue';
import ComponentLibrary from './ComponentLibrary.vue';
import PropsPanel from './PropsPanel.vue';
</script>

<style scoped lang="scss">
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  border: 1px solid var(--border-color);
}

:deep(.el-aside) {
  background-color: #fff;
  box-shadow: 1px 0 var(--border-color);
}
</style>