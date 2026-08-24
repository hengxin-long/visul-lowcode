import {defineStore} from 'pinia'
import { getFormList } from '@/api/form'
import { ref } from 'vue'
import type {FormQueryParams} from '@/api/form/types'
import type { FormItem } from '@/types/form'
import type { ApiResult } from '@/api/common'

export const useFormStore = defineStore('form', () => {

  const formData = ref<FormItem[]>([])
  const total = ref<number>(0)

  const getData = async (query: FormQueryParams) => {
    const res = await getFormList(query)
    formData.value = res.fdata
    total.value = res.ftotal
    console.info('store res: ', res.fdata)
  }

  return {
    formData,
    total,
    getData
  }
})