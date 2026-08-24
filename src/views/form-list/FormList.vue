<template>
  <div class="form-body">
    <div class="form-nav">
      <div class="nav">
        <ul>
          <li v-for="v in 4">
            <span class="title">已发布</span>
            <span class="count"> 24</span>
          </li>
        </ul>
      </div>
      <div class="filter">
        <el-select v-model="formType" placeholder="选择表单类型" style="width: 240px" @change="handleSelectFormType">
          <el-option v-for="item in formTypeOptions" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
        <el-icon>
          <Search />
        </el-icon>
        <el-input v-model="searchKeyword" class="search" type="search" placeholder="搜索表单名称" />
        <el-button @click="handleFilter" type="primary">查询</el-button>
      </div>
    </div>
    <div class="form-table">
      <el-table :data="viewFormData" style="width: 100%" max-height="320" :border="true" empty-text="暂无数据"
        :default-sort="{ prop: 'updateTime', order: 'descending' }">
        <el-table-column type="selection" width="40" />
        <el-table-column prop="formName" label="表单名称" min-width="350" />
        <el-table-column prop="status" label="状态" width="120" />
        <el-table-column prop="createTime" label="创建时间" width="200" />
        <el-table-column prop="updateTime" sortable label="最后修改" width="200" />
        <el-table-column prop="formType" label="类型" width="180" />
        <el-table-column label="操作" min-width="120">
          <template #default="scope">
            <el-button type="primary" size="small" @click="handleEdit(scope.row)">
              编辑
            </el-button>
            <el-button type="danger" size="small" @click="handleDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination v-if="isPaginationVisible" background :layout="layout" :total="total" :page-size="pageSize"
        @size-change="handleSizeChange" @current-change="handleCurrentChange" :page-sizes="pageSizes"
        :current-page="currentPage" :disabled="isDisable" />
      <!-- 删除弹框 -->
      <el-dialog v-model="dialogVisible" title="提示" width="500" :before-close="handleClose">
        <span>确认删除表单？</span>
        <template #footer>
          <div class="dialog-footer">
            <el-button @click="dialogVisible = false">取消</el-button>
            <el-button type="primary" @click="handleSubmit">
              确认
            </el-button>
          </div>
        </template>
      </el-dialog>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Search } from '@element-plus/icons-vue'
import { deleteById } from '@/api/form'
import { onMounted, watch } from 'vue'
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import { useFormStore } from '@/stores/form'
import { storeToRefs } from 'pinia'
import type { FormItem } from '@/types/form'

const formStore = useFormStore()

/** 表单列表和总数 */
const { formData, total } = storeToRefs(formStore)
// 展示在页面的数据
const viewFormData = ref<FormItem[]>([])
// 布局
const layout = ref<string>('total, sizes, prev, pager, next, jumper')
// 当前页
const currentPage = ref<number>(1)
// 每页条数
const pageSize = ref<number>(5)
// 选择每页显示条数
const pageSizes = ref<number[]>([5, 10, 15, 20])
// 总数
// const total = ref<number>(0)
// 是否禁用
const isDisable = ref<boolean>(true) // formData为空数组之前先禁用
// 删除提示框状态
const dialogVisible = ref<boolean>(false)
// 预删除的行（表单）
const form = ref()
// 搜索查询
const searchKeyword = ref<string>('')
/**
 * 分页组件是否影藏
 * v-if判断，true为显示，false为隐藏
 * （bug）返回筛选的数据，分页功能会无效
 * （暂时先这样处理）只有做关键字查询时才会隐藏
 */
const isPaginationVisible = ref(true)
// 表单类型
const formType = ref('')
// 表单类型选项
const formTypeOptions = [
  {
    label: '业务表单',
    value: '业务表单'
  },
  {
    label: '调查表单',
    value: '调查表单'
  }
]

// 监听useFormStore的formData
watch(() => formData.value, () => {
  viewFormData.value = formData.value
  isDisable.value = viewFormData.value?.length === 0 ? true : false
})

// 表单数据请求函数
const getFormData = () => {
  console.info('page: ', currentPage.value, ' pageSize: ', pageSize.value)
  formStore.getData({
    page: currentPage.value,
    pageSize: pageSize.value
  })
  console.log('formData ', formData)
}

const resetCurrentPage = () => {
  currentPage.value = 1
}

const handleSizeChange = (value: number) => {
  resetCurrentPage()
  pageSize.value = value
  getFormData()
}

const handleCurrentChange = (value: number) => {
  currentPage.value = value
  getFormData()
}

const handleEdit = (row: any) => {
  // console.log('编辑的 index == ', index, 'row: ', row)
}

const handleDelete = (row: any) => {
  form.value = row
  dialogVisible.value = true
  console.log('form.value ', form.value)
}

const handleClose = () => {
  dialogVisible.value = false
}

// 删除异步请求
const handleSubmit = async () => {
  dialogVisible.value = false
  const res = await deleteById(form?.value.id)
  console.log('delete res: ', res)
  if (!res) {
    ElMessage.success('删除成功')
    getFormData()
  }
}

const handleFilter = () => {
  console.log('keyword ', searchKeyword.value)
  resetCurrentPage()

  formStore.getData({
    page: currentPage.value,
    pageSize: pageSize.value,
    keywords: searchKeyword.value
  })

  isPaginationVisible.value = searchKeyword.value.trim() === '' ? true : false
}

// 按表单类型筛选
const handleSelectFormType = (value: string) => {
  console.log('formType ', formType.value)
  viewFormData.value = formData.value.filter(item => value === item.formType)
  formType.value = ''
}

onMounted(() => {
  getFormData()
})
</script>

<style scoped lang="scss">
.form-body {
  width: 100%;
  margin-top: 20px;
}

.form-table {
  width: 100%;
  margin-top: 15px;
}

.form-nav {
  display: flex;
  justify-content: space-between;
  height: 50px;

  .nav {
    flex: 0.25;
    padding: 5px;
  }

  .filter {
    flex: 0.35;
    padding: 5px;
  }

  .nav {
    border-radius: 8px;
    background-color: rgb(233, 233, 233);
  }

  .filter {
    display: flex;
    gap: 10px;
    align-items: center;

    .search {
      vertical-align: middle;
    }

    el-button {

      width: 50px;
    }
  }

  .nav ul {
    display: flex;
    gap: 8px;
    width: 100%;
    height: 100%;

    li {
      flex: 1;
      height: 100%;
      border-radius: 6px;
      text-align: center;
      line-height: 40px;

      .title {
        font-size: 13px;
      }

      .count {
        font-size: 12px;
      }
    }

    li:hover {
      background-color: #fff;

      .title {
        font-size: 15px;
        color: $vlcpColor;
        font-weight: 600;
      }

      .count {
        font-size: 13px;
      }
    }
  }
}
</style>