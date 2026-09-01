import {ComponentSize} from '@/enums/component'


export interface FormComponent {
  label: string,
  id: string,
  componentType: string,
  props: Record<string, any>
}

export interface FormSchema {
  formName: string,
  formType: string,
  components: FormComponent[]
}

export type FormStatus = 'draft' | 'published' | 'close'

export interface FormItem {
  id: string,
  formName: string,
  formType: string,
  status: FormStatus,
  createTime: string,
  updateTime: string
  schema: FormSchema,
}

export interface ComponentProps {
  size?: string,
  type?: string,
}