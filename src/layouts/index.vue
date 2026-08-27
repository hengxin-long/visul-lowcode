<template>
  <div class="layout">
    <el-container>
      <el-aside width="200px" class="aside">
        <div class="menu">
          <div class="logo">Visul LowCode</div>
          <el-scrollbar>
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
          </el-scrollbar>
        </div>
      </el-aside>
      <el-container class="content">
        <el-header>
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
                <el-button :style="{ margin: '10px' }" type="primary">
                  <el-icon>
                    <CirclePlus />
                  </el-icon>
                  新建表单
                </el-button>
              </div>
            </el-card>
          </div>
        </el-header>
        <el-scrollbar class="main-scrollbar">
          <el-main class="main">
            <RouterView />
          </el-main>
        </el-scrollbar>
      </el-container>
    </el-container>
  </div>

</template>

<script setup lang="ts">
import { RouterView } from 'vue-router';
import { Edit, Document, CirclePlus, House } from '@element-plus/icons-vue';
import { ref } from 'vue'

const menu = document.querySelector('.menu')
const height = window.outerHeight
console.log('height ', height)
</script>

<style scoped lang="scss">
.layout {
  display: flex;

  :deep(.el-header) {
    height: 70px;
    padding: 0;
  }

  :deep(.el-main) {
    padding: 0;
  }


  .main-scrollbar {
    height: calc(100vh - 70px);
    // padding: 10px 0;
  }

  .logo {
    position: relative;
    width: 100%;
    height: 70px;
    text-align: center;
    line-height: 70px;
    font-size: 20px;
    color: #fff;
    font-weight: 700;
    background-color: $vlcpColor;
    box-shadow: 1px 0 $cardShadowColor;
    z-index: 999;
  }

  .logo::after {
    content: '';
    position: absolute;
    bottom: 0px;
    left: 0;
    width: 100%;
    height: 1px;
    background-color: $cardShadowColor;
  }

  .aside {
    box-shadow: 1px 0 $cardShadowColor;
    overflow: visible;
    height: 100vh;
  }

  .menu {
    flex-shrink: 0;
    width: 200px;
    height: 100%;

    background-color: #fff;

    :deep(.el-menu) {
      border: 0;
    }

    :deep(.el-scrollbar) {
      height: calc(100% - 70px);
    }

    :deep(.el-menu-item-group__title) {
      position: relative;
    }

    :deep(.el-menu-item-group__title::after) {
        content: '';
        position: absolute;
        bottom: 0px;
        left: 0;
        width: 150px;
        height: 2px;
        background-color: $vlcpColor;
    }

    :deep(.el-menu-item-group .el-menu-item) {
      position: relative;
    }

    :deep(.el-menu-item-group .el-menu-item::after) {
      content: '';
      position: absolute;
      bottom: 1px;
      left: 20px;
      // 压缩为0宽度
      transform: scaleX(0);
      // 变换原点设置在左边
      transform-origin: left center;
      width: 120px;
      height: 1px;
      background-color: $vlcpColor;
      transition: all cubic-bezier(0.39, 0.575, 0.565, 1) .3s;
    }

    :deep(.el-menu-item-group .el-menu-item:hover::after) {
      transform: scaleX(1);
    }
  }

  .content {
    width: 100%;


    .header {
      position: relative;
      width: 100%;

      :deep(.el-card) {
        border-radius: 0;
        border: 0;
      }

      :deep(.el-card::after) {
        content: '';
        position: absolute;
        bottom: 0px;
        left: 0;
        width: 100%;
        height: 1px;
        background-color: $cardShadowColor;
      }
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