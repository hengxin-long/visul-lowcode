<template>
  <div class="form-body">
    <div class="form-nav">
      <div class="nav">
        <ul>
          <li v-for="item in selectStatusBtn" :key="item.id" :class="item.type" @click="handleStatusForm(item.type)">
            <span class="title">{{ item.label }}&nbsp;</span>
            <span class="count">{{ item.count }}</span>
          </li>
        </ul>
      </div>
      <div class="filter">
        <el-button @click="toBatchDelete">批量删除</el-button>
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
        :default-sort="{ prop: 'updateTime', order: 'descending' }" @select="handleSingleRow"
        @select-all="handleAllRow">
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
      <el-dialog v-model="isDelDialogVisible" title="提示" width="500" :before-close="handleClose">
        <span>确认删除表单？</span>
        <template #footer>
          <div class="dialog-footer">
            <el-button @click="isDelDialogVisible = false">取消</el-button>
            <el-button type="primary" @click="handleSubmit">
              确认
            </el-button>
          </div>
        </template>
      </el-dialog>

      <!-- 批量删除提示框 -->
      <el-dialog v-model="isBatDelDialogVisible" title="提示" width="500" :before-close="handleCloseBatDel">
        <span>确认批量删除表单？</span>
        <template #footer>
          <div class="dialog-footer">
            <el-button @click="isBatDelDialogVisible = false">取消</el-button>
            <el-button type="primary" @click="submitBatchDel">
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
import { deleteById, getFormByStatus } from '@/api/form'
import { onMounted, watch } from 'vue'
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import { useFormStore } from '@/stores/form'
import { storeToRefs } from 'pinia'
import type { FormItem } from '@/types/form'
import { useRouter } from 'vue-router'

const formStore = useFormStore()
const router = useRouter()
/** 表单列表和总数 */
const { formData, total } = storeToRefs(formStore)
/** 展示在页面的数据 */
const viewFormData = ref<FormItem[]>([])
/** 布局 */
const layout = ref<string>('total, sizes, prev, pager, next, jumper')
/** 当前页 */
const currentPage = ref<number>(1)
/** 每页条数 */
const pageSize = ref<number>(5)
/** 选择每页显示条数 */
const pageSizes = ref<number[]>([5, 10, 15, 20])
/** 是否禁用，viewFormData为空数组之前先禁用 */
const isDisable = ref<boolean>(true)
/** 删除提示框状态 */
const isDelDialogVisible = ref<boolean>(false)
/** 预删除的行（表单） */
const form = ref()
/** 搜索查询 */
const searchKeyword = ref<string>('')
/**
 * 分页组件是否影藏
 * v-if判断，true为显示，false为隐藏
 * （bug）返回筛选的数据，分页功能会无效
 * （暂时先这样处理）只有做关键字查询时才会隐藏
 */
const isPaginationVisible = ref(true)
/** 表单类型 */
const formType = ref('')
/** 表单类型选项 */
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
  console.log('编辑的row', 'row: ', row)
  router.push({ path: '/form-design' })
}

const handleDelete = (row: any) => {
  form.value = row
  console.log('row ', row)
  isDelDialogVisible.value = true
  console.log('form.value ', form.value)
}

const handleClose = () => {
  isDelDialogVisible.value = false
}

// 删除异步请求
const handleSubmit = async () => {
  isDelDialogVisible.value = false
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

/** 筛选表单状态按钮 */
const selectStatusBtn = [
  {
    id: '1',
    label: '全部',
    count: 26,
    type: 'all active'
  },
  {
    id: '2',
    label: '已发布',
    count: 11,
    type: 'published'
  },
  {
    id: '3',
    label: '草稿',
    count: 4,
    type: 'draft'
  },
  {
    id: '4',
    label: '已关闭',
    count: 5,
    type: 'close'
  },
]

// 给元素添加激活类
const addActiveClass = (selector: string) => {
  document.querySelector('.active')?.classList.remove('active')
  document.querySelector(selector)?.classList.add('active')
}

const handleStatusForm = async (type: string) => {
  const selector: string = `.nav ul .${type}`

  resetCurrentPage()
  if (type.includes('all')) {
    const classArr = type.split(' ')
    addActiveClass(`.${classArr[0]}`)
    getFormData()
    return
  }

  addActiveClass(selector)

  const res = await getFormByStatus({
    page: currentPage.value,
    pageSize: pageSize.value,
    formStatus: type,
  })
  console.log('status form data: ', res)
  formData.value = res.fdata
  total.value = res.ftotal
}
/** 批量删除 */
const batchDelete = ref<string>('')
const isBatDelDialogVisible = ref<boolean>(false)

const addIdToBatchDelete = (selection: FormItem[]) => {
  for (let item of selection) {
    batchDelete.value += `${item.id},`
  }
  console.log(batchDelete)
}

const toBatchDelete = () => {
  if (batchDelete.value === '') return ElMessage.error('请选择要删除的表单')
  isBatDelDialogVisible.value = true
}

const handleCloseBatDel = () => {
  isBatDelDialogVisible.value = false
}

const handleSingleRow = (selection: FormItem[]) => {
  console.log('单行数据', selection)
  batchDelete.value = ''
  addIdToBatchDelete(selection)
}

const handleAllRow = (selection: FormItem[]) => {
  console.log('全选数据', selection)
  if (selection.length === 0) {
    batchDelete.value = ''
    return
  }
  addIdToBatchDelete(selection)
}

const submitBatchDel = () => {
  const res = deleteById(batchDelete.value)
  console.log(res)
  handleCloseBatDel()
  ElMessage.success('删除成功')
  resetCurrentPage()
  getFormData()
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
      cursor: pointer;
      transition: all .3s;

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
        font-size: 14px;
        color: $vlcpColor;
        font-weight: 600;
      }

      .count {
        font-size: 12px;
      }
    }

    .active {
      background-color: #fff;

      .title {
        font-size: 14px;
        color: $vlcpColor;
        font-weight: 600;
      }

      .count {
        font-size: 12px;
      }
    }
  }
}
</style>