import request from '@/utils/request'
import type { FormQueryParams, FormQueryStatusParams } from './types'
import type { PageResult } from '../common'
import type { FormItem } from '@/types/form'

const BASE_FORM_USL = '/mock/form'

/** 
 * 获取分页表单列表
 * @param params 查询参数
*/
export function getFormList(params: FormQueryParams) {
  return request<unknown, PageResult<FormItem>>({
    url: `${BASE_FORM_USL}/list`,
    method: 'GET',
    params
  })
}

/** 删除表单 */
export function deleteById(id: string) {
  return request({
    url: `${BASE_FORM_USL}/delete/${id}`,
    method: 'DELETE',
  })
}

export function getFormByStatus(params: FormQueryParams | FormQueryStatusParams) {
  return request<unknown, PageResult<FormItem>>({
    url: `${BASE_FORM_USL}/status`,
    method: 'GET',
    params
  })
}