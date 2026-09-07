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
                <div class="fields-box">
                  <div v-for="field in fields" class="field" :key="field.label" :data-field="JSON.stringify(field)">
                    <p>
                      <el-icon class="icon">
                        <component :is="field.icon" />
                      </el-icon>
                    </p>
                    <p>{{ field.label }}</p>
                  </div>
                </div>
              </el-scrollbar>
            </el-collapse-item>
            <el-collapse-item title="主页字段" name="2">
              <el-scrollbar max-height="220px">
                <div class="fields-box">
                  <div v-for="field in fields" class="field" :key="field.label" :data-field="JSON.stringify(field)">
                    <p>
                      <el-icon class="icon">
                        <component :is="field.icon" />
                      </el-icon>
                    </p>
                    <p>{{ field.label }}</p>
                  </div>
                </div>
              </el-scrollbar>
            </el-collapse-item>
            <el-collapse-item title="表单字段" name="3">
              <el-scrollbar max-height="220px">
                <div class="fields-box">
                  <div v-for="field in fields" class="field" :key="field.label" :data-field="JSON.stringify(field)">
                    <p>
                      <el-icon class="icon">
                        <component :is="field.icon" />
                      </el-icon>
                    </p>
                    <p>{{ field.label }}</p>
                  </div>
                </div>
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
import { onMounted, onUnmounted, ref } from 'vue';
import Sortable from 'sortablejs'
import { baseFields } from '@/config/materialList';
import type { FormComponent } from '@/types/form'
import { ElMessage } from 'element-plus';

const activeName = ref('1')
const fields = ref<FormComponent[]>(baseFields)
let sortbale: Sortable[] = []

onMounted(() => {
  const fieldSet = document.querySelectorAll('.fields-box') as NodeListOf<HTMLElement>

  if (!fieldSet[0]) return ElMessage.error('加载错误')

  for (let fields of fieldSet) {
    sortbale.push(new Sortable(fields, {
      group: {
        name: 'canvas', // 组名
        pull: 'clone', // 克隆
        put: false, // 是否可放入
      },
      sort: false, // 列表内是否可排序
      animation: 150, // 动画
    }));
  }
})

onUnmounted(() => {
  // 卸载组件完组件销毁事件
  for (let fields of sortbale) {
    fields?.destroy()
  }
})

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
        grid-template-columns: repeat(2, auto) !important;
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