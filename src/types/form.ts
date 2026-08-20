
export interface FormComponent {
  componentType: string,
  props: Record<string, any>
}

export interface FormSchema {
  formName: string,
  formType: string,
  components: FormComponent[]
}

export type FormStatus = 'draft' | 'published'

export interface FormItem {
  id: string,
  formName: string,
  formType: string,
  status: FormStatus,
  schema: FormSchema,
  createTime: string,
  updateTime: string
}