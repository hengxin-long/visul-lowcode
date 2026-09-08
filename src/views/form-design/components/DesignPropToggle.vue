<template>
  <el-tabs
    v-model="activeName"
    type="card"
    class=""
  >
    <el-tab-pane label="字段属性" name="field">
      <DesignPropsPanel />
    </el-tab-pane>
    <el-tab-pane label="表单属性" name="form">
      <DesignFormPanel />
    </el-tab-pane>
  </el-tabs>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

import DesignPropsPanel from './DesignPropsPanel.vue'
import DesignFormPanel from './DesignFormPanel.vue'

const activeName = ref('field')

</script>

<style scoped lang="scss">

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