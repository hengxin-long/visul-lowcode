import { defineStore } from "pinia";
import { ref } from "vue";
import type { FormItem, FormComponent } from '@/types/form'
import { ElMessage } from "element-plus";

export const useDesignStore = defineStore('design', () => {

  /** 初始化新表单 */
  const formSchema = ref<FormItem>({
    id: '1',
    formName: '',
    formType: '',
    status: 'draft',
    createTime: new Date().toLocaleTimeString(),
    updateTime: '',
    schema: {
      formName: '',
      formType: '',
      components: []
    }
  })

  /** 
 * 临时表单数据变量
 * 用于预览表单测试用，将临时数据和表单schema分开
 */
  const tempData = ref<Record<string, any>>({})

  /** 选择画布组件的状态，null表示未选中 */
  const selectCom = ref<FormComponent | null>(null)

  /**  true = 画布编辑模式, false = 预览模式 */
  const isEditMode = ref(true)

  /** 组件唯一id */
  let id = 1

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

  /** 切换预览模式 */
  const switchPreview = () => {
    isEditMode.value = false
  }

  /** 切换编辑模式 */
  const switchEdit = () => {
    isEditMode.value = true
  }

  /** 自增组件唯一id */
  const addId = () => {
    return id++
  }

  /**
   * 组件复制
   * @param com 复制的目标组件
   * @param index 目标组件索引
   */
  const handleCopy = (com: FormComponent, index: number | string) => {
    // console.log('复制到index索引下', com, index)
    let newId = addId()
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

  return {
    formSchema,
    tempData,
    selectCom,
    isEditMode,
    handleSelect,
    handleNotSelected,
    clearFormComponent,
    switchPreview,
    switchEdit,
    addId,
    handleCopy,
    handleDelete
  }

})