import { defineStore } from 'pinia'
import { getFormList, countFormByStatus } from '@/api/form'
import { ref } from 'vue'
import type { FormQueryParams } from '@/api/form/types'
import type { FormItem } from '@/types/form'

export const useFormStore = defineStore('form', () => {

  /** 表单分页列表 */
  const formData = ref<FormItem[]>([])
  /** 总页数 */
  const total = ref<number>(0)
  /** 全部 */
  const all = ref<number>(0)
  /** 已发布 */
  const published = ref<number>(0)
  /** 草稿 */
  const draft = ref<number>(0)
  /** 已关闭 */
  const close = ref<number>(0)
  /** 表单加载效果 */
  const loading = ref<boolean>(false)

  /**
   * 获取表单数据
   * @param params 表单分页查询参数实例
   */
  const getData = async (params: FormQueryParams) => {
    try {
      const res = await getFormList(params)
      formData.value = res.fdata
      total.value = res.ftotal
      // console.info('store res: ', res)
    } catch (error) {
      console.error(error)
    } finally {
      loading.value = false
    }
  }

  /** 获取表单状态类型的统计数 */
  const countForm = async () => {
    // 请求表单统计接口
    const res = await countFormByStatus()
    all.value = res.all
    published.value = res.published
    draft.value = res.draft
    close.value = res.close
  }

  return {
    formData,
    total,
    all,
    published,
    draft,
    close,
    loading,
    getData,
    countForm
  }
})