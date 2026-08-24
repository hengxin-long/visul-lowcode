import type { BaseQueryParams } from "../common"

/**
 * 表单分页查询参数
 */
export interface FormQueryParams extends BaseQueryParams {
  keywords?: string,
  formType?: string,
  formStatus?: string
}

export interface FormQueryStatusParams {
  status: string
}