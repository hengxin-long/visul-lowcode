import request from '@/utils/request'

const BASE_FORM_USL = '/mock'

export function getFormList(params: { page: number; pageSize: number }) {
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