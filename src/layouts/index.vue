<template>
  <div class="layout">
    <div class="menu">
      <el-col :span="24">
        <h5 class="mb-2">Visul LowCode</h5>
        <el-menu :router="true" :default-active="$route.path">
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
        <el-card shadow="never" :body-style="{
          padding: '10px 20px',
          height: '70px',
          display: 'flex',
          justifyContent: 'space-between'
        }">
          <div class="header-left">
            <el-breadcrumb separator="/">
              <el-breadcrumb-item v-for="item in $route.meta.breadcrumb" :key="item">
                {{ item }}
              </el-breadcrumb-item>
            </el-breadcrumb>
            <p class="title">{{ $route.meta.title }}</p>
          </div>
          <div class="header-right">
            <el-icon :size="20">
              <House />
            </el-icon>
            <el-button :style="{ margin: '10px' }">
              <el-icon>
                <CirclePlus />
              </el-icon>
              新建表单
            </el-button>
          </div>
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
import { Edit, Document, CirclePlus, House } from '@element-plus/icons-vue';
import { ref } from 'vue'
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

.header-right {
  display: flex;
  align-items: center;
}

.title {
  margin: 10px 0 0 0;
  font-size: 20px;
  font-weight: 600;
}
</style>