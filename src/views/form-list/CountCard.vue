<template>
  <div class="count-card">
    <el-card class="card" :body-style="{ padding: '12px 20px' }" v-for="item in cardData" :key="item.title">
      <div class="card-content">
        <div class="content">
          <p class="title">{{ item.title }}</p>
          <p class="count">{{ item.count }}</p>
        </div>
        <div class="iconfont" :style="`background-color: ${item.iconBackgroundColor}`">
          <el-icon :size="22" :style="`color: ${item.iconColor}`">
            <MessageBox />
          </el-icon>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { MessageBox } from '@element-plus/icons-vue'
import { onMounted, ref } from 'vue'
import { useFormStore } from '@/stores/form'
import { storeToRefs } from 'pinia';
import type { Card } from '@/types/card';
import type {Ref} from 'vue'


defineOptions({ name: 'CountCard' })

const formStore = useFormStore()
const { all, published } = storeToRefs(formStore)
console.log('all', all)
const { countForm } = formStore

const cardData = ref<Card<Ref>[]>([
  {
    title: '全部',
    count: all,
    icon: '',
    backgroundColor: '',
    iconColor: '#4BED4BFF',
    iconBackgroundColor: '#B5FFB5FF'
  },
  {
    title: '已发布',
    count: published,
    icon: '',
    backgroundColor: '',
    iconColor: '#5AD2F0FF',
    iconBackgroundColor: '#BDF0FDFF'
  },
  {
    title: '本月收集',
    count: ref(3785),
    icon: '',
    backgroundColor: '',
    iconColor: '#FAAF47FF',
    iconBackgroundColor: '#FFD59BFF'
  },
  {
    title: '待处理数据',
    count: ref(186),
    icon: '',
    backgroundColor: '',
    iconColor: '#DB5FFDFF',
    iconBackgroundColor: '#F1C0FFFF'
  },
])

onMounted(() => {
  countForm()
})
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

      .iconfont {
        width: 40px;
        height: 40px;
        border-radius: 10px;
        // background-color: rgb(133, 238, 133);
        text-align: center;
        line-height: 50px;
      }
    }
  }
}
</style>