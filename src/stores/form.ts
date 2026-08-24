import {defineStore} from 'pinia'
import { getFormList } from '@/api/form'
import { ref } from 'vue'
import type {FormQueryParams} from '@/api/form/types'

export const useFormStore = defineStore('form', () => {

  const formData = ref([])
  const total = ref<number>(0)

  const getData = async (query: FormQueryParams) => {
    const res = await getFormList(query)
    formData.value = res.data?.fdata
    total.value = res.data?.ftotal
    console.info('store res: ', res.data)
  }

  return {
    formData,
    total,
    getData
  }
})