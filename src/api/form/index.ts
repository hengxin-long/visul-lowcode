import request from '@/utils/request'
import type {FormQueryParams} from './types'

const BASE_FORM_USL = '/mock'

export function getFormList(params: FormQueryParams) {
  return request({
    url: `${BASE_FORM_USL}/form/list`,
    method: 'GET',
    params
  })
}

export function deleteById(id: string) {
  return request({
    url: `${BASE_FORM_USL}/form/delete/${id}`,
    method: 'DELETE',
  })
}