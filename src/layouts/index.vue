<template>
  <div class="layout">
    <div class="menu">
      <el-col :span="24">
        <h5 class="mb-2">Visul LowCode</h5>
        <el-menu 
        :router="true"
        :default-active="$route.path"
        >
          <el-menu-item-group title="工作台">
            <el-menu-item index="/form-list">
              <el-icon>
                <Document />
              </el-icon>
              <span>全部表单</span>
            </el-menu-item>
            <el-menu-item index="/form-design">
              <el-icon>
                <Edit />
              </el-icon>
              <span>新建表单</span>
            </el-menu-item>
          </el-menu-item-group>
        </el-menu>
      </el-col>
    </div>
    <div class="content">
      <div class="header">
        <el-card shadow="never">
          <span>工作台/全部表单</span>
        </el-card>
      </div>
      <div class="main">
        我是主体
        <RouterView />
      </div>
    </div>
  </div>

</template>

<script setup lang="ts">
import { RouterView } from 'vue-router';
import { Edit, Document } from '@element-plus/icons-vue';
import {ref} from 'vue'
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

  .content {
    width: 100%;


    .header {
      width: 100%;
    }
  }
}
</style>