

/**
 * API 响应码枚举
 */
export enum ApiCodeEnum {

  /** 成功 */
  SUCCESS = 200,

  /** 无返回体，删除成功常见状态码 */
  NO_CONTENT = 204,

  /** 请求参数错误，参数格式不对（搜索，删除） */
  BAD_REQUEST = 400,

  /** 数据不存在，ID 错误、资源已删除 */
  NOT_FOUND = 404,

}