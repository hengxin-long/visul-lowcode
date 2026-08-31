<template>
  <el-dialog :model-value="isPreviewFormVisible" title="表单" width="500" :before-close="handleClose">
    <Form :form-schema="designStore.formSchema"/>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="handleClose">保存</el-button>
        <el-button type="primary" @click="handleClose">
          确定
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import Form from '@/components/Form.vue'
import { useDesignStore } from '@/stores/design';

defineProps(['isPreviewFormVisible'])
const emit = defineEmits(['close'])
const designStore = useDesignStore()

/** 触发关闭事件 */
const handleClose = () => {
  emit('close')
}
</script>

<style scoped lang="scss"></style>