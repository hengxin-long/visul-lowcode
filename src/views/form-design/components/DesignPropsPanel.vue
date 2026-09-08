<template>
  <div class="designer-props">
    <div class="title">
      <h3>字段属性</h3>
    </div>
    <div class="scroll-container">
      <el-scrollbar>
        <div class="props-container">
          <div
            v-if="selectCom"
            class="props"
          >
            <p>业务字段</p>
            <el-input
              v-model="selectCom.field"
              size="small"
            />
            <p>组件对齐</p>
            <el-button
              @click="handleAlign(align)"
              v-for="align in alignKey"
              :key="align"
              size="small"
              >{{ align }}</el-button
            >

            <div
              class="attr"
              v-for="attr in attrList"
            >
              <p>{{ attr.label }}</p>
              <!-- 输入框控件 -->
              <el-input
                v-if="attr.type === 'input'"
                v-model="selectCom.props[attr.prop]"
                size="small"
              />
              <!-- 数字框控件 -->
              <el-inputNumber
                v-if="attr.type === 'number'"
                v-model="selectCom.props[attr.prop]"
                size="small"
                v-bind="attr?.limit"
              />
              <!-- switch控件 -->
              <el-switch
                v-if="attr.type === 'switch'"
                v-model="selectCom.props[attr.prop]"
                size="small"
              />
              <!-- 按钮控件 -->
              <el-button
                @click="setProp('size', s)"
                v-if="attr.type === 'enum'"
                v-for="s in size"
                size="small"
                >{{ s }}</el-button
              >
              <div
                v-if="attr.type === 'posiEnum' && selectCom.componentType === 'inputNumber'"
                class="number-posi"
              >
                <el-button
                  @click="numberControlPosi('')"
                  size="small"
                  >无</el-button
                >
                <el-button
                  @click="numberControlPosi('right')"
                  size="small"
                  >right</el-button
                >
              </div>
              <!-- 按钮类型 -->
              <div
                v-if="attr.type === 'btnEnum'"
                class="btn-type-box options-box"
              >
                <el-button
                  @click="setProp('type', b)"
                  v-for="b in btnType"
                  size="small"
                  >{{ b }}</el-button
                >
              </div>
              <!-- 文本框类型 -->
              <div
                v-if="attr.type === 'inputType'"
                class="input-type-box options-box"
              >
                <el-button
                  @click="setProp('type', i)"
                  v-for="i in inputType"
                  size="small"
                  >{{ i }}</el-button
                >
              </div>
              <!-- 下拉框选项 -->
              <div v-if="attr.type === 'options'">
                <div
                  class="options"
                  v-for="(option, index) in selectCom.props[attr.prop]"
                >
                  <div class="option">
                    <el-button
                      @click="delOption(index)"
                      size="small"
                      >删除</el-button
                    >
                    <div class="label">
                      <p>选项{{ Number(index) + 1 }}</p>
                      <el-input
                        v-model="option.label"
                        size="small"
                        placeholder="文本"
                      />
                    </div>
                    <div class="value">
                      <p>值{{ Number(index) + 1 }}</p>
                      <el-input
                        v-model="option.value"
                        size="small"
                        placeholder="值"
                      />
                    </div>
                  </div>
                </div>
                <el-button
                  @click="addOption"
                  size="small"
                  >添加</el-button
                >
              </div>
              <!-- 评分辅助文字数组 -->
              <div
                class="rate-text-array"
                v-if="attr.type === 'array' || attr.prop === 'texts'"
              >
                <el-input
                  v-model="selectCom.props[attr.prop][index - 1]"
                  v-for="index in selectCom.props?.max"
                  size="small"
                />
              </div>
              <!-- 多选框和单选框类型 -->
              <div
                v-if="attr.type === 'groupEnum'"
                class="group-type-enum"
              >
                <el-button
                  v-if="allowType = selectCom.componentType === 'checkboxGroup' ? checkboxAllowType : radioAllowType"
                  v-for="t in allowType"
                  size="small"
                  @click="setProp('type', t)"
                  >{{ t }}</el-button
                >
              </div>
            </div>
          </div>
          <div
            v-else
            class="props-null"
          >
            <p>请选中组件进行属性修改</p>
          </div>
        </div>
      </el-scrollbar>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useDesignStore } from "@/stores/design";
  import { storeToRefs } from "pinia";
  import { computed, ref } from "vue";
  import { componentAttrConfig } from "@/config/componentAttrConfig";
  import { ComponentSize, ComponentBtnType, ComponentInputType } from "@/enums/component";
  import { kebabToCamel } from "@/utils/transform";
  import type { ComponentProps, FormComponent } from "@/types/form";
  const check = ref(true);

  /** 允许的子组件类型 */
  const allowType = ref();
  /** 复选框组允许的子组件类型 */
  const checkboxAllowType = ["checkbox", "button"];
  /** 单选框组允许的子组件类型 */
  const radioAllowType = ["radio", "button"];

  const designStore = useDesignStore();

  /** 当前选中的组件 */
  const { selectCom } = storeToRefs(designStore);

  /** 拿到schema，目的是拿到field绑定 */
  const schema = ref<FormComponent>();

  /** 选中当前组件就重新计算 */
  const attrList = computed(() => {
    if (!selectCom.value) return [];
    const type = selectCom.value?.componentType;

    const componentAttrList = JSON.stringify(componentAttrConfig[type as keyof typeof componentAttrConfig] ?? []);

    let newAttrList = JSON.parse(componentAttrList);

    if (!newAttrList[0]) return [];
    kebabToCamel(newAttrList);

    return newAttrList;
  });

  /** 组件大小枚举 */
  const size: string[] = Object.values(ComponentSize);
  /** 按钮类型枚举 */
  const btnType: string[] = Object.values(ComponentBtnType);
  /** 文本框枚举 */
  const inputType: string[] = Object.values(ComponentInputType);

  /**
   * 设置组件属性
   * 可以设置组件的大小、按钮类型、文本框类型
   * @param key 符合 ComponentProps 类型的 key
   * @param value 要修改的 value
   */
  const setProp = <T extends keyof ComponentProps>(key: T, value: string) => {
    if (!selectCom.value) return [];
    selectCom.value.props[key] = value;
    console.log(selectCom.value.props);
  };

  /** 下拉框添加项 */
  const addOption = () => {
    if (!selectCom.value) return [];
    selectCom.value.props.options.push({ label: "", value: "" });
    console.log(selectCom.value.props.options);
  };

  /** 下拉框删除项 */
  const delOption = (index: number | string) => {
    console.log(typeof index);
    if (!selectCom.value) return [];
    let i = Number(index);
    selectCom.value.props.options.splice(i, 1);
  };

  /** 数字框控制按钮位置 */
  const numberControlPosi = (posi: string) => {
    if (!selectCom.value) return [];
    selectCom.value.props.controlsPosition = posi;
  };

  /** 组件位置映射 */
  const alignMap = {
    left: "flex-start",
    center: "center",
    right: "flex-end",
  };

  /** 获取key */
  const alignKey = Object.keys(alignMap);

  /** 绑定align */
  const handleAlign = (align: string) => {
    if (!selectCom.value) return [];
    selectCom.value.props.align = alignMap[align as keyof typeof alignMap];
  };
</script>

<style scoped lang="scss">
  .designer-props {
    width: 100%;
    height: calc(100vh - var(--design-header) - 30px);
    padding: var(--design-aside-padding);

    .title {
      height: var(--design-aside-title);
    }

    .scroll-container {
      height: calc(100vh - var(--design-aside-scroll-height) - 30px);
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

            .rate-text-array {
              display: grid;
              gap: 8px;
              grid-template-columns: repeat(3, auto);
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
