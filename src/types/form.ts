
/** 表单状态 */
export type FormStatus = 'draft' | 'published' | 'close'

/** 表单组件 */
export interface FormComponent {
  icon?: string,
  label: string, // 组件标签
  id: string, // 组件唯一id
  componentType: string, // 组件类型
  field: string, // 组件业务字段
  props: Record<string, any> // 组件属性
}

/** 表单schema */
export interface FormSchema {
  formName: string, // 表单标题
  formType: string, // 表单内部类型标记
  components: FormComponent[] // 拖拽组成的组件数组
}

/** 表单 */
export interface FormItem {
  id: string, // 表单唯一id
  formName: string, // 对外的表单名称
  formType: string, // 表单类型
  status: FormStatus, // 表单状态
  createTime: string, // 创建时间
  updateTime: string // 最后更新时间
  schema: FormSchema, // 表单画布配置核心对象
}

/** 表单属性 */
export interface ComponentProps {
  size?: string,
  type?: string,
}