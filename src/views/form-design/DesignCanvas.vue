<template>
  <div class="designer-canvas">
    <div class="title">
      <p class="descrition">表单结构</p>
      <h3 class="form-name">{{ formName }}</h3>
    </div>
    <div class="form-canvas">
      asjl 
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';


const formName = ref('登录表单')
</script>

<style scoped lang="scss">
.designer-canvas {
  .form-name {
    margin: 3px 0 17px 0;
  }
  
  .form-canvas {
    width: 100%;
    min-height: 400px;
    padding: 18px 15px;
    background-color: #fff;
    border: 1px solid var(--border-color);
    border-radius: 15px;
  }
}
</style>