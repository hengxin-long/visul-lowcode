<template>
  <div class="designer-components">
    <div class="title">
      <h3>添加字段</h3>
      <p>拖拽或点击</p>
    </div>
    <div class="scroll-container">
      <el-scrollbar>
        <div class="components">
          <el-collapse v-model="activeName" accordion>
            <el-collapse-item title="基础字段" name="1">
              <el-scrollbar max-height="220px">
                <VueDraggable
                  v-model="base"
                  :group="{
                    name: 'canvas',
                    pull: 'clone',
                    put: false,
                  }"
                  :sort="false",
                  :animation="150"
                  class="fields-box"
                  @click="clickAddToCanvas"
                >
                  <div v-for="field in base" class="field" :key="field.componentType" :data-field="JSON.stringify(field)">
                    <p>
                      <el-icon class="icon">
                        <component :is="field.icon" />
                      </el-icon>
                    </p>
                    <p>{{ field.label }}</p>
                  </div>
                </VueDraggable>
              </el-scrollbar>
            </el-collapse-item>
            <el-collapse-item title="复合字段" name="2">
              <el-scrollbar max-height="220px">
                <VueDraggable
                  v-model="composite"
                  :group="{
                    name: 'canvas',
                    pull: 'clone',
                    put: false,
                  }"
                  :sort="false",
                  :animation="150"
                  class="fields-box"
                  @click="clickAddToCanvas"
                >
                  <div v-for="field in composite" class="field" :key="field.componentType" :data-field="JSON.stringify(field)">
                    <p>
                      <el-icon class="icon">
                        <component :is="field.icon" />
                      </el-icon>
                    </p>
                    <p>{{ field.label }}</p>
                  </div>
                </VueDraggable>
              </el-scrollbar>
            </el-collapse-item>
          </el-collapse>
        </div>
      </el-scrollbar>
    </div>
    <div class="tips">
      小提示：拖动字段卡片可调整顺序，点击字段可配置属性
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { baseFields, compositeFields } from '@/config/materialList';
import type { FormComponent } from '@/types/form'
import { useDesignStore } from '@/stores/design';
import { storeToRefs } from 'pinia';
import { VueDraggable } from 'vue-draggable-plus';

const activeName = ref('1')
/** 基础字段 */
const base = ref<FormComponent[]>(baseFields)
/** 复合字段 */
const composite = ref<FormComponent[]>(compositeFields)

const designStore = useDesignStore()
const { formSchema } = storeToRefs(designStore)
const { handleAddToCanvas } = designStore

/** 
 * 点击添加到画布上
 * @param evt 点击事件
 */
const clickAddToCanvas = (evt: PointerEvent) => {
  const target = evt.target as HTMLElement | null
  if (!target) return

  // 从点击的目标，向上找最近的 .field 元素
  const targetFieldDom = target.closest('.field') as HTMLElement | null
  if (!targetFieldDom || !(targetFieldDom instanceof HTMLElement)) return

  const fieldStr = targetFieldDom.dataset.field
  if (!fieldStr) return
  // 转换
  const component = handleAddToCanvas(fieldStr)
  formSchema.value.schema.components.push(component)
}
</script>

<style scoped lang="scss">
.designer-components {
  width: 100%;
  height: calc(100vh - var(--design-header));
  padding: var(--design-aside-padding);

  .title {
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: var(--design-aside-title);

    p {
      color: var(--tips-color);
    }
  }

  .scroll-container {
    margin: 15px 0;
    width: 100%;
    height: calc(100vh - var(--design-aside-scroll-height) - 30px - 55px);

    .components {
      width: 100%;

      .field {
        width: 100%;
        height: 45px;
        padding: 2px 8px;
        background-color: #fff;
        border: 1px solid var(--border-color);
        border-radius: 8px;
        text-align: center;
        cursor: pointer;

        p {
          font-size: 12px;
          height: 20px;
          line-height: 20px;
          text-align: start;
        }

        .icon {
          display: inline;
          color: $vlcpColor;
        }

      }

      :deep(.el-scrollbar) {
        width: 100%;

      }

      .fields-box {
        display: grid;
        grid-template-columns: repeat(2, 1fr) !important;
        gap: 10px;
        width: 100%;
      }
    }
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