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

  /** 选择画布组件的状态，null表示未选中 */
  const selectCom = ref<FormComponent | null>(null)

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

  
  return {
    formSchema,
    selectCom,
    handleSelect,
    handleNotSelected,
    clearFormComponent
  }

})