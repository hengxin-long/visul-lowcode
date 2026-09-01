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
              <el-button @click="setProp('size', s)" v-if="attr.type === 'enum'" v-for="s in size" size="small">{{ s
              }}</el-button>
              <!-- 按钮类型 -->
              <div v-if="attr.type === 'btnEnum'" class="btn-type-box options-box">
                <el-button @click="setProp('type', b)" v-for="b in btnType" size="small">{{ b }}</el-button>
              </div>
              <!-- 文本框类型 -->
              <div v-if="attr.type === 'inputType'" class="input-type-box options-box">
                <el-button @click="setProp('type', i)" v-for="i in inputType" size="small">{{ i }}</el-button>
              </div>
              <!-- 下拉框选项 -->
              <div v-if="attr.type === 'options'">
                <div class="options" v-for="(option, index) in selectCom.props[attr.prop]">
                  <div class="option">
                    <el-button @click="delOption(index)" size="small">删除</el-button>
                    <div class="label">
                      <p>选项{{ Number(index) + 1 }}</p>
                      <el-input v-model="option.label" size="small" placeholder="文本" />
                    </div>
                    <div class="value">
                      <p>值{{ Number(index) + 1 }}</p>
                      <el-input v-model="option.value" size="small" placeholder="值" />
                    </div>
                  </div>
                </div>
                <el-button @click="addOption" size="small">添加</el-button>
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
import { ComponentSize, ComponentBtnType, ComponentInputType } from '@/enums/component';
import { kebabToCamel } from '@/utils/transform'
import type { ComponentProps } from '@/types/form';

/** 当前选中的组件 */
const { selectCom } = storeToRefs(useDesignStore())

/** 选中当前组件就重新计算 */
const attrList = computed(() => {
  if (!selectCom.value) return []
  const type = selectCom.value?.componentType
  const componentAttrList = JSON.stringify(componentAttrConfig[type as keyof typeof componentAttrConfig] ?? [])

  let newAttrList = JSON.parse(componentAttrList)

  if (!newAttrList[0]) return []
  kebabToCamel(newAttrList)

  return newAttrList
})

/** 组件大小枚举 */
const size: string[] = Object.values(ComponentSize)
/** 按钮类型枚举 */
const btnType: string[] = Object.values(ComponentBtnType)
/** 文本框枚举 */
const inputType: string[] = Object.values(ComponentInputType)

/** 
 * 设置组件属性
 * 可以设置组件的大小、按钮类型、文本框类型
 * @param key 符合 ComponentProps 类型的 key
 * @param value 要修改的 value
 */
const setProp = <T extends keyof ComponentProps>(
  key: T,
  value: string
) => {
  if (!selectCom.value) return []
  selectCom.value.props[key] = value
  console.log(selectCom.value.props)
}

/** 下拉框添加项 */
const addOption = () => {
  if (!selectCom.value) return []
  selectCom.value.props.options.push({ label: '', value: '' })
  console.log(selectCom.value.props.options)
}

/** 下拉框删除项 */
const delOption = (index: number | string) => {
  console.log(typeof index)
  if (!selectCom.value) return []
  let i = Number(index)
  selectCom.value.props.options.splice(i, 1)
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

        .options-box {
          display: grid;
          grid-template-columns: repeat(2, auto);
          gap: 10px;

          :deep(.el-button) {
            margin: 0;
          }
        }

        .option {
          margin-bottom: 5px;
          text-align: end;

          :deep(.el-button) {
            display: inline-block;
          }

          .label,
          .value {
            display: flex;
            margin-bottom: 3px;

            p {
              width: 40px;
              margin: 0;
              text-align: center;
            }
          }


          :deep(.el-input) {
            flex: 1;
            // width: 160px;
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