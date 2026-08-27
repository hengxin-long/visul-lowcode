<template>
  <div class="designer-props">
    <div class="title">
      <h3>字段属性</h3>
    </div>
    <div class="container" @click="handleClick">
    </div>
  </div>
</template>

<script setup lang="ts">
import Sortable from 'sortablejs';

const handleClick = () => {
  const example2Right = document.querySelector('.container') as HTMLElement
  const item = new Sortable(example2Right, {
    group: 'shared',
    animation: 150,
    disabled: false,
    
  });
  console.log(item)
}
</script>

<style scoped lang="scss">
.designer-props {
  width: 100%;
  height: calc(100vh - 60px);
  padding: 22px 20px;

  .container {
    width: 100%;
    height: 400px;
    background-color: rgb(175, 175, 175);
  }
}
</style>