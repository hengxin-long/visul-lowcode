<template>
  <div class="layout">
    <div class="menu">
      <el-col :span="24">
        <h5 class="mb-2">Visul LowCode</h5>
        <el-menu default-active="1">
          <el-menu-item index="1" @click="$router.push({path: '/form-list'})">
            <el-icon><icon-menu /></el-icon>
            <span>全部表单</span>
          </el-menu-item>
          <el-menu-item index="2" @click="$router.push({path: '/form-design'})">
            <el-icon>
              <document />
            </el-icon>
            <span>新建表单</span>
          </el-menu-item>
        </el-menu>
      </el-col>
    </div>
    <div class="content">
      <div class="header">我是顶部</div>
      <div class="main">
        我是主体
        <RouterView />
      </div>
    </div>
  </div>

</template>

<script setup lang="ts">
import { RouterView } from 'vue-router';
</script>

<style scoped lang="scss">
.layout {
  display: flex;

  .menu {
    width: 200px;
    height: 600px;
    border: 1px solid gray;
    background-color: #fff;
  }
}
</style>