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
              <el-input v-if="attr.type === 'input'" v-model="selectCom.props[attr.prop]" size="small" />
              <el-inputNumber v-if="attr.type === 'number'" v-model="selectCom.props[attr.prop]" size="small" />
              <el-switch v-if="attr.type === 'switch'" v-model="selectCom.props[attr.prop]" size="small" />
              <el-button @click="handleSize(s)" v-if="attr.type === 'enum'" v-for="s in size" size="small">{{ s
                }}</el-button>
              <div v-if="attr.type === 'btnEnum'" class="btn-type-box">
                <el-button @click="handleBtnType(b)" v-for="b in btnType" size="small">{{ b }}</el-button>
              </div>
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
import { ComponentSize, ComponentBtnType } from '@/enums/component';

const { selectCom } = storeToRefs(useDesignStore())
const attrList = computed(() => {
  if (!selectCom.value) return []
  const type = selectCom.value?.componentType
  return componentAttrConfig[type as keyof typeof componentAttrConfig] ?? []
})

/** 组件大小枚举 */
const size: string[] = Object.values(ComponentSize)
/** 按钮类型枚举 */
const btnType: string[] = Object.values(ComponentBtnType)

/** 组件大小 */
const handleSize = (size: string) => {
  if (!selectCom.value) return []
  selectCom.value.props.size = size
  console.log(selectCom.value.props)
}

/** 按钮类型 */
const handleBtnType = (type: string) => {
  if (!selectCom.value) return []
  selectCom.value.props.type = type
  console.log(selectCom.value.props)
}
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
            margin-bottom: 3px;
          }
        }

        .btn-type-box {
          display: grid;
          grid-template-columns: repeat(2, auto);
          gap: 10px;

          :deep(.el-button) {
            margin: 0;
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