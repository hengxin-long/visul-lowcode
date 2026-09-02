<template>
  <el-tabs
    v-model="activeName"
    type="card"
    class=""
    @tab-click="handleClick"
  >
    <el-tab-pane label="字段属性" name="field">
      <PropsPanel />
    </el-tab-pane>
    <el-tab-pane label="表单属性" name="form">
      <DesignFormPanel />
    </el-tab-pane>
  </el-tabs>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

import type { TabsPaneContext } from 'element-plus'
import PropsPanel from './PropsPanel.vue'
import DesignFormPanel from './DesignFormPanel.vue'

const activeName = ref('field')

const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab, event)
}
</script>

<style scoped lang="scss">
/* .demo-tabs > .el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
} */
:deep(.el-tabs__header) {
  height: 30px;
  margin: 0;
  
}

:deep(.el-tabs__header .el-tabs__nav) {
  border: 0;
}

:deep(.el-tabs__header .el-tabs__nav .el-tabs__item:nth-child(2)) {
  border-right: 1px solid var(--border-color);
}

:deep(.el-tabs__item) {
  height: 30px;
  border-top: 0;
}
</style>