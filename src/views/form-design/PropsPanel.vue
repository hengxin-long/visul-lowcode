<template>
  <div class="designer-props">
    <div class="title">
      <h3>字段属性</h3>
    </div>
    <div class="scroll-container">
      <el-scrollbar>
        <div class="props-container">
          <div v-if="selectCom" class="props">
            <p>{{ selectCom?.props.label }}</p>
            <p>{{ selectCom?.props.require }}</p>
            <p>{{ selectCom?.props.placeholder }}</p>
          </div>
          <div v-else class="props-null">
            <p>请选中组件进行属性修改</p>
          </div>
        </div>
      </el-scrollbar>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useDesignStore } from '@/stores/design';
import { storeToRefs } from 'pinia';
import { ref } from 'vue'

const { selectCom } = storeToRefs(useDesignStore())

</script>

<style scoped lang="scss">
.designer-props {
  width: 100%;
  height: calc(100vh - var(--design-header));
  padding: var(--design-aside-padding);

  .title {
    height: var(--design-aside-title);
  }

  .scroll-container {
    height: calc(100vh - var(--design-aside-scroll-height));
    width: 100%;

    :deep(.el-scrollbar) {
      width: 100%;
      height: 100%;
    }

    :deep(.el-scrollbar .el-scrollbar__view) {
      width: 100%;
      height: 100%;
    }

    .props-container {
      width: 100%;
      height: 100%;

      .props-null {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;

        p {
          font-size: 15px;
          color: var(--tips-color);
        }
      }
    }
  }


}

.test {
  width: 100%;
  height: 100px;
  background-color: aqua;
}
</style>