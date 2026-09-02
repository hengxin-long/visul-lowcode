<template>
  <div class="design-form">
    <div class="title">
      <h3>表单属性</h3>
    </div>
    <div class="scrollbar-container">
      <el-scrollbar>
        <div class="props-container">
          <div class="prop">
            <p>表单名称</p>
            <el-input v-model="formSchema.formName" size="small" placeholder="输入表单名称"/>
          </div>
          <div class="prop">
            <p>表单类型</p>
            <el-input v-model="formSchema.formType" size="small" placeholder="输入表单类型"/>
          </div>
          <div class="prop">
            <p>表单标题</p>
            <el-input v-model="formSchema.schema.formName" size="small" placeholder="输入表单标题"/>
          </div>
          <div class="prop">
            <p>表单内部类型（业务类型）</p>
            <el-input v-model="formSchema.schema.formType" size="small" placeholder="输入表单业务类型"/>
          </div>
        </div>
        <el-button @click="view">点击查看schema</el-button>
      </el-scrollbar>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useDesignStore } from '@/stores/design'
import { storeToRefs } from 'pinia';

const designStore = useDesignStore()
const { formSchema } = storeToRefs(designStore)

const view = () => {
  console.log(designStore.formSchema.schema)
}
</script>

<style scoped lang="scss">
.design-form {
  padding: 20px;

  .title {
    height: var(--design-aside-title);
  }

  .prop {
    margin: 6px 0;

    p {
      margin-bottom: 3px;
    }
  }
}
</style>