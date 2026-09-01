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
      disabled: false,
      clearable: true,
      readonly: false,
      maxlength: 30,
      minlength: 0,
      size: 'default'
    }
  },
  {
    label: '文本',
    id: '',
    componentType: 'input',
    props: {
      label: '文本框',
      require: true,
      type: 'text',
      placeholder: '请输入文本',
      clearable: true,
      disabled: false,
      readonly: false,
      maxlength: 30,
      minlength: 0,
      size: 'default'
    }
  },
  {
    label: '日期',
    id: '',
    componentType: 'date',
    props: {
      readonly: false,
      disabled: false,
      size: 'default',
      editable: true,
      clearable: true,
      placeholder: '日期',
      format: 'YYYY-MM-DD'
    }
  },
  {
    label: '数字框',
    id: '',
    componentType: 'inputNumber',
    props: {
      placeholder: '请输入数字',
      max: 10,
      min: 0,
      step: 1,
      precision: 2,
      disabled: false,
      readonly: false,
      controls: false,
      align: 'center'
    }
  },
  {
    label: '多选框',
    id: '',
    componentType: 'checkbox',
    props: {
      trueValue: '',
      falseValue: '',
      checked: false,
      disabled: false,
      border: false,
      size: 'default'
    }
  },
  {
    label: '单选',
    id: '',
    componentType: 'radio',
    props: {
      value: '',
      label: '单选',
      disabled: false,
      border: true,
      size: 'default'
    }
  },
  {
    label: '下拉框',
    id: '',
    componentType: 'select',
    props: {
      multiple: false,
      disabled: false,
      options: ['选项1', '选项2', '选项3'],
      size: 'default',
      clearable: true,
      placeholder: '下拉框'
    }
  },
  {
    label: '评分',
    id: '',
    componentType: 'rate',
    props: {
      max: 5,
      size: 'default',
      disabled: false,
      allowHalf: false,
      lowThreshold: 2,
      highThreshold: 4,
      clearable: true,
      texts: [1, 2, 3, 4, 5]
    }
  },
  {
    label: '按钮',
    id: '',
    componentType: 'button',
    props: {
      label: '按钮',
      type: 'default',
      size: 'default',
      color: '',
      plain: false,
      text: false,
      bg: false,
      link: false,
      round: false,
      circle: false,
      dashed: false,
      disabled: false,
      loading: false,
    }
  },
]