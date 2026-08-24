
/**
 * API响应体
 */
export interface ApiResult<T = unknown> {
  /** 业务状态码 */
  code: number,
  /** 业务数据 */
  data: T,
  /** 业务消息 */
  msg: string
}

/**
 * 分页查询基础参数
 */
export interface BaseQueryParams {
  /** 当前页码 */
  page: number,
  /** 每页显示条数 */
  pageSize: number
}

/** 分页接口结果 */
export interface PageResult<T> {
  fdata: T[],
  ftotal: number,
  status?: string
}