import {defineStore} from 'pinia'
import { getFormList, countFormByStatus } from '@/api/form'
import { ref } from 'vue'
import type {FormQueryParams} from '@/api/form/types'
import type { FormItem } from '@/types/form'

export const useFormStore = defineStore('form', () => {

  const formData = ref<FormItem[]>([])
  const total = ref<number>(0)
  const all = ref<number>(0)
  const published = ref<number>(0)
  const draft = ref<number>(0)
  const close = ref<number>(0)

  const getData = async (params: FormQueryParams) => {
    const res = await getFormList(params)
    formData.value = res.fdata
    total.value = res.ftotal
    console.info('store res: ', res)
  }

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
    getData,
    countForm
  }
})