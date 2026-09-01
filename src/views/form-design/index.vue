<template>
  <div class="designer-layout">
    <el-container>
      <el-header class="header">
        <DesignHeader />
      </el-header>
      <el-container>
        <el-aside width="250px">
          <DesignComponentLibrary />
        </el-aside>
        <!-- 没选中画布中的组件就赋值为空 -->
        <el-main @click="handleNotSelected">
          <DesignCanvas />
        </el-main>
        <el-aside width="280px">
          <PropsPanel />
        </el-aside>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import DesignHeader from './DesignHeader.vue';
import DesignComponentLibrary from './DesignComponentLibrary.vue';
import PropsPanel from './PropsPanel.vue';
import DesignCanvas from './DesignCanvas.vue';
import { useDesignStore } from '@/stores/design.ts';

const { handleNotSelected } = useDesignStore()
</script>

<style scoped lang="scss">
.header {
  height: var(--design-header);
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

:deep(.el-main) {
  padding: 0;
}
</style>