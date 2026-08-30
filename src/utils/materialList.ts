import type { FormComponent } from "@/types/form"

export const baseFields: FormComponent[] = [
  {
    label: '密码框',
    id: '',
    componentType: 'password',
    props: {
      label: '密码',
      require: true,
      tyep: 'password',
      placeholder: '请输入密码',
      disabled: false
    }
  },
  {
    label: '输入框',
    id: '',
    componentType: 'input',
    props: {
      label: '用户名',
      require: true,
      type: 'text',
      vModel: '',
      placeholder: '请输入文本',
      clearable: true,
      disabled: false
    }
  },
  {
    label: '日期',
    id: '',
    componentType: 'date',
    props: {}
  },
  {
    label: '数字框',
    id: '',
    componentType: 'inputNumber',
    props: {}
  },
  {
    label: '多选框',
    id: '',
    componentType: 'checkbox',
    props: {}
  },
  {
    label: '单选',
    id: '',
    componentType: 'radio',
    props: {}
  },
  {
    label: '下拉框',
    id: '',
    componentType: 'select',
    props: {}
  },
  {
    label: '评分',
    id: '',
    componentType: 'rate',
    props: {}
  },
  {
    label: '按钮',
    id: '',
    componentType: 'button',
    props: {}
  },
]