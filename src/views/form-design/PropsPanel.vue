<template>
  <div class="designer-props">
    <div class="title">
      <h3>字段属性</h3>
    </div>
    <div class="scroll-container">
      <el-scrollbar>
        <div class="props-container">
          <div v-if="selectCom" class="props">
            <div class="attr" v-for="attr in attrList">
              <p>{{ attr.label }}</p>
              <el-input v-if="attr.type === 'input'" v-model="selectCom.props[attr.prop]" size="small"/>
              <el-inputNumber v-if="attr.type === 'number'" v-model="selectCom.props[attr.prop]" size="small"/>
              <el-switch v-if="attr.type === 'switch'" v-model="selectCom.props[attr.prop]" size="small"/>
            </div>
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
import { computed, ref } from 'vue'
import { componentAttrConfig } from '@/config/componentAttrConfig';

const { selectCom } = storeToRefs(useDesignStore())
const attrList = computed(() => {
  if (!selectCom.value) return []
  const type = selectCom.value?.componentType
  return componentAttrConfig[type as keyof typeof componentAttrConfig] ?? []
})

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

      .props {
        .attr {
          padding: 6px 0;

          p {
            margin-bottom: 3px ;
          }
        }
      }

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