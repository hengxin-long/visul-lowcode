

/** 画布组件大小枚举 */
export enum ComponentSize {

  LARGE = 'large',

  DEFAULT = 'default',

  SAMLL = 'small'
}

/** 
 * 组件按钮的类型
 * @enum 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'info' | '' | 'text'
 */
export enum ComponentBtnType {
  DEFAULT = 'default',
  PRIMARY = 'primary',
  SUCCESS = 'success',
  WARNING = 'warning',
  DANGER = 'danger',
  INFO = 'info',
  TEXT = 'text',
  NULL = ''
}

/** 
 * 文本框类型
 * @enum 'text' | 'textarea' | 'number' | 'password' | 'email' | 'search' | 'tel' | 'url'
 */
export enum ComponentInputType {
  TEXT = 'text',
  TEXTAREA = 'textarea',
  NUMBER = 'number',
  PASSWORD = 'password',
  EMAIL = 'email',
  SEARCH = 'search',
  TEL = 'tel',
  URL = 'url'
}

/** 表单类型 */
export const FormTypeOptions = [
  {
    label: '普通填报表单',
    value: '普通填报表单'
  },
  {
    label: '收集问卷表单',
    value: '收集问卷表单'
  }
]