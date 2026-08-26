
/** 卡片类型 */
export interface Card<T = unknown> {
  title: string,
  count: T,
  icon?: string,
  backgroundColor?: string,
  iconColor?: string,
  iconBackgroundColor?: string
}