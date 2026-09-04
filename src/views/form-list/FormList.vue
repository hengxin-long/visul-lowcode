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
        <el-button @click="reset" type="primary">重置</el-button>
        <el-button @click="showDelDialog" type="primary">批量删除</el-button>
        <el-select v-model="formType" placeholder="选择表单类型" style="width: 130px" @change="handleSelectFormType">
          <el-option v-for="item in formTypeOptions" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
        <div class="search-dialog">
          <el-icon class="icon-search">
            <Search />
          </el-icon>
          <el-input v-model="queryParams.keywords" class="search" type="search" placeholder="搜索表单名称或id" />
        </div>
        <el-button @click="handleSearch" type="primary">搜索</el-button>
      </div>
    </div>
    <div class="form-table">
      <el-table ref="formTableRef" :data="viewFormData" style="width: 100%" max-height="320" :border="false"
        empty-text="暂无数据" :default-sort="{ prop: 'updateTime', order: 'descending' }" @select="handleSingleRow"
        @select-all="handleAllRow">
        <el-table-column type="selection" width="40" />
        <el-table-column prop="formName" label="表单名称" min-width="230">
          <!-- 定义插槽实现指定单元格触发点击事件 -->
          <template #default="{ row }">
            <div @click="browseForm(row)" class="form-name">
              {{ row.formName }}
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="status" label="状态" min-width="120" />
        <el-table-column prop="createTime" label="创建时间" min-width="180" />
        <el-table-column prop="updateTime" sortable label="最后修改" min-width="180" />
        <el-table-column prop="formType" label="类型" max-width="180" />
        <el-table-column label="操作" width="140">
          <template #default="scope">
            <el-button type="primary" size="small" @click="handleEdit(scope.row)">
              编辑
            </el-button>
            <el-button type="danger" size="small" @click="handleDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination v-if="isPaginationVisible" background :layout="layout" :total="viewTotal"
          :page-size="queryParams.pageSize" @size-change="handleSizeChange" @current-change="handleCurrentChange"
          :page-sizes="pageSizes" :current-page="queryParams.page" :disabled="isDisable" />
      </div>
      <!-- 确认删除弹窗 -->
      <el-dialog v-model="isDelDialogVisible" title="提示" width="500" :before-close="handleClose">
        <span>确认删除表单？</span>
        <template #footer>
          <div class="dialog-footer">
            <el-button @click="handleClose">取消</el-button>
            <el-button type="primary" @click="submitDelForm">
              确认
            </el-button>
          </div>
        </template>
      </el-dialog>
      <!-- 浏览表单弹窗 -->
      <el-dialog v-model="isBrowseFormVisible" title="提示" width="500" :before-close="closeBrowseForm">
        <Form :formSchema="formSchema" />
        <template #footer>
          <div class="dialog-footer">
            <el-button @click="toDesigner">编辑</el-button>
            <el-button @click="setFormStatus('close')">关闭</el-button>
            <el-button @click="setFormStatus('published')">发布</el-button>
            <el-button type="primary" @click="closeBrowseForm">确认</el-button>
          </div>
        </template>
      </el-dialog>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Search } from '@element-plus/icons-vue'
import { deleteById, putFormSchema } from '@/api/form'
import { onMounted, watch } from 'vue'
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import { useFormStore } from '@/stores/form'
import { storeToRefs } from 'pinia'
import type { FormItem, FormStatus } from '@/types/form'
import { useRouter } from 'vue-router'
import type { FormQueryParams } from '@/api/form/types'
import type { TableInstance } from 'element-plus'
import { useDesignStore } from '@/stores/design'
import Form from '@/components/Form.vue'

const formStore = useFormStore()
const router = useRouter()
/** 表单列表和总数 */
const { formData, total } = storeToRefs(formStore)
/** 视图数据 */
const viewFormData = ref<FormItem[]>([])
/** 视图总页数，随viewFormData动态改变 */
const viewTotal = ref<number>(0)
/** 
 * el-table绑定ref属性
 * 目的是拿到组件实例对象调用clearSelection()
 */
const formTableRef = ref<TableInstance>()
/** 布局 */
const layout = ref<string>('total, sizes, prev, pager, next, jumper')
/** 选择每页显示条数 */
const pageSizes = ref<number[]>([5, 10, 15, 20])
/** 是否禁用，viewFormData为空数组之前先禁用 */
const isDisable = ref<boolean>(true)
/** 删除提示框状态 */
const isDelDialogVisible = ref<boolean>(false)
/** 预删除的表单，存id，批量删除 id用逗号隔开 */
const delForm = ref<string>('')
/** 分页组件是否影藏 */
const isPaginationVisible = ref(true)
/** 表单类型 */
const formType = ref('')
/** 状态分类 */
const { all, published, draft, close } = storeToRefs(formStore)
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
/** 表单查询参数 */
const queryParams = ref<FormQueryParams>({
  /** 当前页，默认值1 */
  page: 1,
  /** 每页条数，默认值5 */
  pageSize: 5,
  /** 表单状态，默认值all */
  formStatus: 'all'
})

/** 监听useFormStore的formData和total */
watch(() => [formData.value, total.value], () => {
  viewFormData.value = formData.value
  viewTotal.value = total.value
  isDisable.value = viewFormData.value?.length === 0 ? true : false
})

/** 获取表单列表 */
const getFormData = () => {
  console.info('page: ', queryParams.value.page, ' pageSize: ', queryParams.value.pageSize)
  formStore.getData(queryParams.value)
  console.log('formData ', formData)
}

/** 重置当前页 */
const resetCurrentPage = () => {
  queryParams.value.page = 1
}

/** 重置预删除的表单 */
const resetDelForm = () => {
  delForm.value = ''
}

/** 重置表单类型和搜索框关键字 */
const reset = () => {
  queryParams.value.keywords = ''
  formType.value = ''
  queryParams.value.page = 1
  queryParams.value.pageSize = 5
  getFormData()
}

/** 
 * 每页显示条数改变时调用
 * @param value 新的每页显示条数
 */
const handleSizeChange = (value: number) => {
  resetCurrentPage()
  queryParams.value.pageSize = value
  getFormData()
}

/**
 * 当前页改变时调用
 * @param value 新的当前页
 */
const handleCurrentChange = (value: number) => {
  queryParams.value.page = value
  getFormData()
}

/** 关闭确认删除弹窗 */
const handleClose = () => {
  isDelDialogVisible.value = false
  console.log('formTableRef ', formTableRef.value)
  // 清除选中的复选框
  formTableRef.value?.clearSelection()
  resetDelForm()
}

/** 显示删除弹窗 */
const showDelDialog = () => {
  if (delForm.value === '') return ElMessage.error('请选择要删除的表单')
  isDelDialogVisible.value = true
  console.log('delForm ', delForm.value)
}

/** 
 * 表单单个删除
 * @param row 表单实例
*/
const handleDelete = (row: any) => {
  delForm.value = row.id
  showDelDialog()
  console.log('row.id ', row.id)
}

/** 表单名称或id搜索表单 */
const handleSearch = () => {
  console.log('keyword ', queryParams.value.keywords)
  resetCurrentPage()
  getFormData()
}

/**
 * 按表单类型筛选
 * @param value 表单类型
 */
const handleSelectFormType = (value: string) => {
  console.log('formType ', formType.value)
  viewFormData.value = formData.value.filter(item => value === item.formType)
  viewTotal.value = viewFormData.value.length
  // formType.value = ''
}

/** 筛选表单状态按钮 */
const selectStatusBtn = [
  {
    id: '1',
    label: '全部',
    count: all,
    type: 'all active'
  },
  {
    id: '2',
    label: '已发布',
    count: published,
    type: 'published'
  },
  {
    id: '3',
    label: '草稿',
    count: draft,
    type: 'draft'
  },
  {
    id: '4',
    label: '已关闭',
    count: close,
    type: 'close'
  },
]

/**
 * 给元素添加激活类
 * @param selector 选择器
 */
const addActiveClass = (selector: string) => {
  document.querySelector('.active')?.classList.remove('active')
  document.querySelector(selector)?.classList.add('active')
}

/**
 * 处理表单状态
 * @param type 表单状态类型
 */
const handleStatusForm = async (type: string) => {
  const selector: string = `.nav ul .${type}`
  queryParams.value.formStatus = type

  resetCurrentPage()
  // 分隔类名
  if (type.includes('all')) {
    const classArr = type.split(' ')
    queryParams.value.formStatus = classArr[0] as string
    addActiveClass(`.nav ul .${classArr[0]}`)
    getFormData()
    return
  }

  addActiveClass(selector)
  getFormData()
}

/** 
 * 添加表单id到预删除的表单
 * @param selection 选择的项
 */
const addIdToDelForm = (selection: FormItem[]) => {
  for (let item of selection) {
    delForm.value += `${item.id},`
  }
  console.log('选中表单后的delForm', delForm.value)
}

/**
 * 单选表单
 * @param selection 选择的项
 */
const handleSingleRow = (selection: FormItem[]) => {
  console.log('单行数据', selection)
  delForm.value = ''
  addIdToDelForm(selection)
}

/**
 * 全选表单
 * @param selection 选择的项
 */
const handleAllRow = (selection: FormItem[]) => {
  console.log('全选数据', selection)
  if (selection.length === 0) {
    delForm.value = ''
    return
  }
  addIdToDelForm(selection)
}

/** 提交要删除的表单 */
const submitDelForm = async () => {
  console.log('delForm: ', delForm.value)
  try {
    await deleteById(delForm.value)
    ElMessage.success('删除成功！')
  } catch (err) {
    // 错误提示已经在拦截器ElMessage弹出，这里不用处理提示
  }
  handleClose()
  resetDelForm()
  formStore.countForm()
  resetCurrentPage()
  getFormData()
}

const isBrowseFormVisible = ref<boolean>(false)
const toEditForm = ref<FormItem>()

/** 带id参数跳转到 /form-design 页面 */
const toDesigner = () => {
  if (!toEditForm.value) return ElMessage.warning('请选择需要编辑的表单')
  const formId = toEditForm.value.id
  router.push({ path: `/form-design/${formId}` })
}

/** 关闭浏览表单弹窗 */
const closeBrowseForm = () => {
  isBrowseFormVisible.value = false
  toEditForm.value = undefined
}

/** 
 * 点击编辑跳转到表单设计器
 * @param row 单个表单实例
*/
const handleEdit = (row: FormItem) => {
  console.log('编辑的row：', row)
  toEditForm.value = row
  toDesigner()
}

const designStore = useDesignStore()
const { getFormDetail, switchPreview } = designStore
const formSchema = ref<FormItem>()

/** 
 * 浏览表单
 * @param row 单个表单实例
 */
const browseForm = (row: FormItem) => {
  isBrowseFormVisible.value = true
  toEditForm.value = row
  // console.log('浏览表单 ', row)
  switchPreview()
  getFormDetail(toEditForm.value.id).then(resolve => {
    // console.log('resolve ', resolve)
    formSchema.value = resolve
  }, reject => {
    throw new Error('获取失败！', reject)
  }).catch((e) => {
    ElMessage.error(e)
  })
}

/** 设置表单状态 */
const setFormStatus = async (status: FormStatus) => {
  if (!formSchema.value) return ElMessage.error('设置错误，没有要设置的表单！')
  formSchema.value.status = status
  formSchema.value.updateTime = new Date().toISOString()
  try {
    // res 此时仅仅等于后端的 data字段，拿不到code和msg
    await putFormSchema(formSchema.value)
    ElMessage.success('已更新')
    designStore.isSaved = true
  } catch (err) {
    // 错误提示已经在拦截器ElMessage弹出，这里不用处理提示
  }
  closeBrowseForm()
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
  margin-top: 20px;

  :deep(.el-table) {
    border-radius: 10px 10px 0 0;
    border: 1px solid var(--border-color);
  }

  .pagination {
    display: flex;
    justify-content: right;
    padding: 0 25px;
    width: 100%;
    height: 50px;
    background-color: #fff;
    border-radius: 0 0 10px 10px;
    border: 1px solid var(--border-color);
    border-top: 0;
  }

  .form-name {
    width: 100%;
    height: 100%;
    cursor: pointer;
  }

  :deep(.el-table .el-table__cell) {
    padding: 0;
    height: 40px;

  }

  :deep(.el-table .el-table__cell .cell) {
    width: 100%;
    height: 100%;
    line-height: 40px;
  }

  :deep(.el-table .el-table__header tr th) {
    color: #fff;
    background-color: $vlcpColor;
  }

  :deep(.el-table .el-table_1_column_2) {
    border-right: 1px solid var(--border-color);
    border-left: 1px solid var(--border-color);
  }

  :deep(.el-table .descending .sort-caret.descending) {
    border-top-color: var(--sort-button-color);
  }

  :deep(.el-table .ascending .sort-caret.ascending) {
    border-bottom-color: var(--sort-button-color);
  }

}

.form-nav {
  display: flex;
  justify-content: space-between;
  height: 50px;

  .filter {
    flex: 0.4;
    padding: 5px;
  }

  .nav {
    flex: 0.25;
    padding: 5px;
    border-radius: 8px;
    background-color: rgb(233, 233, 233);
  }

  .filter {
    display: flex;
    gap: 10px;
    align-items: center;

    .search {
      vertical-align: middle;
      width: 200px;

      /* :deep() 深度穿透，修改组件内部DOM */
      :deep(.el-input__wrapper) {
        padding: 0 10px 0 30px;
      }
    }

    el-button {
      width: 50px;
    }

    .search-dialog {
      position: relative;

      .icon-search {
        position: absolute;
        top: 50%;
        left: 10px;
        z-index: 10;
        transform: translateY(-50%);
      }
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


      .title {
        font-size: 13px;
      }

      .count {
        font-size: 12px;
      }
    }

    li:hover {
      background-color: #fff;
      transition: all .4s;

      .title {
        font-size: 14px;
        color: $vlcpColor;
        font-weight: 600;
        transition: all .4s;
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