<template>
  <div class="designer-layout">
    <el-container>
      <el-header class="header">
        <DesignHeader />
      </el-header>
      <el-container>
        <el-aside width="200px">Aside</el-aside>
        <el-main>Main</el-main>
        <el-aside width="200px">Aside</el-aside>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import DesignHeader from './DesignHeader.vue';
</script>

<style scoped lang="scss">
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  border: 1px solid var(--border-color);
}
</style>