import { defineStore } from "pinia";
import { ref } from "vue";
import type { FormItem, FormComponent } from '@/types/form'

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

  return {
    formSchema,
    selectCom,
    handleSelect,
    handleNotSelected
  }

})