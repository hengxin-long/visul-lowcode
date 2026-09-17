<template>
  <div
    class="form-component"
    v-for="(com, index) in formSchema?.schema.components"
    :key="com.id"
    @click.stop="isEditMode && activeSelectCom(com)"
    :class="{ 
      'form-component--edit': isEditMode, 
      'active': isEditMode && com.id === currentActiveId
    }"
    :id="com.id"
    :style="{
      display: 'flex',
      justifyContent: com.props.align,
    }"
  >
    <div
      class="operate"
      v-if="isEditMode"
    >
      <el-icon
        @click.stop="handleCopy(com, index)"
        title="复制"
        :size="16"
      >
        <DocumentCopy />
      </el-icon>
      <el-icon
        @click.stop="handleDelete(com)"
        title="删除"
        :size="16"
      >
        <Delete />
      </el-icon>
    </div>
    <div
      class="inner-item"
      :style="{ width: com.props?.width }"
    >
      <!-- 动态渲染组件 -->
      <p v-if="com.componentType === 'input' || com.componentType === 'password'">{{ com.props.label }}</p>
      <component
        :is="map[com.componentType as keyof typeof map]"
        v-bind="com.props"
        :model-value="tempData[com.field]"
        @update:model-value="(val: any) => (tempData[com.field] = val)"
      >
        <span v-if="com.componentType === 'button'">{{ com.props.label }}</span>
        <span v-if="com.componentType === 'checkbox'">{{ com.props.label }}</span>
      </component>
      <FormTitle
        v-if="com.componentType === 'title'"
        :com="com"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useDesignStore } from "@/stores/design";
  import { componentMap } from "@/config/componentMap.ts";
  import { watch } from "vue";
  import type { FormComponent } from "@/types/form";
  import { storeToRefs } from "pinia";
  import { DocumentCopy, Delete } from "@element-plus/icons-vue";
  import FormTitle from "./form-custom/FormTitle.vue";


  /** ElementPlus组价映射 */
  const map = componentMap;
  
  const props = defineProps(["formSchema"]);
  const designStore = useDesignStore();
  const { handleSelect, handleCopy, handleDelete, setCurrentActiveId } = designStore;
  const { isEditMode, tempData, currentActiveId } = storeToRefs(designStore);

  /** 深度监听，组件有变化就调用 */
  watch(
    () => props.formSchema,
    (schemaData) => {
      if (!schemaData?.schema?.components) return;

      const list = schemaData.schema.components;
      const obj: Record<string, any> = {};
      list.forEach((item: FormComponent) => {
        if (item.componentType === 'checkboxGroup') {
          obj[item.field] = []
        } else {
          obj[item.field] = item.componentType === "inputNumber" || item.componentType === "rate" ? 1 : "";
        }
      });
      tempData.value = obj;
    },
    { deep: true, immediate: true },
  );

  /** 
   * 给选中的组件添加active 
   * @param com 组件实例
   */
  const activeSelectCom = (com: FormComponent) => {
    setCurrentActiveId(com.id)
    handleSelect(com)
  }
</script>

<style scoped lang="scss">
  .form-component {
    position: relative;
    width: 100%;
    padding: 10px 0 10px 0;

    .operate {
      display: none;
      position: absolute;
      z-index: 999;
      top: 0;
      right: 0;
    }

    .inner-item {
      :deep(.el-input),
      :deep(.el-date-picker),
      :deep(.el-number-input),
      :deep(.el-select),
      :deep(.el-button) {
        width: 100% !important;
      }
    }
  }

  .form-component.form-component--edit:hover {
    outline: 1px solid #409eff !important;
  }

  .form-component.form-component--edit:hover .operate {
    display: block;
  }

  .active {
    outline: 1px solid #409eff;

    .operate {
      display: block;
    }
  }
</style>
