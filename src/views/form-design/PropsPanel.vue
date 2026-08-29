<template>
  <div class="designer-props">
    <div class="title">
      <h3>字段属性</h3>
    </div>
    <div class="props-container">
      <div v-if="selectCom">
        <p>{{ selectCom?.props.label }}</p>
        <p>{{ selectCom?.props.require }}</p>
        <p>{{ selectCom?.props.placeholder }}</p>
      </div>
      <div v-else>
        请选中组件进行属性修改
      </div>
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
  height: calc(100vh - 60px);
  padding: 22px 20px;

  .props-container {
    width: 100%;
    height: 400px;
  }
}
</style>