<template>
  <div class="count-card">
    <el-card class="card" :body-style="{ padding: '12px 20px' }" v-for="item in cardData" :key="item.title">
      <div class="card-content">
        <div class="content">
          <p class="title">{{ item.title }}</p>
          <p class="count">{{ item.count }}</p>
        </div>
        <div class="iconfont">
          <el-icon :size="22">
            <MessageBox />
          </el-icon>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { MessageBox } from '@element-plus/icons-vue'
import { ref } from 'vue'

defineOptions({name: 'CountCard'})

const cardData = ref([
  {
    title: '全部',
    count: 24,
  },
  {
    title: '已发布',
    count: 11,
  },
  {
    title: '本月收集',
    count: 3478,
  },
  {
    title: '待处理数据',
    count: 186,
  },
])
</script>

<style scoped lang="scss">
.count-card {
  display: flex;
  justify-content: space-between;
  gap: 20px;
  // width: ;

  .card {
    flex: 1;

    // width: 300px;
    height: 120px;
    box-shadow: none;
    border-radius: 10px;

    .card-content {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: space-between;

      .count {
        margin-top: 15px;
        font-size: 27px;
        font-weight: 600;
      }
    }
  }
}
</style>