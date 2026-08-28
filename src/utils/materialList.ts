import type { FormComponent } from "@/types/form"

export const baseFields: FormComponent[] = [
  {
    label: '密码框',
    componentType: 'password',
    props: {
      require: true,
      tyep: 'password'
    }
  },
  {
    label: '输入框',
    componentType: 'input',
    props: {}
  },
  {
    label: '日期',
    componentType: 'date',
    props: {}
  },
  {
    label: '数字框',
    componentType: 'inputNumber',
    props: {}
  },
  {
    label: '多选框',
    componentType: 'checkbox',
    props: {}
  },
  {
    label: '单选',
    componentType: 'radio',
    props: {}
  },
  {
    label: '下拉框',
    componentType: 'select',
    props: {}
  },
  {
    label: '评分',
    componentType: 'rate',
    props: {}
  },
  {
    label: '按钮',
    componentType: 'button',
    props: {}
  },
]