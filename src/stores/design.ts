import { defineStore } from "pinia";
import { ref } from "vue";
import type { FormItem, FormComponent, FormStatus } from '@/types/form'
import { ElMessage } from "element-plus";
import { postFormSchema, putFormSchema } from '@/api/form/index'
import { useRouter } from "vue-router";
import { getFormDetailById } from '@/api/form/index.ts';
import { getLocalDateTime } from '@/utils/transform'

/** 初始表单模板 */
const defaultTemplate: FormItem = {
  id: '',
  formName: '新建表单',
  formType: '普通填报表单',
  status: 'draft',
  createTime: getLocalDateTime(),
  updateTime: '',
  schema: {
    formName: '表单',
    formType: 'normal',
    components: []
  }
}

export const useDesignStore = defineStore('design', () => {

  /** 初始化新表单 */
  const formSchema = ref<FormItem>(JSON.parse(JSON.stringify(defaultTemplate)))

  /** 重置表单 */
  const resetFormSchema = () => {
    formSchema.value = JSON.parse(JSON.stringify(defaultTemplate))
  }

  /** 
   * 赋值编辑表单
   * @param formDetail 表单详情
   */
  const setFormSchema = (formDetail: FormItem) => {
    formSchema.value = JSON.parse(JSON.stringify(formDetail))
  }

  /** 
 * 临时表单数据变量
 * 用于预览表单测试用，将临时数据和表单schema分开
 */
  const tempData = ref<Record<string, any>>({})

  /** 选择画布组件的状态，null表示未选中 */
  const selectCom = ref<FormComponent | null>(null)

  /**  true = 画布编辑模式, false = 预览模式 */
  const isEditMode = ref<boolean>(true)

  /** 表单保存状态 */
  const isSaved = ref<boolean>(false)

  /** 获取组件唯一id */
  const getComponentId = (): string => {
    const time = Date.now().toString(30)
    const rand = Math.random() * 100
    const id = time + rand.toFixed(0)
    return id
  }

  /**
   * 处理画布选中的组件
   *  @param com 组件实例
   */
  const handleSelect = (com: FormComponent) => {
    selectCom.value = com
  }

  /** 供画布中未选中组件调用 */
  const handleNotSelected = () => {
    selectCom.value = null
  }

  /** 清除表单组件 */
  const clearFormComponent = () => {
    if (!formSchema.value.schema.components[0]) return ElMessage.error('没有要清除的表单')
    formSchema.value.schema.components = []
  }

  /** 切换预览（浏览）模式 */
  const switchPreview = () => {
    isEditMode.value = false
  }

  /** 切换编辑模式 */
  const switchEdit = () => {
    isEditMode.value = true
  }

  /**
   * 组件复制
   * @param com 复制的目标组件
   * @param index 目标组件索引
   */
  const handleCopy = (com: FormComponent, index: number | string) => {
    let newId = getComponentId()
    let newField = com.field + '_copy' + newId
    // 深拷贝对象
    const jsonCom = JSON.stringify(com)
    const newCom = JSON.parse(jsonCom)
    // 设置全新id和字段
    newCom.id = newId
    newCom.field = newField
    // 插入到复制目标对象的下方
    formSchema.value.schema.components.splice(Number(index) + 1, 0, newCom)
  }

  /** 
   * 删除当前选中的组件
   * @param com 组件
   */
  const handleDelete = (com: FormComponent) => {
    // 删除画布组件数组里的当前项
    formSchema.value.schema.components = formSchema.value.schema.components.filter(
      item => item.id !== com.id
    )
    // 同步删除表单数据对象上对应的字段
    delete tempData.value[com.field]
  }

  const router = useRouter()
  /** 
   * 添加或更新表单到mock
   * @param type 处理类型
   * @param status 表单状态
   * @param succMessage 成功的消息
   */
  const pushForm = async (type: string, status: FormStatus, succMessage: string) => {
    if (!formSchema.value.schema.components[0]) return ElMessage.warning('表单控件为空，不能保存！')

    formSchema.value.status = status
    formSchema.value.updateTime = getLocalDateTime()

    try {
      type === 'post' ? await postFormSchema(formSchema.value) : await putFormSchema(formSchema.value)
      ElMessage.success(succMessage)
      isSaved.value = true
      router.replace({ path: '/form-list' })
    } catch (err) {
      // 错误提示已经在拦截器ElMessage弹出，这里不用处理提示
    }
  }

  /** 获取表单详情 */
  const getFormDetail = async (id: string): Promise<FormItem> => {
    const form = await getFormDetailById(id)
    if (!form) {
      // 后端返回空对象，代表该id不存在
      ElMessage.warning('该表单不存在或已被删除')
      // 跳转到表单列表页，避免停留在无效路由
      router.replace('/form-list')
      return JSON.parse(JSON.stringify(defaultTemplate))
    }
    return form
  }

  /** 
   * 处理添加的组件
   * @param fieldStr 字符串字段
   */
  const handleAddToCanvas = (fieldStr: string): FormComponent => {
    const component = JSON.parse(fieldStr)
    const id = getComponentId()
    component.id = `${id}`
    component.field = component.field + '_' + id
    return component
  }


  return {
    formSchema,
    tempData,
    selectCom,
    isEditMode,
    isSaved,
    resetFormSchema,
    setFormSchema,
    handleSelect,
    handleNotSelected,
    clearFormComponent,
    switchPreview,
    switchEdit,
    handleCopy,
    handleDelete,
    pushForm,
    getFormDetail,
    handleAddToCanvas,
    getComponentId
  }

})