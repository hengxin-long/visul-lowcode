import request from '@/utils/request'
import type { FormQueryParams, FormQueryStatusParams } from './types'
import type { PageResult, CountForm } from '../common'
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

/** 按表单状态统计表单 */
export function countFormByStatus() {
  return request<unknown, CountForm>({
    url: `${BASE_FORM_USL}/count`,
    method: 'GET'
  })
}

/** 
 * 新增表单
 * data：POST / PUT 使用，放到请求体 Body，不会显示在URL上，适合大对象、schema
 */
export function postFormSchema(data: FormItem) {
  return request({
    url: `${BASE_FORM_USL}/add`,
    method: 'POST',
    data
  })
}