
/** 表单状态 */
export type FormStatus = 'draft' | 'published' | 'close'

/** 表单组件 */
export interface FormComponent {
  label: string,
  id: string,
  componentType: string,
  field: string,
  props: Record<string, any>
}

/** 表单schema */
export interface FormSchema {
  formName: string,
  formType: string,
  components: FormComponent[]
}

/** 表单 */
export interface FormItem {
  id: string,
  formName: string,
  formType: string,
  status: FormStatus,
  createTime: string,
  updateTime: string
  schema: FormSchema,
}

/** 表单属性 */
export interface ComponentProps {
  size?: string,
  type?: string,
}