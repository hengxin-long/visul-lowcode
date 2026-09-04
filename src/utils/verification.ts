
/** 校验id工具 */
export const checkIdValid = (id: string): boolean => {
  if (!id) return false
  // 空字符串、纯空格：判定非法
  const trimId = id.trim()
  if (trimId === '') return false
  // 自定义你的规则：纯数字 / uuid正则，这里示范数字id
  return /^\d+$/.test(id)
}